/**
 * PSİKOLOG ŞEYMA MERİÇ ABUL - MODERN JAVASCRIPT
 * Erişilebilir, Bağımlılıksız (Vanilla ES6), Hızlı ve Güvenilir
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFaqAccordion();
  initForms();
  initHeaderScroll();
});

/**
 * 1. Mobil Navigasyon ve Menü Çekmecesi
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

  // Esc tuşu ile kapatma
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

      // Opsiyonel: Diğerlerini kapatıp sadece tıklananı açmak isterseniz
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
 * 3. Form Doğrulama, Durum Yönetimi & Çift Gönderim Koruması
 */
function initForms() {
  const forms = document.querySelectorAll('.validated-form');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Form elemanları
      const nameInput = form.querySelector('[name="name"]');
      const phoneInput = form.querySelector('[name="phone"]');
      const serviceSelect = form.querySelector('[name="service"]');
      const messageInput = form.querySelector('[name="message"]');
      const kvkkConsent = form.querySelector('[name="kvkk"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const alertSuccess = form.querySelector('.alert-success');
      const alertError = form.querySelector('.alert-error');

      // Önceden gelen hata durumlarını temizle
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

      // Telefon Kontrolü (Türkiye formatı: 05xx veya 5xx)
      if (phoneInput) {
        const phoneVal = phoneInput.value.replace(/\s+/g, '').replace(/-/g, '');
        const phoneRegex = /^(05|5)[0-9]{9}$/;
        if (!phoneRegex.test(phoneVal)) {
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
        showError(kvkkConsent, 'Randevu oluşturabilmek için KVKK Aydınlatma Metnini onaylamanız gerekmektedir.');
        isValid = false;
      }

      if (!isValid) {
        if (alertError) {
          alertError.textContent = 'Lütfen formdaki işaretli alanları kontrol ediniz.';
          alertError.style.display = 'flex';
        }
        return;
      }

      // Başarılı doğrulama: Gönderim durumunu yönet (Loading State)
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Gönder';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width:18px; height:18px; margin-right:8px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10"></path>
          </svg>
          Randevu Talebi İletiliyor...
        `;
      }

      // Simüle edilen işlem süresi (Güvenli asenkron akış)
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        // Başarılı Ekranı Göster
        if (alertSuccess) {
          const clientName = nameInput ? nameInput.value.trim() : 'Danışan';
          const selectedService = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex]?.text : '';
          
          alertSuccess.innerHTML = `
            <div>
              <strong>Teşekkürler, ${escapeHTML(clientName)}!</strong>
              <p style="margin:0.25rem 0 0 0; font-size: 0.875rem;">
                Randevu talebiniz başarıyla alındı. Klinik asistanımız en kısa sürede randevu takvimini netleştirmek üzere sizinle iletişime geçecektir.
              </p>
              <div style="margin-top:0.75rem;">
                <a href="https://wa.me/905539350317?text=${encodeURIComponent(`Merhaba Psikolog Şeyma Meriç Hanım, web sitenizden randevu talebi oluşturdum. İsmim: ${clientName}. Terapi alanı: ${selectedService}`)}" 
                   target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
                  WhatsApp Üzerinden Hızlıca Teyit Edin
                </a>
              </div>
            </div>
          `;
          alertSuccess.style.display = 'block';
        }

        form.reset();
      }, 700);
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
 * 4. Header Scroll Shadow Efekti
 */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
    }
  }, { passive: true });
}
