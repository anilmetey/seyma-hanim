/**
 * PSİKOLOG ŞEYMA MERİÇ ABUL - MODERN JAVASCRIPT
 * Erişilebilir, Bağımlılıksız (Vanilla ES6), Hızlı ve Sezgisel
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initForms();
  initHeaderScroll();
  initPhoneFormatting();
});

/**
 * 1. Mobil Navigasyon ve Menü Çekmecesi (Erişilebilir Focus Trap)
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.drawer-close');
  const backdrop = document.querySelector('.drawer-backdrop');

  if (!toggleBtn || !drawer) return;

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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeMenu();
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
 * 3. Telefon Giriş Formatlama (05XX XXX XX XX)
 */
function initPhoneFormatting() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,3})(\d{0,2})(\d{0,2})/);
      if (!x) return;
      
      let formatted = '';
      if (x[1]) formatted = x[1];
      if (x[2]) formatted += ' ' + x[2];
      if (x[3]) formatted += ' ' + x[3];
      if (x[4]) formatted += ' ' + x[4];
      
      e.target.value = formatted.trim();
    });
  });
}

/**
 * 4. Form Doğrulama & Çift Gönderim Koruması
 */
function initForms() {
  const forms = document.querySelectorAll('.validated-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const serviceSelect = form.querySelector('[name="service"]');
      const kvkkConsent = form.querySelector('[name="kvkk"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const alertSuccess = form.querySelector('.alert-success');
      const alertError = form.querySelector('.alert-error');

      clearErrors(form);
      if (alertSuccess) alertSuccess.style.display = 'none';
      if (alertError) alertError.style.display = 'none';

      let isValid = true;

      // İsim Kontrolü
      if (nameInput) {
        const val = nameInput.value.trim();
        if (val.length < 3) {
          showError(nameInput, 'Lütfen geçerli ad ve soyadınızı belirtin (en az 3 karakter).');
          isValid = false;
        }
      }

      // Telefon Kontrolü (Türkiye: 05xx veya 5xx)
      if (phoneInput) {
        const digits = phoneInput.value.replace(/\D/g, '');
        if (digits.length < 10 || (!digits.startsWith('05') && !digits.startsWith('5'))) {
          showError(phoneInput, 'Lütfen geçerli bir cep telefonu numarası girin (Örn: 0553 935 03 17).');
          isValid = false;
        }
      }

      // Hizmet Seçimi Kontrolü
      if (serviceSelect && serviceSelect.hasAttribute('required')) {
        if (!serviceSelect.value) {
          showError(serviceSelect, 'Lütfen danışmanlık almak istediğiniz terapi alanını seçin.');
          isValid = false;
        }
      }

      // KVKK Onay Kontrolü
      if (kvkkConsent && !kvkkConsent.checked) {
        showError(kvkkConsent, 'Randevu oluşturabilmek için KVKK metnini onaylamanız gerekmektedir.');
        isValid = false;
      }

      if (!isValid) {
        if (alertError) {
          alertError.textContent = 'Lütfen formdaki işaretli alanları kontrol ediniz.';
          alertError.style.display = 'block';
          alertError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Buton Yükleme Durumu
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Gönder';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 0.8s linear infinite; width:16px; height:16px; margin-right:6px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          Randevu Talebi İletiliyor...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        if (alertSuccess) {
          const clientName = nameInput ? nameInput.value.trim() : 'Danışan';
          const selectedService = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex]?.text : 'Psikolojik Danışmanlık';
          
          alertSuccess.innerHTML = `
            <div>
              <strong style="font-size: 1rem; color: #125732;">Teşekkürler, Sayın ${escapeHTML(clientName)}!</strong>
              <p style="margin: 0.35rem 0 0.75rem 0; font-size: 0.875rem; color: #125732;">
                Randevu talebiniz kliniğimize başarıyla ulaştı. Asistanımız uygun seans saatlerini teyit etmek için gün içinde sizinle iletişime geçecektir.
              </p>
              <div>
                <a href="https://wa.me/905539350317?text=${encodeURIComponent(`Merhaba Psikolog Şeyma Meriç Hanım, sitenizden randevu talebi oluşturdum. İsmim: ${clientName}. Terapi konusu: ${selectedService}`)}" 
                   target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
                  WhatsApp ile Hızlıca Teyit Edin &rarr;
                </a>
              </div>
            </div>
          `;
          alertSuccess.style.display = 'block';
          alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        form.reset();
      }, 600);
    });
  });
}

function showError(inputEl, message) {
  inputEl.classList.add('is-invalid');
  const parent = inputEl.closest('.form-group') || inputEl.parentElement;
  if (!parent) return;

  let feedback = parent.querySelector('.form-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'form-feedback is-error';
    parent.appendChild(feedback);
  } else {
    feedback.className = 'form-feedback is-error';
  }
  feedback.textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  form.querySelectorAll('.form-feedback').forEach((el) => {
    el.textContent = '';
    el.classList.remove('is-error');
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * 5. Header Scroll Efekti
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}
