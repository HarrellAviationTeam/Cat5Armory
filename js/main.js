/**
 * Cat-5 Armory - Main JavaScript
 * Age verification, navigation, hero slider, search, animations.
 */

// ===== AGE VERIFICATION =====
(function initAgeVerification() {
  if (!sessionStorage.getItem('ageVerified')) {
    const overlay = document.getElementById('ageOverlay');
    if (overlay) {
      overlay.style.display = 'flex';
      document.body.classList.add('no-scroll');
    }
  } else {
    const overlay = document.getElementById('ageOverlay');
    if (overlay) overlay.remove();
  }
})();

function verifyAge(isOfAge) {
  const overlay = document.getElementById('ageOverlay');
  if (isOfAge) {
    sessionStorage.setItem('ageVerified', 'true');
    if (overlay) {
      overlay.style.animation = 'fadeIn .3s ease reverse forwards';
      setTimeout(() => {
        overlay.remove();
        document.body.classList.remove('no-scroll');
      }, 300);
    }
  } else {
    alert('You must be 21 years or older to access this website.');
    window.location.href = 'https://www.google.com';
  }
}

// ===== MOBILE DRAWER =====
function openMobileDrawer() {
  document.getElementById('mobileDrawer').classList.add('open');
  document.getElementById('mobileOverlay').classList.add('active');
  document.body.classList.add('no-scroll');
}

function closeMobileDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('active');
  document.body.classList.remove('no-scroll');
}

function toggleDrawerSub(id) {
  const sub = document.getElementById(id);
  if (sub) sub.classList.toggle('open');
}

// ===== SEARCH =====
function headerSearch(e) {
  e.preventDefault();
  const q = document.getElementById('headerSearchInput')?.value.trim();
  if (q) window.location.href = 'shop.html?q=' + encodeURIComponent(q);
}

function drawerSearch(e) {
  e.preventDefault();
  const q = document.getElementById('drawerSearchInput')?.value.trim();
  if (q) {
    closeMobileDrawer();
    window.location.href = 'shop.html?q=' + encodeURIComponent(q);
  }
}

// Search suggestions (live search)
(function initSearchSuggestions() {
  const input = document.getElementById('headerSearchInput');
  const sugBox = document.getElementById('searchSuggestionsEl');
  if (!input || !sugBox || typeof API === 'undefined') return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const q = input.value.trim();
    if (q.length < 2) { sugBox.classList.remove('active'); return; }
    debounceTimer = setTimeout(async () => {
      const results = await API.searchProducts(q);
      if (results.length === 0) { sugBox.classList.remove('active'); return; }
      sugBox.innerHTML = results.slice(0, 5).map(p => `
        <a href="product.html?id=${p.id}" class="suggestion-item" onclick="sugBox.classList.remove('active')">
          <img src="${p.image || 'assets/accessories.png'}" alt="${p.name}">
          <div class="suggestion-info">
            <div class="sug-name">${p.name}</div>
            <div class="sug-price">$${(p.salePrice || p.price).toFixed(2)}</div>
          </div>
        </a>
      `).join('') + `<a href="shop.html?q=${encodeURIComponent(q)}" class="suggestion-item" style="justify-content:center;color:#c41e3a;font-weight:600;font-size:.85rem">See all results for "${q}"</a>`;
      sugBox.classList.add('active');
    }, 280);
  });

  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !sugBox.contains(e.target)) {
      sugBox.classList.remove('active');
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') sugBox.classList.remove('active');
  });
})();

// ===== HERO SLIDER =====
let heroSlideIndex = 0;
let heroAutoTimer;

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  if (!slides.length || !dotsContainer) return;

  dotsContainer.innerHTML = Array.from(slides).map((_, i) =>
    `<button class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></button>`
  ).join('');

  heroAutoTimer = setInterval(() => slideHero(1), 5500);
}

function slideHero(dir) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  slides[heroSlideIndex].classList.remove('active');
  if (dots[heroSlideIndex]) dots[heroSlideIndex].classList.remove('active');

  heroSlideIndex = (heroSlideIndex + dir + slides.length) % slides.length;

  slides[heroSlideIndex].classList.add('active');
  if (dots[heroSlideIndex]) dots[heroSlideIndex].classList.add('active');
}

function goToSlide(index) {
  clearInterval(heroAutoTimer);
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  slides[heroSlideIndex].classList.remove('active');
  if (dots[heroSlideIndex]) dots[heroSlideIndex].classList.remove('active');
  heroSlideIndex = index;
  slides[heroSlideIndex].classList.add('active');
  if (dots[heroSlideIndex]) dots[heroSlideIndex].classList.add('active');
  heroAutoTimer = setInterval(() => slideHero(1), 5500);
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
}

// ===== NEWSLETTER =====
function handleNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type=email]');
  if (input) {
    alert('Thank you! We\'ll keep you updated on new inventory and deals.\n\nNote: Please contact us directly at 239-784-5451 for immediate inquiries.');
    input.value = '';
  }
}

// ===== FILTER GROUPS (SHOP PAGE) =====
function initFilterGroups() {
  document.querySelectorAll('.filter-group-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.filter-group').classList.toggle('open');
    });
  });
  // Open first few by default
  document.querySelectorAll('.filter-group').forEach((g, i) => {
    if (i < 3) g.classList.add('open');
  });
}

// Mobile filter toggle
function toggleMobileFilter() {
  document.querySelector('.filter-sidebar')?.classList.toggle('mobile-open');
}

// ===== PRODUCT TABS =====
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(tabId)?.classList.add('active');
    });
  });
}

// ===== GALLERY =====
function initGallery() {
  document.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const main = document.querySelector('.gallery-main img');
      if (main) main.src = thumb.querySelector('img').src;
      document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initFilterGroups();
  initTabs();
  initGallery();
  // initHeroSlider is called from inline script on pages with a slider
});
