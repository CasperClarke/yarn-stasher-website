document.addEventListener('DOMContentLoaded', () => {
  // Gallery lightbox - expand photos on click
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox-img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  let lastFocused = null;

  const openLightbox = (img) => {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lastFocused?.focus?.();
  };

  if (lightbox && lightboxImg) {
    galleryItems.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        item.addEventListener('click', () => openLightbox(img));
      }
    });
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // Gallery carousel scroll buttons
  const carousel = document.querySelector('.gallery-carousel');
  const prevBtn = document.querySelector('.carousel-scroll-btn.prev');
  const nextBtn = document.querySelector('.carousel-scroll-btn.next');

  if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 220;
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinkItems = navLinks?.querySelectorAll('a') ?? [];

  if (menuToggle && navLinks) {
    menuToggle.setAttribute('aria-expanded', 'false');

    const closeMenu = () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinkItems.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  document.querySelectorAll('.guide-howto').forEach((howto) => {
    const pins = [...howto.querySelectorAll('.guide-pin[data-mark]')];
    const steps = [...howto.querySelectorAll('.guide-legend > li')];
    if (!pins.length || !steps.length) return;

    steps.forEach((step, i) => {
      if (!step.dataset.mark) step.dataset.mark = String(i + 1);
    });

    let sticky = null;

    const setActive = (mark) => {
      pins.forEach((pin) => pin.classList.toggle('is-active', pin.dataset.mark === mark));
      steps.forEach((step) => step.classList.toggle('is-active', step.dataset.mark === mark));
    };

    const restore = () => {
      if (sticky) {
        setActive(sticky);
      } else {
        pins.forEach((pin) => pin.classList.remove('is-active'));
        steps.forEach((step) => step.classList.remove('is-active'));
      }
    };

    pins.forEach((pin) => {
      pin.addEventListener('mouseenter', () => setActive(pin.dataset.mark));
      pin.addEventListener('focus', () => setActive(pin.dataset.mark));
      pin.addEventListener('mouseleave', restore);
      pin.addEventListener('blur', restore);
      pin.addEventListener('click', () => {
        sticky = pin.dataset.mark;
        setActive(sticky);
        const step = steps.find((item) => item.dataset.mark === sticky);
        step?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      pin.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          pin.click();
        }
      });
    });

    steps.forEach((step) => {
      step.addEventListener('mouseenter', () => setActive(step.dataset.mark));
      step.addEventListener('mouseleave', restore);
      step.addEventListener('click', () => {
        sticky = step.dataset.mark;
        setActive(sticky);
      });
    });
  });
});