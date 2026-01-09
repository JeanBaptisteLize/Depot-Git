// Ce script java permet de remplir un objet <div> du nom de "portfolio-content" avec du contenu dynamique.
// Exécute le code une fois la page chargée

window.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    if (!header) return;
    const main = document.getElementById('main');
    if (!main) return;
    const section = document.createElement('section');

    const el = (tag, className, text) => {      //tag: type d'élément, className: classe css, text: texte à insérer
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text) e.textContent = text;
        return e;
    };

    // En-tête de présentation
    header.appendChild(el('p', 'intro', "Bonjour, je m'appelle"));
    header.appendChild(el('h1', null, 'Jean-Baptiste Lizé.'));
    header.appendChild(el('h2', null, 'Developpeur en intelligence artificielle.'));
    header.appendChild(el('p', 'description', `Issu d'un master en ingénierie des systèmes complexes à l'université de La Garde, où j'ai pu développer des compétences en algorithmie, traitement du signal et de l'image. Je souhaite m'ouvrir à d'autres horizons via formation à l'ISEN Méditerranée afin de pouvoir décrocher le titre RNCP de développeur en intelligence artificielle.`));

    
    // À propos
    section.appendChild(el('h3', null, 'À propos'));

    const aboutText = `Au fil de mes études et expériences professionnelles, j'ai pu développer des compétences en programmation, notamment via Matlab, ainsi que les langages Python et C. Je souhaite aujourd’hui approfondir mes connaissances en data science, machine learning et le développement d'applications.`;
    section.appendChild(el('p', null, aboutText));
    main.appendChild(section);


    // Compétences techniques
    const techSkills = [
        'Python',
        'Matlab / Simulink',
        'Traitement du signal',
        'Traitement d\u2019image',
        'Classification d\u2019images',
        'Arduino',
        'C / C++',
        'VHDL'
    ];

    const techSection = document.createElement('section');
    const ulTech = document.createElement('ul'); ulTech.className = 'skills';
    techSection.appendChild(el('h3', null, 'Compétences techniques'));
    techSkills.forEach(s => ulTech.appendChild(el('li', null, s)));
    techSection.appendChild(ulTech);
    main.appendChild(techSection);

    // Compétences professionnelles
    const profSkills = [
        'Rédiger une documentation technique',
        'Test de validité sur capteurs',
        'Échanger avec client',
        'Participer aux réunions'
    ];
    const profSection = document.createElement('section');
    profSection.appendChild(el('h3', null, 'Compétences professionnelles'));
    const ulProf = document.createElement('ul'); ulProf.className = 'skills';
    profSkills.forEach(s => ulProf.appendChild(el('li', null, s)));
    profSection.appendChild(ulProf);
    main.appendChild(profSection);



    // Projets
    
    const projSection = document.createElement('section');

    projSection.appendChild(el('h3', null, 'Projets'));
        const projects = [
            {
                title: 'Stage de fin d\u2019études – OSEAN Underwater Technologies',
                text: "J'ai développé un algorithmie de traitements de signaux acoustiques sismiques sous-marins sur l'environnement Matlab. Cela incluait la gestion des données brutes issues des capteurs hydrophones et d'effectuer des pré-traitements (filtrage, calibration) avant d'appliquer des techniques d'analyse Densité Spectrale de Puissance (DSP).",
                type: 'professionnel'
            },
            {
                title: 'Classification de populations d\u2019herbiers',
                text: 'Classification d\u2019images Ifremer avec binarisation, séparation des canaux et Spectral Angle Mapper en fausses couleurs.',
                type: 'etude'
            }
        ];

        // Barre de filtre (sélecteur)
        const filterBar = document.createElement('div');
        filterBar.className = 'project-filter';
        const filterLabel = el('label', null, 'Filtrer : ');
        filterLabel.htmlFor = 'projectFilter';
        const select = document.createElement('select');
        select.id = 'projectFilter';
        const options = [
            { value: 'all', text: 'Tous' },
            { value: 'etude', text: "Projets d'Etude" },
            { value: 'professionnel', text: 'Projets Professionnel' }
        ];
        options.forEach(o => {
            const opt = document.createElement('option');
            opt.value = o.value;
            opt.textContent = o.text;
            select.appendChild(opt);
        });
        filterBar.appendChild(filterLabel);
        filterBar.appendChild(select);
        projSection.appendChild(filterBar);

        // Conteneur pour les cartes de projets
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'projects-list';
        projSection.appendChild(cardsContainer);

        // Fonction de rendu des projets selon filtre
        const renderProjects = (filter) => {
            cardsContainer.innerHTML = '';
            const list = projects.filter(p => filter === 'all' || p.type === filter);
            list.forEach(p => {
                const card = document.createElement('div');
                card.className = 'project';
                card.appendChild(el('h4', null, p.title));
                card.appendChild(el('p', null, p.text));
                cardsContainer.appendChild(card);
            });
        };

        // Initialisation
        renderProjects('all');
        select.addEventListener('change', (e) => renderProjects(e.target.value));

        main.appendChild(projSection);


    
    // Contact (formulaire sans backend)
    const contactSection = document.createElement('section');
    contactSection.appendChild(el('h3', null, 'Contact'));

    const contactForm = document.createElement('form');
    contactForm.id = 'contactForm';
    contactForm.noValidate = true;

    const createField = (labelText, type, id, placeholder) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'form-field';
        const label = el('label', null, labelText);
        label.htmlFor = id;
        let input;
        if (type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 5;
        } else {
            input = document.createElement('input');
            input.type = type;
        }
        input.id = id;
        input.name = id;
        if (placeholder) input.placeholder = placeholder;
        const err = el('small', 'error', '');
        err.id = id + '-error';
        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(err);
        return { wrapper, input, err };
    };

    const nameField = createField('Nom', 'text', 'contactName', 'Votre nom');
    const emailField = createField('Email', 'email', 'contactEmail', 'Votre email');
    const subjField = createField('Sujet', 'text', 'contactSubject', "Objet (optionnel)");
    const msgField = createField('Message', 'textarea', 'contactMessage', 'Votre message');

    contactForm.appendChild(nameField.wrapper);
    contactForm.appendChild(emailField.wrapper);
    contactForm.appendChild(subjField.wrapper);
    contactForm.appendChild(msgField.wrapper);

    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Envoyer';
    contactForm.appendChild(submitBtn);

    const formFeedback = el('div', 'form-feedback', '');
    contactSection.appendChild(contactForm);
    contactSection.appendChild(formFeedback);
    main.appendChild(contactSection);

    // Stockage temporaire en mémoire
    const contactStore = [];

    const validateEmail = (em) => /^\S+@\S+\.\S+$/.test(em);

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // reset erreurs
        nameField.err.textContent = '';
        emailField.err.textContent = '';
        msgField.err.textContent = '';
        formFeedback.textContent = '';
        formFeedback.className = 'form-feedback';

        const name = nameField.input.value.trim();
        const email = emailField.input.value.trim();
        const subject = subjField.input.value.trim();
        const message = msgField.input.value.trim();

        let valid = true;
        if (!name) { nameField.err.textContent = 'Veuillez saisir votre nom.'; valid = false; }
        if (!email) { emailField.err.textContent = 'Veuillez saisir votre email.'; valid = false; }
        else if (!validateEmail(email)) { emailField.err.textContent = 'Format d\'email invalide.'; valid = false; }
        if (!message) { msgField.err.textContent = 'Veuillez saisir un message.'; valid = false; }

        if (!valid) {
            formFeedback.textContent = 'Veuillez corriger les erreurs ci-dessus.';
            formFeedback.className = 'form-feedback error';
            return;
        }

        const entry = { name, email, subject, message, date: new Date().toISOString() };
        contactStore.push(entry);

        formFeedback.textContent = 'Message envoyé (stocké temporairement). Merci !';
        formFeedback.className = 'form-feedback success';

        contactForm.reset();
    });

    // Footer
    const footer = document.getElementById('footer');
    if (footer) {
        footer.innerHTML = '';
        footer.appendChild(el('p', null, '© 2026 – Jean-Baptiste Lizé'));
    }
    });
