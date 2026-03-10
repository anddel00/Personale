// ==========================================
// UNLOCK LOGIC & 3D PARALLAX
// ==========================================
const lockContainer = document.getElementById('lock-container');
const stackView = document.getElementById('stack-view');
const folderStack = document.getElementById('folderStack');
const projectsContainer = document.getElementById('projectsContainer');
const hint = document.getElementById('clickHint');

let isUnlocked = false;

// 1. Effetto Parallax che segue il mouse (OTTIMIZZATO SAFARI)
let isStackTicking = false; // Flag indipendente per la pila

document.addEventListener('mousemove', (e) => {
  if (isUnlocked) return; // Se sbloccato, smette di muoversi

  // Lasciamo che il monitor decida quando disegnare il frame (60 FPS fluidi)
  if (!isStackTicking) {
    window.requestAnimationFrame(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      // Calcola il movimento del mouse (diviso per 40 per renderlo morbido)
      const moveX = (e.clientX - centerX) / 40;
      const moveY = (e.clientY - centerY) / 40;

      // Applica l'angolo base sommandoci il movimento del mouse
      folderStack.style.transform = `rotateY(${-30 + moveX}deg) rotateX(${10 - moveY}deg) translateX(-10px)`;

      isStackTicking = false; // Sblocca per il prossimo frame
    });
    isStackTicking = true; // Blocca i calcoli inutili tra un frame e l'altro
  }
});
// 2. Ritorna alla posizione originale se esci col mouse dallo schermo
document.addEventListener('mouseleave', () => {
  if (!isUnlocked) {
    folderStack.style.transform = `rotateY(-30deg) rotateX(10deg) translateX(-10px)`;
  }
});

// 3. Logica di Sblocco
function unlockArchive() {
  if (isUnlocked) return;
  isUnlocked = true;

  folderStack.style.transform = `rotateY(0deg) rotateX(0deg) scale(1.05)`;

  lockContainer.classList.add('unlocked');
  hint.classList.add('fade-out');

  setTimeout(() => {
    folderStack.classList.add('spread');
    lockContainer.classList.add('fade-out');
  }, 400);

  setTimeout(() => {
    stackView.style.display = 'none';
    projectsContainer.classList.add('visible');
    const cards = document.querySelectorAll('.folder-wrapper');
    cards.forEach((card, index) => {
      setTimeout(() => { card.classList.add('animate-in'); }, index * 100);
    });
  }, 1000);
}

lockContainer.addEventListener('click', (e) => { e.stopPropagation(); unlockArchive(); });
folderStack.addEventListener('click', unlockArchive);

// ==========================================
// PROJECTS DATABASE
// ==========================================
const isEnglish = document.documentElement.lang === 'en';

const projectsIT = [
  {
    id: 1,
    title: "Village Vista Manager",
    year: "2024",
    shortDesc: "Property Management System con Booking Engine integrato.",
    fullDesc: "Applicazione web enterprise di tipo <strong>PMS (Property Management System) con Booking Engine integrato</strong>, progettata per la gestione completa di villaggi turistici e modernizzata in un'<strong>infrastruttura Cloud-Native.</strong>\n\nIl sistema include:\n- <strong>Booking Engine:</strong> Sistema di prenotazione self-service per i clienti con verifica disponibilità in tempo reale e gestione dei pagamenti.\n- <strong>Dashboard PMS:</strong> Cruscotto amministrativo per il controllo centralizzato degli alloggi, dei flussi finanziari e delle anagrafiche clienti.\n- <strong>Modulo Staff:</strong> Portale dedicato ai dipendenti per la consultazione dinamica dei turni di lavoro e gestione delle mansioni.\n\nIl progetto unisce una rigorosa architettura <strong>Object-Oriented</strong> (Java, pattern <strong>MVC</strong> e <strong>DAO</strong>) a un'infrastruttura moderna con container <strong>Docker</strong>, database in cloud (Aiven) e pipeline <strong>CI/CD</strong> per il deploy automatizzato (Render).",
    gallery: [
      { src: "img/villagevista_home.png", title: "Homepage Front-Desk" },
      { src: "img/villagevista_dashboard.png", title: "Dashboard Calendario Prenotazioni" },
      { src: "img/villagevista_turni.png", title: "Dashboard Gestione Turni Staff" },
      { src: "img/Admin_login_desk.png", title: "Login Admin & Dipendenti (Desktop)" },
      { src: "img/admin_login_mobile.png", title: "Login Admin & Dipendenti (Mobile)" },
      { src: "img/cliente_mobile.png", title: "Login Area Clienti (Mobile)" },
      { src: "img/dip_mobile.png", title: "Dashboard Staff Sidebar (Mobile)" }
    ],
    tech: ["Java", "SQL", "MVC Pattern", "DAO Pattern", "Swing/JavaFX", "OOP", "Cloud-Native", "Docker"],
    link: "https://villagevista-adf.onrender.com",
    github: "https://github.com/anddel00/VillageVista_Docker",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Apri Cartella",
    visitBtn: "Visita Sito Online ↗",
    githubFrontBtn: "Repository GitHub - Frontend ↗",
    githubBackBtn: "Repository GitHub - Backend ↗",
    githubBtn: "Repository GitHub ↗"
  },
  {
    id: 2,
    title: "Social Network Eventi",
    year: "2024",
    shortDesc: "Piattaforma social & QA Testing.",
    fullDesc: "Progetto presentato all'esame di Ingegneria del Software, valutato con il massimo dei voti.\n\nIl ciclo di vita del software (SDLC) ha seguito standard industriali, includendo una fase di testing rigorosa documentata tramite template professionali.\n\n<strong>Ruolo e Responsabilità:</strong>\nIn qualità di <strong>QA (Quality Assurance)</strong>, ho redatto ed eseguito Test Case funzionali per validare le feature critiche.\nIl mio team (Watchdogs) ha curato l'intera implementazione delle componenti Core:\n- <strong>Frontend & DB:</strong> Sviluppo Home Page e architettura Database.\n- <strong>Advanced Search:</strong> Logica complessa per la Barra di Ricerca e il sistema di Filtri dinamici.",
    gallery: [
      { src: "img/progettoeventi_preview.png", title: "Home Network Eventi" },
      { src: "img/progettoeventi_test1.png", title: "Test Case: Filtri dinamici" },
      { src: "img/progettoeventi_test2.png", title: "Test Case: Search bar" }
    ],
    tech: ["Java", "SQL", "QA Testing", "Software Lifecycle", "Teamwork"],
    link: "#",
    githubFront: "https://github.com/anddel00/WatchDogs_Front",
    githubBack: "https://github.com/anddel00/WatchDogs_Back",
    folderAction: "Apri Cartella",
    visitBtn: "Visita Sito Online ↗",
    githubFrontBtn: "Repository GitHub - Frontend ↗",
    githubBackBtn: "Repository GitHub - Backend ↗",
    githubBtn: "Repository GitHub ↗"
  },
  {
    id: 3,
    title: "Adelino Libero Website",
    year: "2025",
    shortDesc: "Sito Web Vetrina High-Performance.",
    fullDesc: "Sito web vetrina sviluppato per un commerciante privato nel settore giardinaggio. L'obiettivo era massimizzare la visibilità online e la conversione utenti.\n\nHo curato ogni dettaglio tecnico:\n- <strong>CSS Avanzato:</strong> Design ricercato e layout responsive senza framework pesanti.\n- <strong>Strategia CTA:</strong> Call-to-Action posizionate strategicamente per guidare l'utente al contatto.\n- <strong>SEO Tecnica:</strong> Ottimizzazione profonda del codice per garantire indicizzazione rapida e alta vendibilità nel mercato locale.",
    gallery: [
      { src: "img/adelinolibero_preview.png", title: "Vetrina Homepage" },
      { src: "img/adelinolibero_preview_2.png", title: "Dettaglio Offerta" },
      { src: "img/adelinolibero_preview_3.png", title: "Catalogo" }
    ],
    tech: ["HTML5", "CSS3 Avanzato", "SEO Strategy", "UX/UI Design"],
    link: "https://liberoadelino.it",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Apri Cartella",
    visitBtn: "Visita Sito Online ↗",
    githubFrontBtn: "Repository GitHub - Frontend ↗",
    githubBackBtn: "Repository GitHub - Backend ↗",
    githubBtn: "Repository GitHub ↗"
  },
  {
    id: 4,
    title: "CercaUniversità (CINECA)",
    year: "2025",
    shortDesc: "Refactoring Portale Ministeriale (MUR).",
    fullDesc: "Progetto di Tesi svolto presso gli uffici CINECA. Si tratta di un massiccio refactoring UI/UX del portale 'Cerca Università' del Ministero dell'Istruzione e del Merito.\n\nIl flusso di lavoro ha compreso:\n1. <strong>Prototipazione:</strong> Design Lo-Fi con Balsamiq e Hi-Fi con Figma.\n2. <strong>Sviluppo:</strong> Implementazione frontend moderna tramite HTML, CSS e JavaScript.\n3. <strong>Testing & Audit:</strong> Analisi approfondita con <strong>Google Lighthouse</strong> per certificare prestazioni, SEO e conformità agli standard di accessibilità <strong>WCAG</strong>.",
    gallery: [
      { src: "img/cercauniversita_balsamiq.png", title: "Prototipo Lo-Fi (Balsamiq)" },
      { src: "img/cercauniversita_figma.png", title: "Prototipo Hi-Fi (Figma)" },
      { src: "img/cercauniversita_preview.png", title: "UI Frontend Finale" }
    ],
    tech: ["WAI-ARIA", "Figma", "Balsamiq", "Google Lighthouse", "Frontend Eng."],
    link: "#",
    github: "https://github.com/anddel00/Progetto_tesi",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Apri Cartella",
    visitBtn: "Visita Sito Online ↗",
    githubFrontBtn: "Repository GitHub - Frontend ↗",
    githubBackBtn: "Repository GitHub - Backend ↗",
    githubBtn: "Repository GitHub ↗"
  },
  {
    id: 5,
    title: "Portfolio Senior Engineer",
    year: "2026",
    shortDesc: "Portfolio Personale Sicuro & GDPR Compliant.",
    fullDesc: "Sviluppo completo di un portfolio per un Senior Mechanical Engineer. Il sito presenta una landing page, un'area profilo e un'innovativa <strong>Area Passioni/Interessi</strong> protetta. \n Alcune tab e informazioni sono state omesse nella preview per motivi di privacy. \n\nCaratteristiche Tecniche:\n- <strong>Sicurezza Backend:</strong> Protezione area riservata con password personalizzata, verifica lato server (PHP) e hashing per integrità dati.\n- <strong>Analytics:</strong> Configurazione avanzata di Google Analytics 4 con tracciamento 'events' custom e consulenza al cliente.\n- <strong>Compliance:</strong> Gestione GDPR/Cookie completa tramite Iubenda.\n- <strong>Deploy:</strong> Messa in produzione con certificato SSL e protocollo HTTPS.",
    gallery: [
      { src: "img/DavideProfilo.png", title: "Profilo " },
      { src: "img/davide_protetta.png", title: "Area Personale Sicura"},
      { src: "img/davide_GA.png", title: "Google Analytics API"}
    ],
    tech: ["PHP", "Hashing/Security", "Google Analytics 4", "Iubenda", "SSL/HTTPS"],
    link: "#",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Apri Cartella",
    visitBtn: "Visita Sito Online ↗",
    githubFrontBtn: "Repository GitHub - Frontend ↗",
    githubBackBtn: "Repository GitHub - Backend ↗",
    githubBtn: "Repository GitHub ↗"
  },
  {
    id: 6,
    title: "Questo Portfolio",
    year: "2026",
    shortDesc: "Il mio Portfolio Personale",
    fullDesc: "Il sito che stai navigando è un esempio vivo delle mie competenze attuali.\n\nCostruito da zero con un approccio 'Mobile-First', utilizza tecnologie web moderne per garantire fluidità, estetica e pulizia del codice, riflettendo la mia attenzione per i dettagli e la performance.",
    gallery: [
      { src: "img/personale_home.png", title: "Homepage Portfolio" },
      { src: "img/mobile_home.png", title: "Homepage Mobile" },
      { src: "img/profilo_header.png", title: "Sezione Header Profilo" },
      { src: "img/profilo_skillcard.png", title: "Skill Card Profilo" },
      { src: "img/progetti_pila.png", title: "Vista Pila Progetti" },
      { src: "img/progetti_folder.png", title: "Cartelle Progetti" },
      { src: "img/menunav_mobile.png", title: "Menu Navigazione Mobile" }
    ],
    tech: ["HTML5", "CSS3 Moderno", "JavaScript ES6", "Glassmorphism"],
    link: "#",
    github: "https://github.com/anddel00/Personale",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Apri Cartella",
    visitBtn: "Visita Sito Online ↗",
    githubFrontBtn: "Repository GitHub - Frontend ↗",
    githubBackBtn: "Repository GitHub - Backend ↗",
    githubBtn: "Repository GitHub ↗"
  }
];

const projectsEN = [
  {
    id: 1,
    title: "Village Vista Manager",
    year: "2024",
    shortDesc: "Property Management System with integrated Booking Engine.",
    fullDesc: "Enterprise web application functioning as a <strong>PMS (Property Management System) with an integrated Booking Engine</strong>, designed for the comprehensive management of tourist villages and modernized into a <strong>Cloud-Native infrastructure.</strong>\n\nThe system includes:\n- <strong>Booking Engine:</strong> Self-service reservation system for customers with real-time availability checks and payment management.\n- <strong>PMS Dashboard:</strong> Administrative hub for centralized control of accommodations, financial flows, and customer records.\n- <strong>Staff Module:</strong> Dedicated portal for employees for dynamic shift viewing and task management.\n\nThe project combines a rigorous <strong>Object-Oriented</strong> architecture (Java, <strong>MVC</strong> and <strong>DAO</strong> patterns) with a modern infrastructure using <strong>Docker</strong> containers, cloud database (Aiven), and <strong>CI/CD</strong> pipelines for automated deployment (Render).",
    gallery: [
      { src: "img/villagevista_home.png", title: "Front-Desk Homepage" },
      { src: "img/villagevista_dashboard.png", title: "Booking Calendar Dashboard" },
      { src: "img/villagevista_turni.png", title: "Staff Shift Management Dashboard" },
      { src: "img/Admin_login_desk.png", title: "Admin & Staff Login (Desktop)" },
      { src: "img/admin_login_mobile.png", title: "Admin & Staff Login (Mobile)" },
      { src: "img/cliente_mobile.png", title: "Customer Area Login (Mobile)" },
      { src: "img/dip_mobile.png", title: "Staff Dashboard Sidebar (Mobile)" }
    ],
    tech: ["Java", "SQL", "MVC Pattern", "DAO Pattern", "Swing/JavaFX", "OOP", "Cloud-Native", "Docker"],
    link: "https://villagevista-adf.onrender.com",
    github: "https://github.com/anddel00/VillageVista_Docker",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Open Folder",
    visitBtn: "Visit Live Site ↗",
    githubFrontBtn: "GitHub Repository - Frontend ↗",
    githubBackBtn: "GitHub Repository - Backend ↗",
    githubBtn: "GitHub Repository ↗"
  },
  {
    id: 2,
    title: "Events Social Network",
    year: "2024",
    shortDesc: "Social Platform & QA Testing.",
    fullDesc: "Project presented for the Software Engineering exam, graded with top marks.\n\nThe Software Development Life Cycle (SDLC) followed industry standards, including a rigorous testing phase documented via professional templates.\n\n<strong>Role and Responsibilities:</strong>\nAs <strong>QA (Quality Assurance)</strong>, I drafted and executed functional Test Cases to validate critical features.\nMy team (Watchdogs) oversaw the entire implementation of the Core components:\n- <strong>Frontend & DB:</strong> Home Page development and Database architecture.\n- <strong>Advanced Search:</strong> Complex logic for the Search Bar and dynamic Filtering system.",
    gallery: [
      { src: "img/progettoeventi_preview.png", title: "Events Network Home" },
      { src: "img/progettoeventi_test1.png", title: "Test Case: Dynamic Filters" },
      { src: "img/progettoeventi_test2.png", title: "Test Case: Search Bar" }
    ],
    tech: ["Java", "SQL", "QA Testing", "Software Lifecycle", "Teamwork"],
    link: "#",
    githubFront: "https://github.com/anddel00/WatchDogs_Front",
    githubBack: "https://github.com/anddel00/WatchDogs_Back",
    folderAction: "Open Folder",
    visitBtn: "Visit Live Site ↗",
    githubFrontBtn: "GitHub Repository - Frontend ↗",
    githubBackBtn: "GitHub Repository - Backend ↗",
    githubBtn: "GitHub Repository ↗"
  },
  {
    id: 3,
    title: "Adelino Libero Website",
    year: "2025",
    shortDesc: "High-Performance Showcase Website.",
    fullDesc: "Showcase website developed for a private merchant in the gardening sector. The goal was to maximize online visibility and user conversion.\n\nI managed every technical detail:\n- <strong>Advanced CSS:</strong> Refined design and responsive layout without heavy frameworks.\n- <strong>CTA Strategy:</strong> Call-to-Actions strategically positioned to guide users toward contact.\n- <strong>Technical SEO:</strong> Deep code optimization to ensure rapid indexing and high marketability in the local area.",
    gallery: [
      { src: "img/adelinolibero_preview.png", title: "Showcase Homepage" },
      { src: "img/adelinolibero_preview_2.png", title: "Offer Details" },
      { src: "img/adelinolibero_preview_3.png", title: "Catalog" }
    ],
    tech: ["HTML5", "Advanced CSS3", "SEO Strategy", "UX/UI Design"],
    link: "https://liberoadelino.it",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Open Folder",
    visitBtn: "Visit Live Site ↗",
    githubFrontBtn: "GitHub Repository - Frontend ↗",
    githubBackBtn: "GitHub Repository - Backend ↗",
    githubBtn: "GitHub Repository ↗"
  },
  {
    id: 4,
    title: "CercaUniversità (CINECA)",
    year: "2025",
    shortDesc: "Ministerial Portal Refactoring (MUR).",
    fullDesc: "Thesis project carried out at the CINECA offices. It involves a massive UI/UX refactoring of the 'Cerca Università' portal for the Ministry of Education and Merit.\n\nThe workflow included:\n1. <strong>Prototyping:</strong> Lo-Fi design with Balsamiq and Hi-Fi with Figma.\n2. <strong>Development:</strong> Modern frontend implementation using HTML, CSS, and JavaScript.\n3. <strong>Testing & Audit:</strong> In-depth analysis with <strong>Google Lighthouse</strong> to certify performance, SEO, and compliance with <strong>WCAG</strong> accessibility standards.",
    gallery: [
      { src: "img/cercauniversita_balsamiq.png", title: "Lo-Fi Prototype (Balsamiq)" },
      { src: "img/cercauniversita_figma.png", title: "Hi-Fi Prototype (Figma)" },
      { src: "img/cercauniversita_preview.png", title: "Final Frontend UI" }
    ],
    tech: ["WAI-ARIA", "Figma", "Balsamiq", "Google Lighthouse", "Frontend Eng."],
    link: "#",
    github: "https://github.com/anddel00/Progetto_tesi",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Open Folder",
    visitBtn: "Visit Live Site ↗",
    githubFrontBtn: "GitHub Repository - Frontend ↗",
    githubBackBtn: "GitHub Repository - Backend ↗",
    githubBtn: "GitHub Repository ↗"
  },
  {
    id: 5,
    title: "Senior Engineer Portfolio",
    year: "2026",
    shortDesc: "Secure & GDPR Compliant Personal Portfolio.",
    fullDesc: "Complete development of a portfolio for a Senior Mechanical Engineer. The site features a landing page, a profile area, and an innovative protected <strong>Passions/Interests Area</strong>. \n Certain tabs and information have been omitted in the preview for privacy reasons. \n\nTechnical Features:\n- <strong>Backend Security:</strong> Protected private area with custom password, server-side verification (PHP), and hashing for data integrity.\n- <strong>Analytics:</strong> Advanced Google Analytics 4 configuration with custom 'events' tracking and client consultation.\n- <strong>Compliance:</strong> Full GDPR/Cookie management via Iubenda.\n- <strong>Deploy:</strong> Production deployment with SSL certificate and HTTPS protocol.",
    gallery: [
      { src: "img/DavideProfilo.png", title: "Profile" },
      { src: "img/davide_protetta.png", title: "Secure Personal Area"},
      { src: "img/davide_GA.png", title: "Google Analytics API"}
    ],
    tech: ["PHP", "Hashing/Security", "Google Analytics 4", "Iubenda", "SSL/HTTPS"],
    link: "#",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Open Folder",
    visitBtn: "Visit Live Site ↗",
    githubFrontBtn: "GitHub Repository - Frontend ↗",
    githubBackBtn: "GitHub Repository - Backend ↗",
    githubBtn: "GitHub Repository ↗"
  },
  {
    id: 6,
    title: "This Portfolio",
    year: "2026",
    shortDesc: "My Personal Portfolio",
    fullDesc: "The website you are browsing is a live example of my current skills.\n\nBuilt from scratch with a 'Mobile-First' approach, it uses modern web technologies to ensure fluidity, aesthetics, and clean code, reflecting my attention to detail and performance.",
    gallery: [
      { src: "img/personale_home.png", title: "Portfolio Homepage" },
      { src: "img/mobile_home.png", title: "Mobile Homepage" },
      { src: "img/profilo_header.png", title: "Profile Header Section" },
      { src: "img/profilo_skillcard.png", title: "Profile Skill Card" },
      { src: "img/progetti_pila.png", title: "Projects Stack View" },
      { src: "img/progetti_folder.png", title: "Projects Folders" },
      { src: "img/menunav_mobile.png", title: "Mobile Navigation Menu" }
    ],
    tech: ["HTML5", "Modern CSS3", "JavaScript ES6", "Glassmorphism"],
    link: "#",
    github: "https://github.com/anddel00/Personale",
    githubFront: "#",
    githubBack: "#",
    folderAction: "Open Folder",
    visitBtn: "Visit Live Site ↗",
    githubFrontBtn: "GitHub Repository - Frontend ↗",
    githubBackBtn: "GitHub Repository - Backend ↗",
    githubBtn: "GitHub Repository ↗"
  }
];

const projects = isEnglish ? projectsEN : projectsIT;

// ==========================================
// PROJECTS GRID GENERATION & 3D TILT EFFECT
// ==========================================
const grid = document.getElementById('projectsGrid');
projects.forEach((p, index) => {
  const card = document.createElement('div');
  card.className = 'folder-wrapper';

  card.innerHTML = `
    <div class="folder-tilt">
      <div class="folder-tab"></div>
      <div class="folder-body" onclick="openModal(${index})">
        <div class="folder-header-row">
            <span class="folder-id">/PROJECT_0${index + 1}</span>
            <span class="folder-id">${p.year}</span>
        </div>
        <div class="folder-content-main">
          <h3 class="folder-title">${p.title}</h3>
          <p class="folder-preview-text">${p.shortDesc}</p>
        </div>
        <div class="folder-action"><span>${p.folderAction}</span> ↗</div>
      </div>
      <div class="glow-overlay"></div>
    </div>
  `;
  grid.appendChild(card);

// --- EFFETTO 3D TILT E GLOW TRACKING (OTTIMIZZATO SAFARI) ---
  let isTicking = false; // Flag per il requestAnimationFrame

  card.addEventListener('mousemove', (e) => {
    // Se il frame precedente non è ancora stato disegnato, ignora il movimento
    if (!isTicking) {
      window.requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        const tiltElement = card.querySelector('.folder-tilt');

        tiltElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        tiltElement.style.setProperty('--mouse-x', `${x}px`);
        tiltElement.style.setProperty('--mouse-y', `${y}px`);

        isTicking = false; // Sblocca il frame successivo
      });
      isTicking = true; // Blocca calcoli extra finché non viene renderizzato il frame
    }
  });

  card.addEventListener('mouseleave', () => {
    const tiltElement = card.querySelector('.folder-tilt');
    // Resetta fluidamente la card quando il mouse esce
    tiltElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// ==========================================
// MODAL & CAROUSEL LOGIC
// ==========================================
const modal = document.getElementById('projectModal');
const closeModalBtn = document.getElementById('closeModal');
const mTitle = document.getElementById('m-title');
const mDesc = document.getElementById('m-desc');
const mTech = document.getElementById('m-tech');
const mLinkContainer = document.getElementById('m-link-container');
const mCarousel = document.getElementById('m-carousel');
const mDots = document.getElementById('m-dots');
const carouselOverlay = document.getElementById('m-carousel-overlay');
const carouselCaption = document.getElementById('m-carousel-caption');

const btnPrev = document.getElementById('c-prev');
const btnNext = document.getElementById('c-next');
const scrollHint = document.getElementById('m-scroll-hint');

let currentSlideIndex = -1;
let currentProjectImages = [];

window.openModal = function(index) {
  const p = projects[index];
  mTitle.textContent = p.title;
  mDesc.innerHTML = p.fullDesc;
  mTech.innerHTML = p.tech.map(t => `<span class="modal-badge">${t}</span>`).join('');

  mLinkContainer.innerHTML = '';
  if (p.link && p.link !== '#') { mLinkContainer.innerHTML += `<a href="${p.link}" target="_blank" class="modal-link-btn">${p.visitBtn}</a>`; }
  if (p.githubFront && p.githubFront !== '#') { mLinkContainer.innerHTML += `<a href="${p.githubFront}" target="_blank" class="modal-link-btn-outline">${p.githubFrontBtn}</a>`; }
  if (p.githubBack && p.githubBack !== '#') { mLinkContainer.innerHTML += `<a href="${p.githubBack}" target="_blank" class="modal-link-btn-outline">${p.githubBackBtn}</a>`; }
  if (p.github && p.github !== '#') { mLinkContainer.innerHTML += `<a href="${p.github}" target="_blank" class="modal-link-btn-outline">${p.githubBtn}</a>`; }

  mCarousel.innerHTML = '';
  mDots.innerHTML = '';
  scrollHint.classList.remove('active');

  currentProjectImages = p.gallery && p.gallery.length > 0 ? p.gallery : [{src: 'img/placeholder_project.jpg', title: isEnglish ? 'Preview' : 'Anteprima'}];

  currentProjectImages.forEach((imgObj, i) => {
    const imgSrc = typeof imgObj === 'string' ? imgObj : imgObj.src;
    const imgTitle = typeof imgObj === 'string' ? (isEnglish ? 'Project Detail' : 'Dettaglio Progetto') : imgObj.title;

    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    const img = document.createElement('img');
    img.src = imgSrc;
    img.className = 'carousel-img';
    img.alt = imgTitle;

    img.onload = () => {
      if (i === currentSlideIndex) {
        checkScrollability(slide);
      }
    };

    slide.onscroll = () => {
      if (slide.scrollTop > 10) scrollHint.classList.remove('active');
    };

    slide.appendChild(img);
    mCarousel.appendChild(slide);

    const dot = document.createElement('div');
    dot.className = i === 0 ? 'carousel-dot active' : 'carousel-dot';
    dot.onclick = () => { mCarousel.scrollTo({ left: mCarousel.offsetWidth * i, behavior: 'smooth' }); };
    mDots.appendChild(dot);
  });

  mCarousel.scrollLeft = 0;
  currentSlideIndex = 0;
  triggerCaptionFlash(0);
  updateArrows(0);

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

function checkScrollability(slideElement) {
  if (slideElement && slideElement.scrollHeight > slideElement.clientHeight + 10 && slideElement.scrollTop === 0) {
    scrollHint.classList.add('active');
  } else {
    scrollHint.classList.remove('active');
  }
}

function updateArrows(idx) {
  if (idx <= 0) btnPrev.classList.add('disabled'); else btnPrev.classList.remove('disabled');
  if (idx >= currentProjectImages.length - 1) btnNext.classList.add('disabled'); else btnNext.classList.remove('disabled');
}

btnPrev.onclick = () => {
  if (currentSlideIndex > 0) mCarousel.scrollTo({ left: mCarousel.offsetWidth * (currentSlideIndex - 1), behavior: 'smooth' });
};
btnNext.onclick = () => {
  if (currentSlideIndex < currentProjectImages.length - 1) mCarousel.scrollTo({ left: mCarousel.offsetWidth * (currentSlideIndex + 1), behavior: 'smooth' });
};

function triggerCaptionFlash(idx) {
  if (!currentProjectImages[idx]) return;
  const title = typeof currentProjectImages[idx] === 'string' ? (isEnglish ? 'Project Detail' : 'Dettaglio Progetto') : currentProjectImages[idx].title;
  carouselCaption.textContent = title;

  carouselOverlay.classList.remove('flash');
  void carouselOverlay.offsetWidth;
  carouselOverlay.classList.add('flash');
}

mCarousel.onscroll = () => {
  const idx = Math.round(mCarousel.scrollLeft / mCarousel.offsetWidth);
  if (idx !== currentSlideIndex) {
    currentSlideIndex = idx;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => { d.classList.toggle('active', i === idx); });
    triggerCaptionFlash(idx);
    updateArrows(idx);
    checkScrollability(mCarousel.children[idx]);
  }
};

closeModalBtn.onclick = () => { modal.classList.remove('active'); document.body.style.overflow = 'auto'; carouselOverlay.classList.remove('flash'); };
modal.onclick = (e) => { if(e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = 'auto'; carouselOverlay.classList.remove('flash'); }};

// ==========================================
// MOBILE MENU HAMBURGER & ANIMATION
// ==========================================
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;
let menuAnimVersion = 0;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    menuAnimVersion++;
    animateMenuLinks(menuAnimVersion);
  } else {
    resetMenuLinks();
  }
});

function resetMenuLinks() {
  menuAnimVersion++;
  mobileLinks.forEach(link => {
    if (!link.classList.contains('active-page')) {
      link.querySelector('.text-content').textContent = '';
      link.querySelector('.menu-cursor').classList.remove('typing');
    }
  });
}

async function animateMenuLinks(versionId) {
  mobileLinks.forEach(link => {
    if (!link.classList.contains('active-page')) {
      link.querySelector('.text-content').textContent = '';
    }
  });

  for (let link of mobileLinks) {
    if (versionId !== menuAnimVersion) return;
    if (link.classList.contains('active-page')) continue;

    const text = link.getAttribute('data-text');
    const textSpan = link.querySelector('.text-content');
    const cursorSpan = link.querySelector('.menu-cursor');

    cursorSpan.classList.add('typing');

    for (let i = 0; i < text.length; i++) {
      if (versionId !== menuAnimVersion) return;
      textSpan.textContent += text.charAt(i);
      await new Promise(r => setTimeout(r, 50));
    }

    if (versionId !== menuAnimVersion) return;
    cursorSpan.classList.remove('typing');
    await new Promise(r => setTimeout(r, 200));
  }
}

// ==========================================
// HACKER DECRYPTION EFFECT
// ==========================================
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function hackEffect(element) {
  let iterations = 0;
  const originalText = element.dataset.value;
  const interval = setInterval(() => {
    element.innerText = originalText.split("").map((letter, index) => {
      if (index < iterations) return originalText[index];
      return letters[Math.floor(Math.random() * 26)];
    }).join("");
    if (iterations >= originalText.length) clearInterval(interval);
    iterations += 1 / 2;
  }, 40);
}

document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById('title-header');
  const subtitle = document.getElementById('subtitle-header');
  hackEffect(title);
  setTimeout(() => { hackEffect(subtitle); }, 500);
});

// ==========================================
// GOOGLE ANALYTICS 4 (GDPR COMPLIANT)
// ==========================================
const GA_MEASUREMENT_ID = 'G-ZZD5X5BL7Y';

function loadGoogleAnalytics() {
  if (document.getElementById('ga-script')) return;

  const script1 = document.createElement('script');
  script1.id = 'ga-script';
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { 'anonymize_ip': true });
  `;
  document.head.appendChild(script2);
}

// ==========================================
// COOKIE BANNER MANAGEMENT
// ==========================================
function handleCookies(choice) {
  localStorage.setItem('cookieConsent', choice);
  document.getElementById('cookie-overlay').style.display = 'none';
  document.body.style.overflow = 'auto';

  if (choice === 'accept') {
    loadGoogleAnalytics();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const consent = localStorage.getItem('cookieConsent');
  const overlay = document.getElementById('cookie-overlay');

  if (!consent) {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else if (consent === 'accept') {
    loadGoogleAnalytics();
  }
});
