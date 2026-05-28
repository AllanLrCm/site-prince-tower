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
      image: 'assets/img-hero/hero-carrossel-comercial.png',
      text: 'Espaços comerciais planejados para empresas que buscam praticidade, visibilidade e uma estrutura profissional no Prince Tower.',
      benefits: [
        'Salas para locação',
        'Espaços adaptáveis para diferentes negócios',
        'Localização estratégica',
        'Estrutura ideal para atendimento e serviços'
      ],
      link: 'comercial.html'
    },
    residencial: {
      title: 'Residencial',
      image: 'assets/img-hero/hero-carrossel-residencial.png',
      text: 'Apartamentos planejados para quem busca conforto, praticidade e uma experiência urbana no Prince Tower.',
      benefits: [
        'Apartamentos de 35m²',
        'Espaços inteligentes e funcionais',
        'Conforto para o dia a dia',
        'Mobilidade e praticidade urbana'
      ],
      link: 'residencial.html'
    },
    eventos: {
      title: 'Eventos',
      image: 'assets/img-hero/hero-carrossel-evento.png',
      text: 'Espaços planejados para experiências sociais e corporativas, praticidade e atmosfera premium no Prince Tower.',
      benefits: [
        'Espaços versáteis para diferentes eventos',
        'Estrutura elegante e funcional',
        'Atmosfera sofisticada e contemporânea',
        'Ideal para eventos sociais e experiências exclusivas'
      ],
      link: 'eventos.html'
    },
    golf: {
      title: 'Golf',
      image: 'assets/img-hero/hero-carrossel-golf.png',
      text: 'Drive Range de 100 jardas com 50 baias automatizadas para aprimorar seu jogo com tecnologia e conforto.',
      benefits: [
        'Drive Range de 100 jardas',
        '50 baias automatizadas',
        'Ambiente iluminado e climatizado',
        'Experiência premium para aprimorar seu desempenho'
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

    // Populate extra section for Golf tickets and Residencial Tour
    const extraSection = document.getElementById('modal-extra-section');
    if (extraSection) {
      if (type === 'golf') {
        extraSection.innerHTML = `
          <div class="golf-experience-section">
              <h4 class="golf-experience-title">EXPERIÊNCIA GOLF</h4>
              <div class="golf-experience-grid">
                  <div class="golf-experience-card">
                      <div class="golf-card-info">
                          <h5>Balde com 120 bolinhas</h5>
                          <span>01 ticket</span>
                      </div>
                      <div class="golf-card-price">
                          R$ 65,00
                      </div>
                  </div>
                  <div class="golf-experience-card">
                      <div class="golf-card-info">
                          <h5>Pacote com 20 tickets</h5>
                          <span class="highlight">Melhor custo-benefício</span>
                      </div>
                      <div class="golf-card-price">
                          R$ 1.000,00
                      </div>
                  </div>
              </div>
          </div>
        `;
      } else if (type === 'residencial') {
        extraSection.innerHTML = `
          <div class="residencial-tour-section">
              <h4 class="residencial-tour-title">TOUR RESIDENCIAL</h4>
              <a href="https://youtu.be/8GEZZsxi5VA?si=oqwt-jdyJ3TgzH4v" target="_blank" rel="noopener noreferrer" class="residencial-tour-card">
                  <div class="tour-card-left">
                      <div class="tour-play-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                      <div class="tour-card-info">
                          <h5>Conheça os ambientes do residencial Prince Tower em vídeo.</h5>
                      </div>
                  </div>
                  <div class="tour-card-cta">
                      <span>Assistir apresentação</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
              </a>
          </div>
        `;
      } else {
        extraSection.innerHTML = '';
      }
    }
    
    const mainBtn = document.getElementById('modal-link');
    mainBtn.href = data.link;
    
    const secondaryBtn = document.querySelector('.modal-actions .btn-outline');
    
    if (type === 'comercial') {
      mainBtn.textContent = 'CONHECER COMERCIAL';
      if (secondaryBtn) {
        secondaryBtn.textContent = 'FALE CONOSCO';
      }
    } else if (type === 'residencial') {
      mainBtn.textContent = 'CONHECER RESIDENCIAL';
      if (secondaryBtn) {
        secondaryBtn.textContent = 'FALE CONOSCO';
      }
    } else if (type === 'eventos') {
      mainBtn.textContent = 'CONHECER EVENTOS';
      if (secondaryBtn) {
        secondaryBtn.textContent = 'FALE CONOSCO';
      }
    } else if (type === 'golf') {
      mainBtn.textContent = 'CONHECER GOLF';
      if (secondaryBtn) {
        secondaryBtn.textContent = 'FALE CONOSCO';
      }
    } else {
      mainBtn.textContent = 'Ver página completa';
      if (secondaryBtn) {
        secondaryBtn.textContent = 'Fale conosco';
      }
    }
  };

  const openModal = (e) => {
    // If it's a card click, prevent default if it has an href
    e.preventDefault();
    const type = e.currentTarget.getAttribute('data-modal');
    if (type && modalOverlay) {
      populateModal(type);
      modalOverlay.classList.remove('modal-comercial', 'modal-residencial', 'modal-eventos', 'modal-golf');
      if (type === 'comercial') {
        modalOverlay.classList.add('modal-comercial');
      } else if (type === 'residencial') {
        modalOverlay.classList.add('modal-residencial');
      } else if (type === 'eventos') {
        modalOverlay.classList.add('modal-eventos');
      } else if (type === 'golf') {
        modalOverlay.classList.add('modal-golf');
      }
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  const closeModal = () => {
    if (modalOverlay) {
      modalOverlay.classList.remove('active', 'modal-comercial', 'modal-residencial', 'modal-eventos', 'modal-golf');
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

  // Contact Hub Toggle
  const contactHubBtn = document.getElementById('contact-hub-btn');
  const contactHubPanel = document.getElementById('contact-hub-panel');
  const contactHubLabel = document.querySelector('.contact-hub-label');

  if (contactHubBtn && contactHubPanel) {
    const togglePanel = () => {
      const isVisible = contactHubPanel.classList.contains('active');
      if (isVisible) {
        contactHubPanel.classList.remove('active');
        contactHubBtn.setAttribute('aria-expanded', 'false');
        if (contactHubLabel) contactHubLabel.style.opacity = '1';
      } else {
        contactHubPanel.classList.add('active');
        contactHubBtn.setAttribute('aria-expanded', 'true');
        if (contactHubLabel) contactHubLabel.style.opacity = '0';
      }
    };

    contactHubBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });

    document.addEventListener('click', (e) => {
      if (!contactHubPanel.contains(e.target) && e.target !== contactHubBtn && !contactHubBtn.contains(e.target)) {
        contactHubPanel.classList.remove('active');
        contactHubBtn.setAttribute('aria-expanded', 'false');
        if (contactHubLabel) contactHubLabel.style.opacity = '1';
      }
    });
  }

  // Dynamic YouTube Embed play interaction (Tour Residencial)
  const btnPlayTour = document.getElementById('btn-play-tour');
  const videoTourContainer = document.getElementById('video-tour-container');

  if (videoTourContainer && btnPlayTour) {
    const playVideo = () => {
      videoTourContainer.innerHTML = `
        <div class="video-tour-embed-wrapper">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube-nocookie.com/embed/8GEZZsxi5VA?autoplay=1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    };

    btnPlayTour.addEventListener('click', playVideo);
  }
});
