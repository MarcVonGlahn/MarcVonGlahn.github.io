/*
 * sidebar.js
 * Injects the shared sidebar fragment (/assets/sidebar.html) into #header
 * synchronously before the rest of the page scripts run, so main.js finds
 * #nav already populated when it sets up scrollex / panel.
 */
(function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/sidebar.html', false); // synchronous
    xhr.send(null);

    if (xhr.status === 200) {
        var header = document.getElementById('header');
        if (header) {
            header.innerHTML = xhr.responseText;
        }
    }
})();
