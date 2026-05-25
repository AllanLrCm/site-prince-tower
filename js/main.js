document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Header Scroll Effect
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Hero Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    const updateSlides = () => {
      slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
        slide.onclick = null;
      });

      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      const nextIndex = (currentSlide + 1) % slides.length;

      slides[currentSlide].classList.add('active');
      
      slides[prevIndex].classList.add('prev');
      slides[prevIndex].onclick = () => {
        prevSlide();
        resetSlideShow();
      };

      slides[nextIndex].classList.add('next');
      slides[nextIndex].onclick = () => {
        nextSlide();
        resetSlideShow();
      };

      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
    };

    const goToSlide = (n) => {
      currentSlide = (n + slides.length) % slides.length;
      updateSlides();
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 10000);
    };

    const resetSlideShow = () => {
      clearInterval(slideInterval);
      startSlideShow();
    };

    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
        resetSlideShow();
      });
    });

    updateSlides();
    startSlideShow();
  }

  // Modals
  const modalTriggers = document.querySelectorAll('.open-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close, .close-modal-btn');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  // Data for modals to avoid repetitive HTML
  const modalData = {
    comercial: {
      title: 'Comercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      text: 'Salas comerciais modernas e funcionais para impulsionar seu negócio no Prince Tower.',
      benefits: [
        'Salas para locação',
        'Ambiente profissional',
        'Localização estratégica',
        'Estrutura moderna'
      ],
      link: 'comercial.html'
    },
    residencial: {
      title: 'Residencial',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1e52db0622?auto=format&fit=crop&w=800&q=80',
      text: 'Apartamentos de 35m² com conforto, praticidade e excelente localização.',
      benefits: [
        'Apartamentos de 35m²',
        'Espaços funcionais',
        'Conforto para o dia a dia',
        'Praticidade urbana'
      ],
      link: 'residencial.html'
    },
    eventos: {
      title: 'Eventos',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
      text: 'Espaços versáteis e elegantes para eventos corporativos e sociais.',
      benefits: [
        'Ambientes versáteis',
        'Estrutura elegante',
        'Ideal para eventos',
        'Suporte no local'
      ],
      link: 'eventos.html'
    },
    golf: {
      title: 'Golf',
      image: 'https://images.unsplash.com/photo-1535136104956-613d5cf599fd?auto=format&fit=crop&w=800&q=80',
      text: 'Drive Range de 100 jardas com 50 baias automatizadas para aprimorar seu jogo.',
      benefits: [
        'Drive Range de 100 jardas',
        '50 baias automatizadas',
        'Ambiente iluminado',
        'Equipe treinada'
      ],
      link: 'golf.html'
    }
  };

  const populateModal = (type) => {
    const data = modalData[type];
    if (!data) return;
    
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-img').src = data.image;
    document.getElementById('modal-text').textContent = data.text;
    
    const benefitsList = document.getElementById('modal-benefits');
    benefitsList.innerHTML = '';
    data.benefits.forEach(benefit => {
      const li = document.createElement('li');
      li.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${benefit}`;
      benefitsList.appendChild(li);
    });
    
    document.getElementById('modal-link').href = data.link;
  };

  const openModal = (e) => {
    // If it's a card click, prevent default if it has an href
    e.preventDefault();
    const type = e.currentTarget.getAttribute('data-modal');
    if (type && modalOverlay) {
      populateModal(type);
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Intersection Observer for scroll animations (fade-in-up)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.fade-in-up');
  animatedElements.forEach(el => observer.observe(el));
});
