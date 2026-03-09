// ==========================================
// SCROLL ANIMATIONS - INTERSECTION OBSERVER
// ==========================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if(entry.target.classList.contains('timeline-section')) {
        entry.target.querySelector('.timeline').classList.add('draw-line');
      }
    }
  });
}, { threshold: 0.30 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
document.querySelectorAll('.timeline-section').forEach(el => observer.observe(el));

// ==========================================
// MODAL FORMSPREE LOGIC
// ==========================================
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModal');
const contactModal = document.getElementById('contactModal');
const cvForm = document.getElementById('cvForm');
const submitBtn = document.getElementById('submitBtn');
const modalHeader = document.getElementById('modalHeader');
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

openModalBtn.addEventListener('click', () => {
  contactModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  cvForm.style.display = 'flex';
  modalHeader.style.display = 'block';
  successMessage.style.display = 'none';
  submitBtn.textContent = document.documentElement.lang === 'en' ? 'Request CV' : 'Richiedi il CV';
  submitBtn.disabled = false;
  cvForm.reset();
});

const chiudiModale = () => {
  contactModal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

closeModalBtn.addEventListener('click', chiudiModale);
contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) chiudiModale();
});

cvForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const isEnglish = document.documentElement.lang === 'en';
  submitBtn.textContent = isEnglish ? 'Sending...' : 'Invio in corso...';
  submitBtn.disabled = true;

  const formData = new FormData(cvForm);
  const nome = formData.get('name');
  const azienda = formData.get('company');

  let messaggioGenerato = isEnglish ? `Dear Andrea,\n\nI am ${nome}` : `Gentile Andrea,\n\nSono ${nome}`;
  if (azienda && azienda.trim() !== "") {
    messaggioGenerato += isEnglish ? ` from ${azienda}` : ` di ${azienda}`;
  }
  messaggioGenerato += isEnglish
    ? `.\nI would like to receive your full curriculum.\n\nContact details provided:\nName: ${nome}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone') || 'Not specified'}`
    : `.\nVorrei ricevere il curriculum completo.\n\nContatti lasciati:\nNome: ${nome}\nEmail: ${formData.get('email')}\nTelefono: ${formData.get('phone') || 'Non specificato'}`;

  formData.append('message', messaggioGenerato);

  try {
    const response = await fetch(cvForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      cvForm.style.display = 'none';
      modalHeader.style.display = 'none';
      successText.textContent = isEnglish
        ? `Thank you ${nome}, I have received your request. I will send the CV as soon as possible!`
        : `Grazie ${nome}, ho ricevuto la tua richiesta. Ti invierò il CV il prima possibile!`;
      successMessage.style.display = 'block';
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    alert(isEnglish
      ? "An error occurred during sending. Please try again or contact me at andreadelfatto@gmail.com"
      : "Si è verificato un errore durante l'invio. Riprova o contattami a andreadelfatto@gmail.com"
    );
    submitBtn.textContent = isEnglish ? 'Request CV' : 'Richiedi il CV';
    submitBtn.disabled = false;
  }
});

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
// APPLE-STYLE SCROLL PINNING ENGINE (PRODUCTION OPTIMIZED)
// ==========================================
const pinSpacers = document.querySelectorAll('.pin-spacer');

if (pinSpacers.length > 0) {
  let ticking = false;

  function updatePinning() {
    pinSpacers.forEach(spacer => {
      const wrapper = spacer.querySelector('.timeline-wrapper');
      const track = spacer.querySelector('.timeline-track');
      if (!wrapper || !track) return;

      // Reset momentaneo per calcolare le altezze reali
      track.style.transform = 'translateY(0px)';

      const trackHeight = track.getBoundingClientRect().height;
      const wrapperHeight = wrapper.getBoundingClientRect().height;
      const scrollDistance = trackHeight - wrapperHeight + 20;

      if (scrollDistance > 0) {
        spacer.style.height = `${wrapperHeight + scrollDistance}px`;
      } else {
        spacer.style.height = 'auto';
      }

      // SALVIAMO IN CACHE I VALORI PESANTI: Evita il Layout Thrashing sullo scroll
      spacer.dataset.scrollDistance = scrollDistance;
      wrapper.dataset.stickyTop = parseInt(window.getComputedStyle(wrapper).top, 10) || 0;

      // Riapplica la posizione per non far saltare la grafica in caso di resize
      doScrollUpdate();
    });
  }

  function doScrollUpdate() {
    pinSpacers.forEach(spacer => {
      const track = spacer.querySelector('.timeline-track');
      const scrollDistance = parseFloat(spacer.dataset.scrollDistance || 0);

      if (scrollDistance <= 0) return;

      const wrapper = spacer.querySelector('.timeline-wrapper');
      const stickyTop = parseInt(wrapper.dataset.stickyTop || 0, 10);
      const spacerRect = spacer.getBoundingClientRect();

      let scrolledPast = stickyTop - spacerRect.top;

      if (scrolledPast < 0) scrolledPast = 0;
      if (scrolledPast > scrollDistance) scrolledPast = scrollDistance;

      track.style.transform = `translateY(-${scrolledPast}px)`;
    });
    ticking = false; // Permette al prossimo frame di animarsi
  }

  function onScroll() {
    // requestAnimationFrame sincronizza lo script con i 60hz/120hz del monitor
    if (!ticking) {
      window.requestAnimationFrame(doScrollUpdate);
      ticking = true;
    }
  }

  window.addEventListener('resize', updatePinning);
  window.addEventListener('scroll', onScroll, { passive: true });

  setTimeout(updatePinning, 150);
}

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
