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
// TYPING ANIMATION FOR SKILLS
// ==========================================
const skills = ["AI Engineer", "Software Engineer", "Full-Stack Developer", "Cybersecurity", "Cloud Computing"];
const skillElement = document.getElementById("skill-text");
const typeSpeed = 50;
const deleteSpeed = 30;
const pauseTime = 1500;
let skillIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startSkillLoop() {
  const currentSkill = skills[skillIndex];
  if (isDeleting) {
    skillElement.textContent = currentSkill.substring(0, charIndex - 1);
    charIndex--;
  } else {
    skillElement.textContent = currentSkill.substring(0, charIndex + 1);
    charIndex++;
  }
  let nextDelta = isDeleting ? deleteSpeed : typeSpeed;
  if (!isDeleting && charIndex === currentSkill.length) {
    nextDelta = pauseTime;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    skillIndex = (skillIndex + 1) % skills.length;
    nextDelta = 500;
  }
  setTimeout(startSkillLoop, nextDelta);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(startSkillLoop, 1000);
});

// ==========================================
// GOOGLE ANALYTICS 4 (GDPR COMPLIANT)
// ==========================================
const GA_MEASUREMENT_ID = 'G-ZZD5X5BL7Y';

function loadGoogleAnalytics() {
  // Evita di caricare lo script due volte
  if (document.getElementById('ga-script')) return;

  // Crea il primo tag <script async src="...">
  const script1 = document.createElement('script');
  script1.id = 'ga-script';
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Crea il secondo tag <script> con le configurazioni
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

  // Carica Analytics SOLO se l'utente ha accettato
  if (choice === 'accept') {
    loadGoogleAnalytics();
  }
}

// Controllo al caricamento della pagina
document.addEventListener("DOMContentLoaded", () => {
  const consent = localStorage.getItem('cookieConsent');
  const overlay = document.getElementById('cookie-overlay');

  if (!consent) {
    // Nessuna scelta: mostra banner e blocca pagina
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  } else if (consent === 'accept') {
    // Scelta già fatta in passato: carica Analytics silenziosamente
    loadGoogleAnalytics();
  }
});

// ==========================================
// EVENT TRACKING FOR CTA BUTTONS (GA4)
// ==========================================
const ctaEmail = document.getElementById('cta-email');
const ctaProfilo = document.getElementById('cta-profilo');

if (ctaEmail) {
  ctaEmail.addEventListener('click', () => {
    // Controlla che Analytics sia attivo
    if (typeof gtag === 'function') {
      // Rileva la lingua dalla pagina
      const isEnglish = document.documentElement.lang === 'en';
      const eventName = isEnglish ? 'click_cta_email_en' : 'click_cta_email';
      const eventLabel = isEnglish ? 'Send Email Button (Home EN)' : 'Pulsante Invia Mail (Home)';

      gtag('event', eventName, {
        'event_category': 'Engagement',
        'event_label': eventLabel
      });
    }
  });
}

if (ctaProfilo) {
  ctaProfilo.addEventListener('click', () => {
    // Controlla che Analytics sia attivo
    if (typeof gtag === 'function') {
      // Rileva la lingua dalla pagina
      const isEnglish = document.documentElement.lang === 'en';
      const eventName = isEnglish ? 'click_cta_profile_en' : 'click_cta_profilo';
      const eventLabel = isEnglish ? 'About Me Button (Home EN)' : 'Pulsante Scopri chi sono (Home)';

      gtag('event', eventName, {
        'event_category': 'Engagement',
        'event_label': eventLabel
      });
    }
  });
}
