/*
 * projects-data.js
 * Single source of truth for all portfolio project cards.
 * To add a new project, append one object to window.PROJECTS.
 *
 * Fields:
 *   year        {number}  Release / completion year shown on the card.
 *   title       {string}  Display title.
 *   image       {string}  Path from site root (e.g. "images/marciman/foo.png").
 *   alt         {string}  Meaningful alt text for the image.
 *   techs       {Array}   Tech names resolved by tech-library.js.
 *   description {string}  HTML string for the card <p> body (may contain <strong>, <br>, etc.)
 *   sub         {string|null}  HTML for the <sub> footer line (links, course labels). null = omit.
 *   steamLink   {string|null}  Steam store URL — renders a dedicated steam-link button. null = omit.
 *   detailPage  {string}  Relative URL for the "Learn More" button.
 *   featured    {boolean} true → rendered in the "My Favourite Projects" section at the top.
 */

window.PROJECTS = [

    // ── Featured ──────────────────────────────────────────────────────

    {
        year: 2026,
        title: 'ABSTRACTICA',
        image: 'images/marciman/project-abstractica.png',
        alt: 'Third-person roguelike shooter game — ABSTRACTICA',
        techs: ['Unreal Engine', 'C++', 'Blueprint', 'Gameplay Ability System', 'Behaviour Trees', 'Niagara Particle Systems'],
        description: '<strong>Gameplay Programming, Game AI, Shader Programming</strong><br><br>'
            + 'This is a third person shooter with roguelike elements, devoloped by myself in <strong>Unreal Engine</strong>. While I am responsible for almost every aspect of the game, my main focus lies in <strong>Gameplay programming</strong> and developing the <strong>core systems</strong> that manage the loop of a roguelike, using tools like the UE <strong>Gameplay Ability System</strong>. In developement, I leverage a mix of <strong>C++</strong> and Blueprint programming.<br><br>'
            + 'I implemented the <strong>Game AI</strong> using Behaviour Trees as the main architecture. Currently I am making a multi-phased boss enemy. The game is set in a highly <strong>stylized world</strong> with no lit material, and I wrote a expanding color change shader using <strong>Signed Distance Fields</strong>. For particle effects I use UE5\'s <strong>Niagara Particle Systems</strong>.',
        sub: null,
        steamLink: 'https://store.steampowered.com/app/3571580/ABSTRACTICA/',
        detailPage: 'projects/abstractica.html',
        featured: true
    },

    {
        year: 2023,
        title: 'Flat Spot',
        image: 'images/marciman/FlatSpot_DeutscherPreis.png',
        alt: 'Flat Spot — motorsport management game',
        techs: ['Unity 3D', 'C#', 'Wwise', 'Shader Graph', 'Finite State Machines', 'Utility Based AI'],
        description: 'This casual motorsport management game was the centerpiece of my Bachelor\'s Thesis in Game Engineering, and was <strong>developed solo</strong> in <strong>Unity 3D</strong>. The biggest emphasis layed on the <strong>AI programming</strong>, making strong use of concepts like <strong>Finite State Machines</strong> and <strong>Utility Based AI</strong>. However, I also did the <strong>Gameplay programming</strong>, 3D modelling and <strong>shader programming</strong> (using Unity Shader Graph), as well as the <strong>implementation of sound effects using Wwise</strong>.<br><br>'
            + 'I wanted the players to experience motorsport like never before: very simple. In this <strong>exiting, fast-paced</strong> management game you can be team principal of your own team, upgrade your car with newly built parts and train your drivers to compete in races and win the championship. Use your drivers <strong>Special Abilities</strong> to gain an advantage over other drivers on track and leave them in the dust.',
        sub: null,
        steamLink: 'https://store.steampowered.com/app/2459820/Flat_Spot/',
        detailPage: 'projects/flat-spot.html',
        featured: true
    },

    // ── Other Projects ─────────────────────────────────────────────────

    {
        year: 2025,
        title: 'PAMCA - Master Thesis',
        image: 'images/marciman/project-pamca.png',
        alt: 'PAMCA motion capture plugin demo in Unreal Engine 5',
        techs: ['Unreal Engine 5', 'Rokoko'],
        description: 'Our <strong>Thesis project</strong> "Contextual Augmentation of Motion Capture Animations using Procedural Animation Techniques and Parameterization" led to a non-released <strong>plugin for UE5</strong> being created. The plugin lets the user tweak parameters to turn a simple walking animation into an injured limp, a drunken sway, making use of various principles of procedural animation such as inverse kinematics.',
        sub: 'MSc - Thesis Project',
        steamLink: null,
        detailPage: 'projects/pamca.html',
        featured: false
    },

    {
        year: 2024,
        title: 'A Song of Mold and Cheese',
        image: 'images/marciman/ASOMAC/project-asomac.png',
        alt: 'A Song of Mold and Cheese — adventure game set inside a fridge',
        techs: ['Unity 3D', 'Wwise'],
        description: 'A Song of Mold and Cheese is a demo for an <strong>adventure game</strong> set inside a fridge full of sentient food. I served as <strong>Technical Artist</strong> and <strong>Programmer</strong>, developing gameplay mechanics and implementing audio using <strong>Wwise</strong>.',
        sub: 'MSc - Game World Design | <a href="https://themarciman.itch.io/a-song-of-mold-and-cheese" target="_blank">Play it on itch.io</a>',
        steamLink: null,
        detailPage: 'projects/a-song-of-mold-and-cheese.html',
        featured: false
    },

    {
        year: 2024,
        title: 'WebGPU with C++ - Private Project',
        image: 'images/marciman/project-webgpu.png',
        alt: 'WebGPU 3D scenery rendered via C++ and Emscripten in the browser',
        techs: ['C++', 'WebGPU', 'OpenGL', 'emscripten'],
        description: 'This scenery was programmed using the graphics API <strong>WebGPU</strong> and the compiler toolchain <strong>emscripten</strong> to deepen my knowledge of 3D graphics.',
        sub: '<a href="https://github.com/MarcVonGlahn/myWebGPU-cpp-setup" target="_blank">Go check it out on GitHub.</a>',
        steamLink: null,
        detailPage: 'projects/webgpu.html',
        featured: false
    },

    {
        year: 2024,
        title: 'For God and Motherland',
        image: 'images/marciman/project-forgodandmotherland.png',
        alt: 'For God and Motherland — critical design game made in Unity',
        techs: ['Unity 3D', 'C#', 'Adobe Illustrator'],
        description: 'This game was developed under the aspect of <strong>critical design</strong> in the university course "Playable Media" at the IT University in Copenhagen. It was developed in <strong>Unity 3D</strong> and <strong>C#</strong>, with art made in <strong>Adobe Illustrator</strong>.',
        sub: 'MSc - Playable Media | <a href="https://themarciman.itch.io/for-god-and-motherland" target="_blank">Play it on itch.io</a>',
        steamLink: null,
        detailPage: 'projects/for-god-and-motherland.html',
        featured: false
    },

    {
        year: 2023,
        title: 'Brushwood Residence',
        image: 'images/marciman/project-residence.png',
        alt: 'Brushwood Residence — mysterious puzzle escape-room game',
        techs: ['Unity 3D'],
        description: 'Brushwood Residence is a <strong>mysterious puzzle game</strong> combining escape room elements with a magical atmosphere. As an adventurer, you explore a house with <strong>other-worldly paintings</strong>, entering them to solve puzzles and uncover their secrets.',
        sub: 'MSc - Making Games | <a href="https://themarciman.itch.io/brushwood-residence" target="_blank">View on itch.io</a>',
        steamLink: null,
        detailPage: 'projects/brushwood-residence.html',
        featured: false
    },

    {
        year: 2022,
        title: 'Evil Sandman',
        image: 'images/marciman/project-evilsandman_1080.png',
        alt: 'Evil Sandman — 48-hour game jam project with dreamcatcher combat',
        techs: ['Unity 3D'],
        description: 'This Game Jam project was pieced together by a <strong>Team of 6 in 48 hours</strong>. Armed with a dreamcatcher, you embark on a mission to defeat enemies and the evil Sandman in a fever dream world. I programmed the <strong>character controller</strong> and the <strong>Enemy AI using Finite State Machines</strong>, and helped with character rigging and animation.',
        sub: '<a href="https://itch.io/jam/mana2/rate/1820978" target="_blank">Visit the game on itch.io!</a>',
        steamLink: null,
        detailPage: 'projects/evil-sandman.html',
        featured: false
    },

    {
        year: 2022,
        title: "Eternity's Lair",
        image: 'images/marciman/eternitys-lair.png',
        alt: "Eternity's Lair — 2.5D roguelite with cyberpunk rat enemies",
        techs: ['Unity 3D', 'C#', 'Blender'],
        description: 'This 2.5D Rogue-Lite Game on PC, was developed by a <strong>Team of 6 members</strong> in the context of a class in 2022. I was responsible for development of the enemies. This included <strong>designing and modelling</strong> of the cyberpunk inspired rats, as well as <strong>developing the Enemy-AI</strong> using Behaviour Trees. The game was developed in <strong>Unity 3D and C#</strong>.',
        sub: '<a href="https://www.hs-kempten.de/fakultaet-informatik/zentrale-einrichtungen/computerspiel-zentrum-games/projekt/projektarbeit-eternitys-lair-1676" target="_blank">View the project!</a>',
        steamLink: null,
        detailPage: 'projects/eternitys-lair.html',
        featured: false
    },

    {
        year: 2021,
        title: 'Desk Dash',
        image: 'images/marciman/project-deskdash_1080.png',
        alt: 'Desk Dash — 3D arcade sports game built in Unity',
        techs: ['Unity 3D'],
        description: 'A 3D-Arcade Sports Game, that was used as practice for various <strong>Unity 3D development workflows</strong>. I worked on the game flow and the <strong>gameplay mechanics</strong> for Pole Vault and Archery.',
        sub: 'Learning experience for Unity 3D',
        steamLink: null,
        detailPage: 'projects/desk-dash.html',
        featured: false
    },

    {
        year: 2020,
        title: 'A Nightmare on Bahnhofsstreet',
        image: 'images/marciman/project-nightmare_1080.png',
        alt: 'A Nightmare on Bahnhofsstreet — VR horror game made in UE4',
        techs: ['Unreal Engine 4'],
        description: 'A Nightmare on Bahnhofsstreet is a Virtual Reality Game made in UE4. We were a <strong>Team of 6 students</strong> and had 3 months to build this game. I was mainly responsible for <strong>modelling objects</strong> for our scenes, such as collectables, static objects and interactable objects. Furthermore I had a small introduction to <strong>Visual Scripting in UE4</strong>.',
        sub: 'BSc - Game Engineering Lab',
        steamLink: null,
        detailPage: 'projects/nightmare-on-bahnhofsstreet.html',
        featured: false
    },

    {
        year: 2020,
        title: 'Not Pong',
        image: 'images/marciman/project-notpong.png',
        alt: 'Not Pong — 2D puzzle game inspired by Angry Birds and beer pong',
        techs: ['Unity 3D'],
        description: 'This 2D Puzzle Game was inspired by the mechanics of Angry Birds and was used to <strong>learn the ropes</strong> of development in Unity. The idea of a beer pong game came during my first semester, and the result was this game. I drew all the art and followed various tutorials for the logic.',
        sub: 'Learning experience for Unity 2D | <a href="https://themarciman.itch.io/notpong" target="_blank">View on itch.io</a>',
        steamLink: null,
        detailPage: 'projects/not-pong.html',
        featured: false
    }

];
