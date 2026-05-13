/**
 * Blogger summarize proxy: POST /summarize with JSON { "text": "..." }.
 * Set secret GEMINI_API_KEY (wrangler secret put GEMINI_API_KEY).
 * Optional vars: GEMINI_MODEL (default gemini-3.1-flash-lite), ALLOWED_ORIGINS (comma-separated exact origins).
 *
 * Google AI Studio counts one "request" per successful generateContent call from this Worker.
 * OPTIONS /summarize and failed Gemini calls still hit the Worker but do not consume Gemini quota
 * until fetch to generativelanguage.googleapis.com runs (POST /summarize only).
 */

const DEFAULT_MODEL = "gemini-3.1-flash-lite";
const MAX_INPUT_CHARS = 32000;

function parseAllowedOrigins(raw: string | undefined): string[] {
	if (!raw || !raw.trim()) return [];
	return raw
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);
}

function isBlogspotFamilyHost(hostname: string): boolean {
	const h = hostname.toLowerCase();
	return h.split(".").includes("blogspot");
}

function isOriginAllowed(origin: string, env: Env): boolean {
	try {
		const u = new URL(origin);
		if (u.protocol !== "http:" && u.protocol !== "https:") return false;
		const host = u.hostname.toLowerCase();
		if (host === "localhost" || host.endsWith(".localhost")) return true;

		const explicit = parseAllowedOrigins(env.ALLOWED_ORIGINS);
		if (explicit.length > 0) return explicit.includes(origin);

		return isBlogspotFamilyHost(host);
	} catch {
		return false;
	}
}

function corsHeaders(request: Request, env: Env, extra: Record<string, string> = {}): Headers {
	const h = new Headers(extra);
	const origin = request.headers.get("Origin");
	if (origin && isOriginAllowed(origin, env)) {
		h.set("Access-Control-Allow-Origin", origin);
		h.set("Vary", "Origin");
		h.set("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
		h.set("Access-Control-Allow-Headers", "Content-Type");
		h.set("Access-Control-Max-Age", "86400");
	}
	return h;
}

function jsonResponse(request: Request, env: Env, body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: corsHeaders(request, env, { "content-type": "application/json; charset=utf-8" }),
	});
}

export default {
	async fetch(request, env, _ctx): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "OPTIONS") {
			return new Response(null, { status: 204, headers: corsHeaders(request, env) });
		}

		if (url.pathname === "/" && request.method === "GET") {
			return new Response("Hello World!", {
				headers: corsHeaders(request, env, { "content-type": "text/plain; charset=utf-8" }),
			});
		}

		if (url.pathname !== "/summarize" || request.method !== "POST") {
			return new Response("Not found", { status: 404, headers: corsHeaders(request, env) });
		}

		const origin = request.headers.get("Origin");
		if (!origin || !isOriginAllowed(origin, env)) {
			return jsonResponse(request, env, { error: "Forbidden origin" }, 403);
		}

		const key = env.GEMINI_API_KEY;
		if (!key) {
			return jsonResponse(request, env, { error: "Server misconfigured: missing GEMINI_API_KEY" }, 500);
		}

		let payload: unknown;
		try {
			payload = await request.json();
		} catch {
			return jsonResponse(request, env, { error: "Invalid JSON body" }, 400);
		}

		const text =
			typeof payload === "object" && payload !== null && "text" in payload
				? (payload as { text: unknown }).text
				: undefined;
		if (typeof text !== "string" || !text.trim()) {
			return jsonResponse(request, env, { error: 'Expected JSON object with string "text"' }, 400);
		}

		const clipped = text.length > MAX_INPUT_CHARS ? text.slice(0, MAX_INPUT_CHARS) : text;
		const model = (env.GEMINI_MODEL && env.GEMINI_MODEL.trim()) || DEFAULT_MODEL;

		const systemPrompt =
			"You summarize blog posts for readers. Output 3-6 short bullet points. Use plain text with each bullet on its own line starting with '- '. " +
			"Stay faithful to the provided text; do not invent facts. If the text is too short, say so briefly.";

		const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;

		const geminiRes = await fetch(geminiUrl, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-goog-api-key": key,
			},
			body: JSON.stringify({
				systemInstruction: { parts: [{ text: systemPrompt }] },
				contents: [
					{
						role: "user",
						parts: [{ text: clipped }],
					},
				],
				generationConfig: {
					temperature: 0.35,
					maxOutputTokens: 1024,
				},
			}),
		});

		const geminiJson: unknown = await geminiRes.json().catch(() => null);
		if (!geminiRes.ok) {
			const is429 = geminiRes.status === 429;
			const errorText = is429
				? "Gemini quota or rate limit exceeded. Retry later or enable billing in Google AI Studio."
				: "Gemini request failed";
			return jsonResponse(
				request,
				env,
				{ error: errorText, status: geminiRes.status, details: geminiJson },
				is429 ? 429 : 502,
			);
		}

		const summary = extractSummaryText(geminiJson);
		if (!summary) {
			return jsonResponse(request, env, { error: "Empty or blocked model response", details: geminiJson }, 502);
		}

		return jsonResponse(request, env, { summary });
	},
} satisfies ExportedHandler<Env>;

function extractSummaryText(data: unknown): string | null {
	if (!data || typeof data !== "object") return null;
	const root = data as {
		candidates?: Array<{
			content?: { parts?: Array<{ text?: string }> };
			finishReason?: string;
		}>;
	};
	const first = root.candidates?.[0];
	const parts = first?.content?.parts;
	if (!parts?.length) return null;
	const texts = parts.map((p) => (typeof p.text === "string" ? p.text : "")).filter(Boolean);
	const joined = texts.join("\n").trim();
	return joined || null;
}
