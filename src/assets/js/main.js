/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

// CSS imports as side effects only
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'aos/dist/aos.css';
import 'glightbox/dist/css/glightbox.min.css';
import 'swiper/css';

// Add a function to verify CSS loading
function verifyCSSLoading() {
  const cssChecks = [
    { name: 'bootstrap', selector: '.container' },
    { name: 'bootstrap-icons', selector: '.bi' },
    { name: 'aos', test: () => typeof AOS !== 'undefined' },
    { name: 'glightbox', test: () => typeof GLightbox !== 'undefined' },
    { name: 'swiper', test: () => typeof Swiper !== 'undefined' }
  ];

  console.log('CSS Loading Status:', {
    styleElements: Array.from(document.querySelectorAll('style, link[rel="stylesheet"]')).map(el => ({
      type: el.tagName.toLowerCase(),
      href: el.href || 'inline-styles',
      content: el.tagName === 'STYLE' ? el.textContent.slice(0, 100) + '...' : 'external'
    })),
    featureChecks: cssChecks.map(check => ({
      name: check.name,
      loaded: check.test ? check.test() : !!document.querySelector(check.selector)
    }))
  });
}

// HTML Components
let competenciesHTML, resumeHTML;
const htmlImports = Promise.all([
  import('@/components/competencies.html?raw'),
  import('@/components/resume.html?raw')
]).then(imports => {
  [competenciesHTML, resumeHTML] = imports.map(module => module.default);
  console.log('HTML imports successful:', { competenciesHTML, resumeHTML });
}).catch(error => {
  console.error('HTML Import Error:', {
    message: error.message,
    stack: error.stack,
    importMeta: error.importMeta
  });
  throw error;
});

// JavaScript library imports
let AOS, Typed, GLightbox, Isotope, imagesLoaded, Swiper, PureCounter;
const libraryImports = Promise.all([
  import('aos'),
  import('typed.js'),
  import('glightbox'),
  import('isotope-layout'),
  import('imagesloaded'),
  import('swiper'),
  import('@srexi/purecounterjs')
]).then(imports => {
  [AOS, Typed, GLightbox, Isotope, imagesLoaded, Swiper, PureCounter] = 
    imports.map(module => module.default);
  console.log('JS imports successful:', {
    AOS, Typed, GLightbox, Isotope, imagesLoaded, Swiper, PureCounter
  });
}).catch(error => {
  console.error('JS Import Error:', {
    message: error.message,
    stack: error.stack,
    importMeta: error.importMeta
  });
  throw error;
});

// Combine all imports
Promise.all([htmlImports, libraryImports])
  .then(() => {
    console.log('All imports successful, initializing app...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initApp();
        // Add load listeners only after libraries are loaded
        window.addEventListener('load', () => {
          aosInit();
          initSwiper();
        });
      });
    } else {
      initApp();
      // Add load listeners only after libraries are loaded
      window.addEventListener('load', () => {
        aosInit();
        initSwiper();
      });
      // Check if styles loaded
      window.addEventListener('load', verifyCSSLoading);
    }
  })
  .catch(error => {
    // Log which import type failed
    console.error('App initialization failed:', {
      message: error.message,
      stack: error.stack,
      importMeta: error.importMeta,
      error: error.error,
      failedAt: error.failedImport || 'unknown',
      timestamp: new Date().toISOString()
    });

    // Optionally, try to initialize anyway with degraded functionality
    try {
      console.warn('Attempting to initialize app with degraded functionality...');
      initApp();
    } catch (initError) {
      console.error('Failed to initialize app in degraded mode:', {
        message: initError.message,
        stack: initError.stack
      });
    }
  });

// Modified loadComponent function to handle direct HTML content
function loadComponent(id, content) {
  try {
    const targetElement = document.querySelector(`#${id}`);
    if (targetElement) {
      targetElement.innerHTML = content;
      
      // Log all image paths immediately after setting innerHTML
      targetElement.querySelectorAll('img').forEach(img => {
        console.log(`Image path in ${id}:`, {
          rawSrc: img.getAttribute('src'),  // The raw src attribute
          currentSrc: img.currentSrc,       // The resolved src (if any)
          baseURI: document.baseURI         // The base URI for relative paths
        });
        
        img.onerror = function(e) {
          console.error(`Image load failed in ${id}:`, {
            rawSrc: img.getAttribute('src'),
            attempted: img.src
          });
        };
      });
      
      AOS.refresh();
    } else {
      console.error(`Target element with id "${id}" not found.`);
    }
  } catch (error) {
    console.error(`Error loading ${id} section:`, error);
    const targetElement = document.querySelector(`#${id}`);
    if (targetElement) {
      targetElement.innerHTML = '<p>Error loading content</p>';
    } else {
      console.error(`Target element with id "${id}" not found.`);
    }
  }
}

// Define initScrollspy before using it
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -80% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.navmenu a.active').forEach(link => 
          link.classList.remove('active')
        );
        
        const activeId = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.navmenu a[href="#${activeId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Init swiper sliders
function initSwiper() {
  document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector(".swiper-config").innerHTML.trim()
    );

    if (swiperElement.classList.contains("swiper-tab")) {
      initSwiperWithCustomPagination(swiperElement, config);
    } else {
      new Swiper(swiperElement, config);
    }
  });
}

// Header toggle
function headerToggle() {
  document.querySelector('#header').classList.toggle('header-show');
  headerToggleBtn.classList.toggle('bi-list');
  headerToggleBtn.classList.toggle('bi-x');
}

// Toggle scroll top button
function toggleScrollTop() {
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
}

// Animation on scroll function and init
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

function initHeaderNav() {
  // Header toggle
  const headerToggleBtn = document.querySelector('.header-toggle');
  headerToggleBtn.addEventListener('click', headerToggle);
  
  //  Hide mobile nav on same-page/hash links
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });
}

function initMobileNavDropdowns() {
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });
}

function initPreloader() {
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
}

function initTypedText() {
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
}

function initScrollTop() {
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
  }
}

function initIsotopeLayoutAndFilters() {
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });
}

function initScrollToHash() {
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });
}

function initApp() {
  initHeaderNav();  
  initMobileNavDropdowns();
  initPreloader();
  initScrollTop();
  initTypedText();
  
  // Initialise libraries
  aosInit();
  new PureCounter();
  
  // Load components with HTML content directly
  loadComponent('resume', resumeHTML);
  loadComponent('competencies', competenciesHTML);
  
  // Observe sections loaded by loadComponent
  initScrollspy();
  
  // Initialise remaining features
  const glightbox = GLightbox({selector: '.glightbox'});
  initIsotopeLayoutAndFilters();
  initSwiper();
  initScrollToHash();
}