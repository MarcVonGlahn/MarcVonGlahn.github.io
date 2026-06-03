/*
 * sidebar.js
 * Injects the shared sidebar fragment (/assets/sidebar.html) into #header
 * asynchronously, then dispatches a 'sidebar:ready' CustomEvent so that
 * main.js can safely initialise scrollex/panel after the nav is in the DOM.
 *
 * On index.html: rewrites nav hrefs from "/#section" to "#section" so that
 * main.js's scrollex/active-highlight logic (which requires bare "#" hrefs)
 * attaches correctly.
 *
 * On project pages: if <body data-page="..."> matches a key in PROJECT_NAV,
 * the nav items are replaced with auto-built links to every <h2> in
 * #main .two (the content section), excluding the hero heading, plus a
 * Home link as the first item.
 * To add a new project page: (1) add data-page="slug" to its <body>,
 * (2) add   slug: {}   to PROJECT_NAV below. That's it.
 */

// --- Per-project config -------------------------------------------
// Add an entry here when a new project page needs section nav.
// The value object is reserved for future per-project customisation.
var PROJECT_NAV = {
    abstractica: {},
    'flat-spot': {},
    'a-song-of-mold-and-cheese': {},
    webgpu: {},
    'for-god-and-motherland': {},
    'brushwood-residence': {},
    'evil-sandman': {},
    'eternitys-lair': {},
    'desk-dash': {},
    'nightmare-on-bahnhofsstreet': {},
    'not-pong': {},
    pamca: {}
};
// -----------------------------------------------------------------

(function () {

    function makeNavItem(href, iconClass, labelText) {
        var li   = document.createElement('li');
        var a    = document.createElement('a');
        var span = document.createElement('span');
        a.href        = href;
        span.className = iconClass;
        span.textContent = labelText;
        a.appendChild(span);
        li.appendChild(a);
        return li;
    }

    function applyNavLogic() {
        var isIndex = window.location.pathname === '/'
                   || window.location.pathname === '/index.html'
                   || window.location.pathname.endsWith('/index.html');

        if (isIndex) {
            // Rewrite "/#section" hrefs to bare "#section" so main.js's
            // href.charAt(0) === '#' guard passes and scrollex attaches.
            document.querySelectorAll('#nav a[href^="/#"]').forEach(function (a) {
                a.setAttribute('href', a.getAttribute('href').slice(1));
            });
            return;
        }

        var page = document.body.dataset.page;
        if (!page || !PROJECT_NAV.hasOwnProperty(page)) return;

        // Auto-slug every <h2> inside the content section (.two),
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

        var navUl = document.querySelector('#nav ul');
        if (!navUl) return;

        navUl.innerHTML = '';
        navUl.appendChild(makeNavItem('/', 'icon solid fa-home', 'Home'));
        headings.forEach(function (h) {
            navUl.appendChild(makeNavItem('#' + h.id, 'icon solid fa-square', h.textContent.trim()));
        });
    }

    fetch('/assets/sidebar.html')
        .then(function (response) { return response.text(); })
        .then(function (html) {
            var header = document.getElementById('header');
            if (header) header.innerHTML = html;
            applyNavLogic();
            document.dispatchEvent(new CustomEvent('sidebar:ready'));
        });

})();
