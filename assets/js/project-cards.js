/*
 * project-cards.js
 * Reads window.PROJECTS (defined in projects-data.js) and renders project
 * cards into the portfolio sections of index.html using the DOM API.
 *
 * Targets:
 *   #portfolio     .row  ← projects where featured === true
 *   #other-projects .row  ← all other projects
 *
 * Depends on: projects-data.js, tech-library.js (renderTechnologies)
 */

(function () {

    function buildCard(project) {
        // .item-wrapper
        var wrapper = document.createElement('div');
        wrapper.className = 'item-wrapper';

        // Year badge
        var yearDiv = document.createElement('div');
        yearDiv.className = 'item-year';
        yearDiv.textContent = project.year;
        wrapper.appendChild(yearDiv);

        // <article class="item">
        var article = document.createElement('article');
        article.className = 'item';

        // .item-content
        var content = document.createElement('div');
        content.className = 'item-content';

        // Image link
        var imgLink = document.createElement('a');
        imgLink.href = '#';
        imgLink.className = 'image fit extra';
        var img = document.createElement('img');
        img.src = project.image;
        img.alt = project.alt;
        imgLink.appendChild(img);
        content.appendChild(imgLink);

        // .item-text
        var itemText = document.createElement('div');
        itemText.className = 'item-text';

        var header = document.createElement('header');

        var h3 = document.createElement('h3');
        var strong = document.createElement('strong');
        strong.textContent = project.title;
        h3.appendChild(strong);
        header.appendChild(h3);

        // Tech grid
        var techDiv = document.createElement('div');
        techDiv.className = 'tech-rendered';
        techDiv.innerHTML = renderTechnologies(project.techs, false);
        header.appendChild(techDiv);

        // Description paragraph
        var p = document.createElement('p');
        p.innerHTML = project.description;

        if (project.steamLink) {
            p.innerHTML += '<br><br>';
            var sub = document.createElement('sub');
            var a = document.createElement('a');
            a.href = project.steamLink;
            a.className = 'steam-link';
            a.target = '_blank';
            a.textContent = 'Check out the Steam Page!';
            sub.appendChild(a);
            p.appendChild(sub);
        } else if (project.sub) {
            p.innerHTML += '<br><br>';
            var sub = document.createElement('sub');
            sub.innerHTML = project.sub;
            p.appendChild(sub);
        }

        header.appendChild(p);
        itemText.appendChild(header);
        content.appendChild(itemText);
        article.appendChild(content);

        // "Learn More" button
        var btn = document.createElement('a');
        btn.href = project.detailPage;
        btn.className = 'button button-outline button-small';
        btn.textContent = 'Learn More';
        article.appendChild(btn);

        wrapper.appendChild(article);
        return wrapper;
    }

    function renderSection(sectionId, projects) {
        var row = document.querySelector('#' + sectionId + ' .row');
        if (!row) return;

        var col = document.createElement('div');
        col.className = 'col-4 col-12-mobile';

        projects.forEach(function (project) {
            col.appendChild(buildCard(project));
        });

        row.appendChild(col);
    }

    var featured = window.PROJECTS.filter(function (p) { return p.featured; });
    var others   = window.PROJECTS.filter(function (p) { return !p.featured; });

    renderSection('portfolio', featured);
    renderSection('other-projects', others);

})();
