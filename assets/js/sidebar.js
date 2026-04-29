/*
 * sidebar.js
 * Injects the shared sidebar fragment (/assets/sidebar.html) into #header
 * synchronously before the rest of the page scripts run, so main.js finds
 * #nav already populated when it sets up scrollex / panel.
 *
 * On index.html: rewrites nav hrefs from "/#section" to "#section" so that
 * main.js's scrollex/active-highlight logic (which requires bare "#" hrefs)
 * attaches correctly.
 *
 * On project pages: if <body data-page="..."> matches a key in PROJECT_NAV,
 * the nav items are replaced with auto-built links to every <h2> in
 * #main .two (the content section), excluding the hero heading, plus a
 * Home link as the last item.
 * To add a new project page: (1) add data-page="slug" to its <body>,
 * (2) add   slug: {}   to PROJECT_NAV below. That's it.
 */

// --- Per-project config -------------------------------------------
// Add an entry here when a new project page needs section nav.
// The value object is reserved for future per-project customisation.
var PROJECT_NAV = {
    abstractica: {}
    // 'flat-spot':   {}
    // webgpu:        {}
};
// -----------------------------------------------------------------

(function () {
    // Step 1: fetch + inject sidebar.html (unchanged behaviour)
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/sidebar.html', false); // synchronous
    xhr.send(null);

    if (xhr.status === 200) {
        var header = document.getElementById('header');
        if (header) {
            header.innerHTML = xhr.responseText;
        }
    }

    // Step 2: on index, rewrite "/#section" hrefs to bare "#section" so
    // main.js's href.charAt(0) === '#' guard passes and scrollex + active
    // highlighting attach correctly.
    var isIndex = window.location.pathname === '/'
               || window.location.pathname === '/index.html'
               || window.location.pathname.endsWith('/index.html');

    if (isIndex) {
        var links = document.querySelectorAll('#nav a[href^="/#"]');
        links.forEach(function (a) {
            a.setAttribute('href', a.getAttribute('href').slice(1)); // "/#foo" → "#foo"
        });
        return; // nothing more to do on index
    }

    // Step 3: detect project page
    var page = document.body.dataset.page;
    if (!page || !PROJECT_NAV.hasOwnProperty(page)) return;

    // Step 4: auto-slug every <h2> inside the content section (.two),
    // which excludes the hero <h2 class="alt"> inside section#top.
    var headings = document.querySelectorAll('#main .two h2');
    headings.forEach(function (h) {
        if (!h.id) {
            h.id = h.textContent.trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
        }
    });

    // Step 5: build nav <li> items from those headings
    var items = Array.from(headings).map(function (h) {
        return '<li><a href="#' + h.id + '">'
            + '<span class="icon solid fa-square">' + h.textContent.trim() + '</span>'
            + '</a></li>';
    }).join('');

    // Step 6: append Home link as the last item
    items = '<li><a href="/">'
        + '<span class="icon solid fa-home">Home</span>'
        + '</a></li>'
        + items;

    // Step 7: replace the nav list (logo/bottom stay untouched)
    var navUl = document.querySelector('#nav ul');
    if (navUl) {
        navUl.innerHTML = items;
    }
})();
