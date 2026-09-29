/**
 * PSİKOLOG ŞEYMA MERİÇ ABUL - MODERN JAVASCRIPT
 * Erişilebilir, Bağımlılıksız (Vanilla ES6), Hızlı ve Sezgisel
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initHeaderScroll();
  initMapFacade();
});

/**
 * 1. Mobil Navigasyon ve Menü Çekmecesi (Erişilebilir Focus Trap & Otomatik Kapanma)
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!toggleBtn || !drawer) return;

  function getFocusableElements() {
    return drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  }

  function openMenu() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeMenu() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  // Çekmece içi bağlantılara tıklandığında menüyü kapat
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Klavye Kontrolleri: ESC ile kapatma ve Tab ile Focus-Trap
  document.addEventListener('keydown', (e) => {
    if (!drawer.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeMenu();
      return;
    }

    if (e.key === 'Tab') {
      const focusables = getFocusableElements();
      if (!focusables.length) return;
      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });
}

/**
 * 2. Sık Sorulan Sorular (SSS) Akordeon
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-active');

      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-active');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * 3. Header Scroll Efekti (Performans Odaklı / Sıfır Kasılma)
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let isScrolled = false;
  window.addEventListener('scroll', () => {
    const shouldBeScrolled = window.scrollY > 20;
    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      header.classList.toggle('is-scrolled', isScrolled);
    }
  }, { passive: true });
}

/**
 * 4. Akıllı ve Hızlı Harita Yükleyici (Sıfır Kasılma / Map Facade)
 * Sayfa ilk yüklendiğinde ağır Google scriptlerini çalıştırmaz; 
 * Danışan doğrudan yol tarifi alabilir veya dilediğinde canlı haritayı tek tıkla yükler.
 */
function initMapFacade() {
  const wrappers = document.querySelectorAll('.map-card-wrapper');
  wrappers.forEach((wrapper) => {
    const facade = wrapper.querySelector('.map-facade');
    const container = wrapper.querySelector('.map-interactive-container');
    const loadBtn = wrapper.querySelector('.js-load-map');
    const iframe = container ? container.querySelector('iframe') : null;

    function activateLiveMap() {
      if (!container || !facade) return;
      facade.style.display = 'none';
      container.style.display = 'flex';
      if (iframe && iframe.dataset.src && !iframe.src) {
        iframe.src = iframe.dataset.src;
      }
    }

    if (loadBtn) {
      loadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        activateLiveMap();
      });
    }
  });
}
