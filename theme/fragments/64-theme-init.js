$('#lightify-pro-main-menu').menuify();
$('#lightify-pro-main-menu-nav > li > a').each(function() {
    var $t = $(this),
        $m = $t.attr('href').toLowerCase().trim();
    if ($m == 'home-icon') {
        $t.addClass('homepage home-icon').attr('href', '/').text('')
    } else if ($m == 'home-text') {
        $t.addClass('homepage').attr('href', '/')
    }
});
$('#lightify-pro-main-menu .widget').addClass('show-menu');
$('.search-toggle').on('click', function() {
    $('body').toggleClass('search-active')
});
$('html').each(function() {
    var $t = $(this);
    if (darkMode != true) {
        $t.attr('data-theme', localStorage.dataTheme);
        $('.darkmode-toggle,.mobile-darkmode-toggle').on('click', function() {
            if (localStorage.dataTheme != 'dark') {
                $t.attr('data-theme', 'dark');
                localStorage.dataTheme = 'dark'
            } else {
                $t.attr('data-theme', 'light');
                localStorage.dataTheme = 'light'
            }
        })
    }
});
$("#break-section .PopularPosts .ticker-widget").owlCarousel({
                                    items: 1,
                                    slideBy: 1,
                                    smartSpeed: 1000,
                                    animateIn: 'fadeInRight',
                                    animateOut: 'fadeOutRight',
                                    rtl: true,
                                    nav: true,
                                    navText: ['', ''],
                                    loop: true,
                                    autoplay: true,
                                    autoplayHoverPause: true,
                                    dots: false,
                                    mouseDrag: true,
                                    touchDrag: true,
                                    freeDrag: false,
                                    pullDrag: false,
                        responsive: {
                            0: {
                                items: 1
                            },
                            541: {
                                items: 1
                            },
                            681: {
                                items: 1
                            },
                            769: {
                                items: 1
                            }
                        }
                                });
$('.blog-posts-title a.more,.related-title a.more').each(function() {
    var $t = $(this),
        $smt = viewAllText;
    if ($smt != '') {
        $t.text($smt)
    }
});
$('.follow-by-email-text').each(function() {
    var $t = $(this),
        $fbet = followByEmailText;
    if ($fbet != '') {
        $t.text($fbet)
    }
});
$('#sidebar-tabs').each(function() {
    var $t = $(this),
        $w = $t.find('.widget'),
        $c = $w.length;
    $t.addClass('style-' + $c + '');
    $t.tabify()
});
$('.post-body strike').each(function() {
    var $t = $(this),
        $mtc = $t.text().trim();
    if ($mtc == '$ads={1}') {
        $t.replaceWith('<div id="lightify-pro-new-before-ad"/>')
    }
    if ($mtc == '$ads={2}') {
        $t.replaceWith('<div id="lightify-pro-new-after-ad"/>')
    }
});
$('#lightify-pro-new-before-ad').each(function() {
    var $t = $(this);
    if ($t.length) {
        $('#before-ad').appendTo($t)
    }
});
$('#lightify-pro-new-after-ad').each(function() {
    var $t = $(this);
    if ($t.length) {
        $('#after-ad').appendTo($t)
    }
});
$('#lightify-pro-main-before-ad .widget').each(function() {
    var $t = $(this);
    if ($t.length) {
        $t.appendTo($('#before-ad'))
    }
});
$('#lightify-pro-main-after-ad .widget').each(function() {
    var $t = $(this);
    if ($t.length) {
        $t.appendTo($('#after-ad'))
    }
});
$('.post-body strike').each(function() {
    var $this = $(this),
        type = $this.text().trim(),
        html = $this.html();
    if (type.match('left-sidebar')) {
        $this.replaceWith('<style>.is-single #main-wrapper{float:right}.is-single #sidebar-wrapper{float:left}</style>')
    }
    if (type.match('right-sidebar')) {
        $this.replaceWith('<style>.is-single #main-wrapper{float:left}.is-single #sidebar-wrapper{float:right}</style>')
    }
    if (type.match('full-width')) {
        $this.replaceWith('<style>.is-single #main-wrapper{width:100%}.is-single #sidebar-wrapper{display:none}</style>')
    }
});
$('.lightify-pro-share-links .window-ify').on('click', function() {
    var $this = $(this),
        url = $this.data('url'),
        wid = $this.data('width'),
        hei = $this.data('height'),
        wsw = window.screen.width,
        wsh = window.screen.height,
        mrl = Math.round(wsw / 2 - wid / 2),
        mrt = Math.round(wsh / 2 - hei / 2),
        win = window.open(url, '_blank', 'scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=' + wid + ',height=' + hei + ',left=' + mrl + ',top=' + mrt);
    win.focus()
});
$('.lightify-pro-share-links').each(function() {
    var $t = $(this),
        $b = $t.find('.show-hid a');
    $b.on('click', function() {
        $t.toggleClass('show-hidden')
    })
});
$('.about-author .author-description span a').each(function() {
    var $this = $(this),
        cls = $this.text().trim(),
        url = $this.attr('href');
    $this.replaceWith('<li class="' + cls + '"><a href="' + url + '" title="' + cls + '" target="_blank"/></li>');
    $('.description-links').append($('.author-description span li'));
    $('.description-links').addClass('show')
});

function msgError() {
    return '<span class="error-msg"><b>Error:</b> No Results Found</span>'
}

function beforeLoader() {
    return '<div class="loader"/>'
}

function getFeedUrl(type, num, label) {
    var furl = '';
    switch (label) {
        case 'recent':
            furl = '/feeds/posts/default?alt=json&max-results=' + num;
            break;
        case 'comments':
            if (type == 'list1') {
                furl = '/feeds/comments/default?alt=json&max-results=' + num
            } else {
                furl = '/feeds/posts/default/-/' + label + '?alt=json&max-results=' + num
            }
            break;
        default:
            furl = '/feeds/posts/default/-/' + label + '?alt=json&max-results=' + num;
            break
    }
    return furl
}

function getPostLink(feed, i) {
    for (var x = 0; x < feed[i].link.length; x++)
        if (feed[i].link[x].rel == 'alternate') {
            var link = feed[i].link[x].href;
            break
        }
    return link
}

function getPostTitle(feed, i) {
    var n = feed[i].title.$t;
    return n
}

function getFirstImage($c, img) {
    var $h = $('<div>').html($c),
        $t = $h.find('img:first').attr('src'),
        $a = $t.lastIndexOf('/') || 0,
        $b = $t.lastIndexOf('/', $a - 1) || 0,
        $p0 = $t.substring(0, $b),
        $p1 = $t.substring($b, $a),
        $p2 = $t.substring($a);
    if ($p1.match(/\/s[0-9]+/g) || $p1.match(/\/w[0-9]+/g) || $p1 == '/d') {
        $p1 = '/w72-h72-p-k-no-nu'
    }
    img = $p0 + $p1 + $p2;
    return img
}

function getPostImage(feed, i, img) {
    var $c = feed[i].content.$t;
    if (feed[i].media$thumbnail) {
        var src = feed[i].media$thumbnail.url
    } else {
        src = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvLicYUj_7v_kvi3oTWgSa2ZELk27ZwTaUoX4FW1sRSCmS1H8pk7pgApI7oOQ8CFZNq8RtZ1sURrqnMHCs_8Yfi53lIuuutlMoR2xMAXJVdHdTWsYGkA2n8ZUP1R-xkxJoFyI5bhob_P0/s72-c/nth-ify.png'
    }
    if ($c.indexOf($c.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1) {
        if ($c.indexOf('<img') > -1) {
            if ($c.indexOf($c.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) < $c.indexOf('<img')) {
                img = src.replace('/default.', '/0.')
            } else {
                img = getFirstImage($c)
            }
        } else {
            img = src.replace('/default.', '/0.')
        }
    } else if ($c.indexOf('<img') > -1) {
        img = getFirstImage($c)
    } else {
        img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvLicYUj_7v_kvi3oTWgSa2ZELk27ZwTaUoX4FW1sRSCmS1H8pk7pgApI7oOQ8CFZNq8RtZ1sURrqnMHCs_8Yfi53lIuuutlMoR2xMAXJVdHdTWsYGkA2n8ZUP1R-xkxJoFyI5bhob_P0/s72-c/nth-ify.png'
    }
    return img
}

function getPostAuthor(feed, i) {
    var n = feed[i].author[0].name.$t;
    if (messages.postAuthor == 'true') {
        var code = '<span class="entry-author"><span class="author">' + n + '</span></span>'
    } else {
        var code = ''
    }
    return code
}

function getPostDate(feed, i) {
    var c = feed[i].published.$t,
        d = c.substring(0, 4),
        f = c.substring(5, 7),
        m = c.substring(8, 10),
        h = monthFormat[parseInt(f, 10) - 1] + ' ' + m + ', ' + d;
    if (messages.postDate == 'true') {
        var code = '<span class="entry-time"><time class="published" datetime="' + c + '">' + h + '</time></span>'
    } else {
        code = ''
    }
    return code
}

function getPostMeta(author, date) {
    if (messages.postAuthor == 'true' && messages.postDate == 'true') {
        var long = '<div class="entry-meta">' + author + date + '</div>'
    } else if (messages.postAuthor == 'true') {
        long = '<div class="entry-meta">' + author + '</div>'
    } else if (messages.postDate == 'true') {
        long = '<div class="entry-meta">' + date + '</div>'
    } else {
        long = ''
    }
    if (messages.postDate == 'true') {
        var small = '<div class="entry-meta">' + date + '</div>'
    } else {
        small = ''
    }
    var code = [long, small];
    return code
}

function getFeatMeta(type, i, meta) {
    var code;
    switch (type) {
        case 'featured1':
        case 'featured2':
        case 'featured3':
            switch (i) {
                case 0:
                    code = meta[0];
                    break;
                default:
                    code = meta[1];
                    break
            }
            break;
        default:
            code = meta[0];
            break
    }
    return code
}

function getPostLabel(feed, i) {
    if (feed[i].category != undefined) {
        var tag = feed[i].category[0].term,
            code = '<span class="entry-category">' + tag + '</span>'
    } else {
        code = ''
    }
    return code
}
function getPostSummary(feed, i, str) {
    if (feed[i].content.$t) {
        var $c = feed[i].content.$t,
            $h = $("<div>").html($c),
            sum = $h.text().trim().substr(0, str),
            code = '<span class="entry-excerpt excerpt">' + sum + '…</span>'
    } else {
        code = ''
    }
    return code
}
function getPostComments(feed, i, link) {
    var n = feed[i].author[0].name.$t,
        e = feed[i].author[0].gd$image.src.replace('/s220', '/w55-h55-p-k-no-nu'),
        h = feed[i].title.$t;
    if (e.match('//img1.blogblog.com/img/blank.gif') || e.match('//img1.blogblog.com/img/b16-rounded.gif')) {
        var img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOw5iqIpWPqMNbuTkN-AeL3KyXrB4bRGg6oPqZ-TA0eq46zFxIMeAoQYLQRPRDpKBJlGnXSN0AtoApFACrFgizQSu1w5r16ZIfho_tiktpILwPXJgG1dR-siBhXOxOV6ULCakHYP64Dsk/w55-h55-p-k-no-nu/avatar.jpg'
    } else {
        var img = e
    }
    var code = '<article class="list1-item item-' + i + '"><a class="entry-image-link cmm-avatar" href="' + link + '"><span class="entry-thumb" data-image="' + img + '"/></a><h2 class="entry-title"><a href="' + link + '">' + n + '</a></h2><p class="cmm-snippet excerpt">' + h + '</p></article>';
    return code
}

function getCustomStyle(id, type, color) {
    if (color != false) {
        if (type == 'featured') {
            var code = '.id-' + id + '-' + type + ' .entry-category{background-color:' + color + ';color:#fff}.id-' + id + '-' + type + ' .loader:after{border-color:' + color + ';border-right-color:rgba(155,155,155,0.2)}'
        } else {
            code = '.id-' + id + '-' + type + ' .title-wrap{border-bottom-color:' + color + '}.id-' + id + '-' + type + ' .title-wrap > h3,.id-' + id + '-' + type + ' .entry-category{background-color:' + color + ';color:#fff}.id-' + id + '-' + type + ' .title-wrap > h3{color:#fff}.id-' + id + '-' + type + ' .title-wrap > a.more:hover,.id-' + id + '-' + type + ' .entry-header:not(.entry-info) .entry-title a:hover{color:' + color + '}.id-' + id + '-' + type + ' .title-wrap > h3:after{border-left-color:' + color + '}.rtl .id-' + id + '-' + type + ' .title-wrap > h3:after{border-right-color:' + color + '}.id-' + id + '-' + type + ' .loader:after{border-color:' + color + ';border-right-color:rgba(155,155,155,0.2)}'
        }
    } else {
        code = ''
    }
    return code
}

function getAjax($this, type, num, label, color) {
    switch (type) {
        case 'msimple':
        case 'megatabs':
        case 'featured1':
        case 'featured2':
        case 'featured3':
        case 'featured4':
        case 'featured5':
        case 'block1':
        case 'block2':
        case 'col-left':
        case 'col-right':
        case 'grid1':
        case 'grid2':
        case 'videos':
        case 'side1':
        case 'list1':
        case 'list2':
        case 'related':
            if (label == false) {
                label = 'geterror404'
            }
            var furl = getFeedUrl(type, num, label);
            $.ajax({
                url: furl,
                type: 'GET',
                dataType: 'json',
                cache: true,
                beforeSend: function(data) {
                    var id = $this.parent().attr('id'),
                        style = getCustomStyle(id, type, color);
                    switch (type) {
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                        case 'featured4':
                        case 'featured5':
                            $('#page-skin-2').prepend(style);
                            $this.html(beforeLoader()).parent().addClass('type-' + type + ' id-' + id + '-' + type + ' show-ify');
                            break;
                        case 'block1':
                        case 'block2':
                        case 'grid1':
                        case 'grid2':
                        case 'videos':
                            $('#page-skin-2').prepend(style);
                            $this.html(beforeLoader()).parent().addClass('type-' + type + ' id-' + id + '-' + type + ' show-ify');
                            break;
                        case 'col-left':
                        case 'col-right':
                            $('#page-skin-2').prepend(style);
                            $this.html(beforeLoader()).parent().addClass('type-' + type + ' column-widget id-' + id + '-' + type + ' show-ify');
                            break;
                        case 'side1':
                        case 'list1':
                        case 'list2':
                            $this.html(beforeLoader());
                            break;
                        case 'related':
                            $this.html(beforeLoader()).parent().addClass('show-ify');
                            break
                    }
                },
                success: function(data) {
                    var html = '';
                    switch (type) {
                        case 'msimple':
                        case 'megatabs':
                            html = '<ul class="mega-items">';
                            break;
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                        case 'featured4':
                        case 'featured5':
                            html = '<div class="featured-items ' + type + '">';
                            break;
                        case 'block1':
                            html = '<div class="block1-items">';
                            break;
                        case 'block2':
                            html = '<div class="block2-items">';
                            break;
                        case 'col-left':
                        case 'col-right':
                            html = '<div class="column-items">';
                            break;
                        case 'grid1':
                            html = '<div class="grid1-items total-' + num + '">';
                            break;
                        case 'grid2':
                            html = '<div class="grid2-items">';
                            break;
                        case 'videos':
                            html = '<div class="videos-items total-' + num + '">';
                            break;
                        case 'side1':
                            html = '<div class="side1-items">';
                            break;
                        case 'list1':
                            html = '<div class="list1-items">';
                            break;
                        case 'list2':
                            html = '<div class="list2-items">';
                            break;
                        case 'related':
                            html = '<div class="related-posts total-' + num + '">';
                            break
                    }
                    var entry = data.feed.entry;
                    if (entry != undefined) {
                        for (var i = 0, feed = entry; i < feed.length; i++) {
                            var link = getPostLink(feed, i),
                                title = getPostTitle(feed, i, link),
                                image = getPostImage(feed, i, link),
                                author = getPostAuthor(feed, i),
                                date = getPostDate(feed, i),
                                meta = getPostMeta(author, date),
                                featMeta = getFeatMeta(type, i, meta),
                                tag = getPostLabel(feed, i),
                                count = feed.length;
                            var content = '';
                            switch (type) {
                                case 'msimple':
                                case 'megatabs':
                                    content += '<article class="mega-item"><div class="mega-content"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                    break;
                                case 'featured1':
                                case 'featured2':
                                case 'featured3':
                                case 'featured4':
                                case 'featured5':
                                    switch (i) {
                                        case 0:
                                            content += '<article class="featured-item item-' + i + '"><div class="featured-item-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a>' + tag + '<div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + featMeta + '</div></div></article><div class="featured-scroll">';
                                            break;
                                        default:
                                            content += '<article class="featured-item item-' + i + '"><div class="featured-item-inner"><a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a>' + tag + '<div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + featMeta + '</div></div></article>';
                                            break
                                    }
                                    break;
                                case 'block1':
                                    switch (i) {
                                        case 0:
                                            content += '<article class="block-item item-' + i + '"><div class="block-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                            break;
                                        default:
                                            content += '<article class="block-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                            break
                                    }
                                    break;
                                case 'block2':
                                    switch (i) {
                                        case 0:
                                            content += '<article class="block-item item-' + i + '"><div class="block-inner"><div class="entry-image">' + tag + '<a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] +  getPostSummary(feed, i, 150) + '</div></div></article>';
                                            break;
                                        default:
                                            content += '<article class="block-item item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                            break
                                    }
                                    break;
                                case 'col-left':
                                case 'col-right':
                                    switch (i) {
                                        case 0:
                                            content += '<article class="column-item item-' + i + '"><div class="column-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                            break;
                                        default:
                                            content += '<article class="column-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                            break
                                    }
                                    break;
                                case 'grid1':
                                    content += '<article class="grid-item item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                    break;
                                case 'grid2':
                                    content += '<article class="grid-item item-' + i + '"><div class="entry-image">' + tag + '<a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] +  getPostSummary(feed, i, 150) + '</div></article>';
                                    break;
                                case 'videos':
                                    content += '<article class="videos-item item-' + i + '"><div class="videos-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/><span class="video-icon"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                    break;
                                case 'side1':
                                    switch (i) {
                                        case 0:
                                            content += '<article class="side1-item item-' + i + '"><div class="side1-inner">' + tag + '<a class="entry-image-link before-mask" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header entry-info"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[0] + '</div></div></article>';
                                            break;
                                        default:
                                            content += '<article class="side1-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                            break
                                    }
                                    break;
                                case 'list1':
                                    switch (label) {
                                        case 'comments':
                                            var code = getPostComments(feed, i, link);
                                            content += code;
                                            break;
                                        default:
                                            content += '<article class="list1-item item-' + i + '"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                            break
                                    }
                                    break;
                                case 'list2':
                                    content += '<article class="list2-item item-' + i + '"><div class="entry-header">' + meta[1] + '<h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2></div></article>';
                                    break;
                                case 'related':
                                    content += '<article class="related-item post item-' + i + '"><div class="entry-image"><a class="entry-image-link" href="' + link + '"><span class="entry-thumb" data-image="' + image + '"/></a></div><div class="entry-header"><h2 class="entry-title"><a href="' + link + '">' + title + '</a></h2>' + meta[1] + '</div></article>';
                                    break
                            }
                            html += content
                        }
                    } else {
                        switch (type) {
                            case 'msimple':
                            case 'megatabs':
                                html = '<ul class="mega-items">' + msgError() + '</ul>';
                                break;
                            default:
                                html = msgError();
                                break
                        }
                    }
                    switch (type) {
                        case 'msimple':
                            html += '</ul>';
                            $this.append(html).addClass('msimple');
                            $this.find('a:first').attr('href', function($this, href) {
                                switch (label) {
                                    case 'recent':
                                        href = href.replace(href, '/search');
                                        break;
                                    default:
                                        href = href.replace(href, '/search/label/' + label);
                                        break
                                }
                                return href
                            });
                            break;
                        case 'featured1':
                        case 'featured2':
                        case 'featured3':
                        case 'featured4':
                        case 'featured5':
                            html += '</div></div>';
                            $this.html(html);
                            break;
                        default:
                            html += '</div>';
                            $this.html(html);
                            break
                    }
                    $this.find('span.entry-thumb').lazyify()
                },
                error: function() {
                    switch (type) {
                        case 'msimple':
                        case 'megatabs':
                            $this.append('<ul>' + msgError() + '</ul>');
                            break;
                        default:
                            $this.html(msgError());
                            break
                    }
                }
            })
    }
}

function ajaxMega($this, type, num, label, mtc) {
    if (mtc.match('getmega')) {
        if (type == 'msimple' || type == 'megatabs' || type == 'mtabs') {
            return getAjax($this, type, num, label)
        } else {
            $this.append('<ul class="mega-items">' + msgError() + '</ul>')
        }
    }
}

function ajaxFeatured($this, type, num, label, mtc, color) {
    if (mtc.match('getfeatured')) {
        if (type == 'featured1' || type == 'featured2' || type == 'featured3' || type == 'featured4' || type == 'featured5') {
            return getAjax($this, type, num, label, color)
        } else {
            $this.html(beforeLoader()).parent().addClass('show-ify');
            setTimeout(function() {
                $this.html(msgError())
            }, 500)
        }
    }
}

function ajaxBlock($this, type, num, label, mtc, color) {
    if (mtc.match('getblock')) {
        if (type == 'block1' || type == 'block2' || type == 'col-left' || type == 'col-right' || type == 'grid1' || type == 'grid2' || type == 'videos') {
            var moreText = viewAllText,
                text = '';
            if (moreText != '') {
                text = moreText
            } else {
                text = messages.viewAll
            }
            $this.parent().find('.widget-title').append('<a class="more" href="/search/label/' + label + '">' + text + '</a>');
            return getAjax($this, type, num, label, color)
        } else {
            $this.html(msgError()).parent().addClass('show-ify')
        }
    }
}

function ajaxWidget($this, type, num, label, mtc) {
    if (mtc.match('getwidget')) {
        if (type == 'side1' || type == 'list1' || type == 'list2') {
            return getAjax($this, type, num, label)
        } else {
            $this.html(msgError())
        }
    }
}

function ajaxRelated($this, type, num, label, mtc) {
    if (mtc.match('getrelated')) {
        return getAjax($this, type, num, label)
    }
}

function shortCodeIfy(a, b, c) {
    var d = a.split('$'),
        e = /[^{\}]+(?=})/g;
    for (var i = 0; i < d.length; i++) {
        var f = d[i].split('=');
        if (f[0].trim() == b) {
            c = f[1];
            if (c.match(e) != null) {
                return String(c.match(e)).trim()
            } else {
                return false
            }
        }
    }
    return false
}

function megaTabs($this, type, label, mtc) {
    if (type == 'mtabs') {
        if (label != false) {
            var lLen = label.length,
                code = '<ul class="complex-tabs">';
            for (var i = 0; i < lLen; i++) {
                var tag = label[i];
                if (tag) {
                    code += '<div class="mega-tab" tab-ify="' + tag + '"/>'
                }
            }
            code += '</ul>';
            $this.addClass('mega-tabs mtabs').append(code);
            $this.find('> a:first').attr('href', 'javascript:;');
            $('.mega-tab').each(function() {
                var $this = $(this),
                    label = $this.attr('tab-ify');
                ajaxMega($this, 'megatabs', 4, label, mtc)
            });
            $this.find('ul.complex-tabs').tabify({
                onHover: true
            })
        } else {
            $this.append('<ul class="mega-items">' + msgError() + '</ul>')
        }
    }
}
$('#lightify-pro-main-menu li').each(function(type, label) {
    var lc = $(this),
        $this = lc,
        ltx = lc.find('a'),
        txt = ltx.attr('href').trim(),
        mtc = txt.toLowerCase();
    type = shortCodeIfy(txt, 'type');
    label = shortCodeIfy(txt, 'label');
    if (mtc.match('getmega')) {
        $this.addClass('has-sub mega-menu')
    }
    ajaxMega($this, type, 5, label, mtc);
    if (type == 'mtabs') {
        if (label != false) {
            label = label.split('/')
        }
        megaTabs($this, type, label, mtc)
    }
});
$('#featured .HTML .widget-content').each(function(type, num, label, color) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodeIfy(txt, 'type');
    label = shortCodeIfy(txt, 'label');
    color = shortCodeIfy(txt, 'color');
    switch (type) {
        case 'featured2':
            num = 4;
            break;
        case 'featured3':
            num = 5;
            break;
        case 'featured5':
            num = 2;
            break;
        default:
            num = 3;
            break
    }
    ajaxFeatured($this, type, num, label, mtc, color)
});
$('.lightify-pro-content-blocks .HTML .widget-content').each(function(type, num, label, color) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodeIfy(txt, 'type');
    num = shortCodeIfy(txt, 'results');
    label = shortCodeIfy(txt, 'label');
    color = shortCodeIfy(txt, 'color');
    ajaxBlock($this, type, num, label, mtc, color)
});
$('.lightify-pro-widget-ready .HTML .widget-content').each(function(type, num, label) {
    var $this = $(this),
        txt = $this.text().trim(),
        mtc = txt.toLowerCase();
    type = shortCodeIfy(txt, 'type');
    num = shortCodeIfy(txt, 'results');
    label = shortCodeIfy(txt, 'label');
    ajaxWidget($this, type, num, label, mtc)
});
$('.lightify-pro-related-content').each(function() {
    var $this = $(this),
        label = $this.find('.related-tag').attr('data-label'),
        num = relatedPostsNum;
    ajaxRelated($this, 'related', num, label, 'getrelated')
});

function beautiAvatar(a) {
    $(a).attr('src', function($this, i) {
        i = i.replace('//resources.blogblog.com/img/blank.gif', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOw5iqIpWPqMNbuTkN-AeL3KyXrB4bRGg6oPqZ-TA0eq46zFxIMeAoQYLQRPRDpKBJlGnXSN0AtoApFACrFgizQSu1w5r16ZIfho_tiktpILwPXJgG1dR-siBhXOxOV6ULCakHYP64Dsk/s35-r/avatar.jpg');
        i = i.replace('//img1.blogblog.com/img/blank.gif', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjOw5iqIpWPqMNbuTkN-AeL3KyXrB4bRGg6oPqZ-TA0eq46zFxIMeAoQYLQRPRDpKBJlGnXSN0AtoApFACrFgizQSu1w5r16ZIfho_tiktpILwPXJgG1dR-siBhXOxOV6ULCakHYP64Dsk/s35-r/avatar.jpg');
        return i
    })
}
$('.lightify-pro-blog-post-comments').each(function() {
    var $this = $(this),
        system = commentsSystem,
        facebook = '<div class="fb-comments" data-width="100%" data-href="' + disqus_blogger_current_url + '" order_by="time" data-colorscheme="' + fbCommentsTheme + '" data-numposts="5"></div>',
        sClass = 'comments-system-' + system;
    switch (system) {
        case 'blogger':
            $this.addClass(sClass).show();
            $('.entry-meta .entry-comments-link').addClass('show');
            beautiAvatar('.avatar-image-container img');
            break;
        case 'disqus':
            $this.addClass(sClass).show();
            break;
        case 'facebook':
            $this.addClass(sClass).find('#comments').html(facebook);
            $this.show();
            break;
        case 'hide':
            $this.hide();
            break;
        default:
            $this.addClass('comments-system-blogger').show();
            $('.entry-meta .entry-comments-link').addClass('show');
            beautiAvatar('.avatar-image-container img');
            break
    }
    var $r = $this.find('.comments .toplevel-thread > ol > .comment .comment-actions .comment-reply'),
        $c = $this.find('.comments .toplevel-thread > #top-continue');
    $r.on('click', function() {
        $c.show()
    });
    $c.on('click', function() {
        $c.hide()
    })
});
$(function() {
    $('.index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar').lazyify();
    $('#lightify-pro-mobile-menu').each(function() {
        var $t = $(this),
            $m = $('#lightify-pro-main-menu-nav').clone();
        $m.attr('id', 'main-mobile-nav');
        $m.find('.mega-items, .mega-tab').remove();
        $m.find('a.home-icon').each(function() {
            var $a = $(this),
                $h = $a.attr('data-text').trim();
            $a.text($h)
        });
        $m.find('li.mega-tabs .complex-tabs').each(function() {
            var $eq = $(this);
            $eq.replaceWith($eq.find('> ul.select-tab').attr('class', 'sub-menu m-sub'))
        });
        $m.find('.mega-menu:not(.mega-tabs) > a').each(function($l, $u) {
            var $a = $(this),
                $h = $a.attr('href').trim(),
                $m = $h.toLowerCase();
            if ($m.match('getmega')) {
                $l = shortCodeIfy($h, 'label');
                $l == 'recent' ? $u = '/search' : $u = '/search/label/' + $l;
                $a.attr('href', $u)
            }
        });
        $m.find('.mega-tabs ul li > a').each(function() {
            var $a = $(this),
                $l = $a.text().trim();
            $a.attr('href', '/search/label/' + $l)
        });
        $m.appendTo($t);
        $('.mobile-menu-toggle, .hide-lightify-pro-mobile-menu, .overlay').on('click', function() {
            $('body').toggleClass('nav-active')
        });
        $('.lightify-pro-mobile-menu .has-sub').append('<div class="submenu-toggle"/>');
        $('.lightify-pro-mobile-menu .mega-menu').find('.submenu-toggle').remove();
        $('.lightify-pro-mobile-menu .mega-tabs').append('<div class="submenu-toggle"/>');
        $('.lightify-pro-mobile-menu ul li .submenu-toggle').on('click', function($this) {
            if ($(this).parent().hasClass('has-sub')) {
                $this.preventDefault();
                if (!$(this).parent().hasClass('show')) {
                    $(this).parent().addClass('show').children('.m-sub').slideToggle(170)
                } else {
                    $(this).parent().removeClass('show').find('> .m-sub').slideToggle(170)
                }
            }
        })
    });
    $('.mobile-navbar-menu').each(function() {
        var $t = $(this),
            $l = $('#main-navbar-menu ul.menu').clone();
        $l.appendTo($t)
    });
    $('.mobile-navbar-social').each(function() {
        var $t = $(this),
            $l = $('#main-navbar-social ul.social').clone();
        $l.appendTo($t)
    });
    $('.main-menu-wrap .main-menu').each(function() {
        var $this = $(this);
        if (fixedMenu == true) {
            if ($this.length > 0) {
                var t = $(document).scrollTop(),
                    w = $this.offset().top,
                    s = $this.height(),
                    h = (w + s) + 50;
                $(window).scroll(function() {
                    var n = $(document).scrollTop(),
                        f = $('#footer-wrapper').offset().top,
                        m = (f - s);
                    if (n < m) {
                        if (n > h) {
                            $this.addClass('is-fixed')
                        } else if (n < w) {
                            $this.removeClass('is-fixed')
                        }
                        if (n > t) {
                            $this.removeClass('show')
                        } else {
                            $this.addClass('show')
                        }
                        t = $(document).scrollTop()
                    }
                })
            }
        }
    });
    $('#main-logo').each(function() {
        var $this = $(this);
        if (fixedMenu == true) {
            if ($this.length > 0) {
                var t = $(document).scrollTop(),
                    w = $this.offset().top,
                    s = $this.height(),
                    h = (w + s);
                $(window).scroll(function() {
                    var n = $(document).scrollTop(),
                        f = $('#footer-wrapper').offset().top,
                        m = (f - s);
                    if (n < m) {
                        if (n > h) {
                            $this.addClass('is-fixed')
                        } else if (n <= 0) {
                            $this.removeClass('is-fixed')
                        }
                        if (n > t) {
                            $this.removeClass('show')
                        } else {
                            $this.addClass('show')
                        }
                        t = $(document).scrollTop()
                    }
                })
            }
        }
    });
    $('#main-wrapper,#sidebar-wrapper').each(function($aTM) {
        if (fixedSidebar == true) {
            fixedMenu == true ? $aTM = 75 : $aTM = 25;
            $(this).theiaStickySidebar({
                additionalMarginTop: $aTM,
                additionalMarginBottom: 25
            })
        }
    });
    $('p.comment-content').each(function() {
        var $t = $(this);
        $t.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, '<img src="$1"/>');
        $t.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, '<div class="responsive-video-wrap"><iframe id="youtube" width="100%" height="358" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>')
    });
    $('#lightify-pro-load-more-link').each(function() {
        var $this = $(this),
            $loadLink = $this.data('load');
        if ($loadLink) {
            $('#lightify-pro-load-more-link').show()
        }
        $('#lightify-pro-load-more-link').on('click', function(a) {
            $('#lightify-pro-load-more-link').hide();
            $.ajax({
                url: $loadLink,
                success: function(data) {
                    var $p = $(data).find('.blog-posts');
                    $p.find('.index-post').addClass('post-animated post-fadeInUp');
                    $('.blog-posts').append($p.html());
                    $loadLink = $(data).find('#lightify-pro-load-more-link').data('load');
                    if ($loadLink) {
                        $('#lightify-pro-load-more-link').show()
                    } else {
                        $('#lightify-pro-load-more-link').hide();
                        $('#blog-pager .no-more').addClass('show')
                    }
                    $('.index-post .entry-image-link .entry-thumb').lazyify();
                    $('#main-wrapper').each(function() {
                        if (fixedSidebar == true) {
                            $(this).theiaStickySidebar()
                        }
                    })
                },
                beforeSend: function() {
                    $('#blog-pager .loading').show()
                },
                complete: function() {
                    $('#blog-pager .loading').hide()
                }
            });
            a.preventDefault()
        })
    });
    $('.back-top').each(function() {
        var $t = $(this);
        $(window).on('scroll', function() {
            $(this).scrollTop() >= 100 ? $t.fadeIn(250) : $t.fadeOut(250);
            $t.offset().top >= $('#footer-wrapper').offset().top - 32 ? $t.addClass('on-footer') : $t.removeClass('on-footer')
        }), $t.on('click', function() {
            $('html, body').animate({
                scrollTop: 0
            }, 500)
        })
    })
});
function shortCodeIfy(e, t, a) {
	for(var s = e.split("$"), i = /[^{\}]+(?=})/g, r = 0; r < s.length; r++) {
		var o = s[r].split("=");
		if(o[0].trim() == t) return null != (a = o[1]).match(i) && String(a.match(i)).trim()
	}
	return !1
}
$(".post-body a").each(function() {
	var e = $(this),
		t = e.html(),
		a = t.toLowerCase(),
		s = shortCodeIfy(t, "text"),
		i = shortCodeIfy(t, "icon"),
		r = shortCodeIfy(t, "color");
	a.match("getbutton") && 0 != s && (e.addClass("button btn").text(s), 0 != i && e.addClass(i), 0 != r && e.addClass("colored-button").attr("style", "background-color:" + r + ";"))
}),$(".post-body b").each(function() {
	var e = $(this),
		t = e.text(),
		a = t.toLowerCase().trim();
	a.match("{tocify}") && (t = 0 != shortCodeIfy(t, "title") ? shortCodeIfy(t, "title") : "Table of Contents", e.replaceWith('<div class="tocify-wrap"><div class="tocify-inner"><a href="javascript:;" class="tocify-title" role="button" title="' + t + '"><span class="tocify-title-text">' + t + '</span></a><ol id="tocify"></ol></div></div>'), $(".tocify-title").each(function(e) {
		(e = $(this)).on("click", function() {
			e.toggleClass("is-expanded"), $("#tocify").slideToggle(170)
		})
	}), $("#tocify").toc({
		content: "#post-body",
		headings: "h2,h3,h4"
	}), $("#tocify li a").each(function(e) {
		(e = $(this)).click(function() {
			return $("html,body").animate({
				scrollTop: ($(e.attr("href")).offset().top) - 20
			}, 500), !1
		})
	})), a.match("{contactform}") && (e.replaceWith('<div class="contact-form"/>'), $(".contact-form").append($("#ContactForm1")))
}), $(".post-body blockquote").each(function() {
	var e = $(this),
		t = e.text().toLowerCase().trim(),
		a = e.html();
	if(t.match("{alertsuccess}")) {
		const t = a.replace("{alertSuccess}", "");
		e.replaceWith('<div class="alert-message alert-success">' + t + "</div>")
	}
	if(t.match("{alertinfo}")) {
		const t = a.replace("{alertInfo}", "");
		e.replaceWith('<div class="alert-message alert-info">' + t + "</div>")
	}
	if(t.match("{alertwarning}")) {
		const t = a.replace("{alertWarning}", "");
		e.replaceWith('<div class="alert-message alert-warning">' + t + "</div>")
	}
	if(t.match("{alerterror}")) {
		const t = a.replace("{alertError}", "");
		e.replaceWith('<div class="alert-message alert-error">' + t + "</div>")
	}
	if(t.match("{codebox}")) {
		const l = shortCodeIfy(a, "lang") || shortCodeIfy(a, "language") || "plaintext";
		const t = a
			.replace("{codeBox}", "")
			.replace(/\$lang=\{[^}]+\}/i, "")
			.replace(/\$language=\{[^}]+\}/i, "");
		e.replaceWith('<pre class="code-box"><code class="language-' + l + '">' + t + "</code></pre>")
	}
}), $("#post-body iframe").each(function() {
		var e = $(this);
		e.attr("src").match("www.youtube.com") && e.wrap('<div class="responsive-video-wrap"/>')
	})
