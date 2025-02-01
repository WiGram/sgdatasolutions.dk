// Basic test to ensure JavaScript is running
console.log('JavaScript file loaded');

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Get all sections
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.nav-link')
    
    // Handle navbar background on scroll
    const navbar = document.querySelector('.navbar')
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled')
        } else {
            navbar.classList.remove('scrolled')
        }
    })
    
    // Handle active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = ''
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id')
            }
        })
        
        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active')
            }
        })
    })
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault()
            const targetId = this.getAttribute('href')
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            })
            
            // Close mobile menu after click
            const navbarToggler = document.querySelector('.navbar-toggler')
            const navbarCollapse = document.querySelector('.navbar-collapse')
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click()
            }
        })
    })
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show button when page is scrolled
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize all dropdowns
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize Bootstrap dropdowns
        var dropdowns = document.querySelectorAll('.dropdown-toggle');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                e.preventDefault();
                var dropdownMenu = this.nextElementSibling;
                if (dropdownMenu.classList.contains('show')) {
                    dropdownMenu.classList.remove('show');
                    this.setAttribute('aria-expanded', 'false');
                } else {
                    dropdownMenu.classList.add('show');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.matches('.dropdown-toggle')) {
                var dropdowns = document.querySelectorAll('.dropdown-menu.show');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('show');
                    dropdown.previousElementSibling.setAttribute('aria-expanded', 'false');
                });
            }
        });
    });

    // Handle mobile menu expansion
    const expandButtons = document.querySelectorAll('.expand-button');
    expandButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent triggering parent link
            const submenu = this.closest('.has-megamenu').querySelector('.collapse');
            const icon = this.querySelector('.bi-chevron-right');
            
            // Toggle the submenu
            if (submenu) {
                submenu.classList.toggle('show');
                icon.style.transform = submenu.classList.contains('show') ? 'rotate(90deg)' : '';
            }
        });
    });

    // Handle menu header clicks
    const menuHeaders = document.querySelectorAll('.menu-header');
    menuHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Find and click the navbar toggler if it's visible (mobile view)
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Handle navbar toggler clicks
    const navbarToggler = document.querySelector('.navbar-toggler');
    navbarToggler.addEventListener('click', () => {
        // If opening the navbar (not closing)
        if (navbarToggler.getAttribute('aria-expanded') === 'false') {
            // Find and collapse any open submenus
            const openSubmenus = document.querySelectorAll('.submenu.collapse.show');
            openSubmenus.forEach(submenu => {
                submenu.classList.remove('show');
                // Find and update the associated trigger
                const trigger = document.querySelector(`[data-bs-target="#${submenu.id}"]`);
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });

    // TOC Intersection Observer
    document.addEventListener('DOMContentLoaded', function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    if (id) {
                        // Find all nav links
                        const links = document.querySelectorAll('.toc .nav-link');
                        
                        // Remove all active classes
                        links.forEach(link => link.classList.remove('active'));
                        
                        // Find and activate the corresponding link
                        const activeLink = document.querySelector(`.toc .nav-link[href="#${id}"]`);
                        if (activeLink) {
                            activeLink.classList.add('active');
                        }
                    }
                }
            });
        }, {
            // Adjust these values to control when sections become "active"
            rootMargin: '-20% 0px -20% 0px',
            threshold: [0, 0.25, 0.5]
        });

        // Observe all sections with IDs
        document.querySelectorAll('section[id]').forEach((section) => {
            observer.observe(section);
        });
    });

    // Add smooth parallax effect with different speeds and fade
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const backgroundSpeed = 0.3; // Background moves at 30% speed
        const textSpeed = 0.35;      // Text moves at 35% speed
        
        requestAnimationFrame(() => {
            const heroBackground = document.querySelector('#hero::before');
            const heroText = document.querySelector('#hero .text-container');
            const scrollButton = document.querySelector('.scroll-down');
            
            if (scrolled < window.innerHeight) {
                // Calculate fade based on scroll position
                const fadeStart = window.innerHeight * 0.2;
                const fadeEnd = window.innerHeight * 0.7;
                const opacity = Math.max(0, 1 - (scrolled - fadeStart) / (fadeEnd - fadeStart));
                
                if (heroBackground) {
                    heroBackground.style.transform = `translateY(${scrolled * backgroundSpeed}px)`;
                }
                if (heroText) {
                    heroText.style.transform = `translateY(${scrolled * textSpeed}px)`;
                    heroText.style.opacity = opacity;
                }
                
                // Quick fade for scroll button
                if (scrollButton) {
                    scrollButton.style.opacity = Math.max(0, 0.7 - (scrolled / 100)); // Fades out within first 70px of scroll
                }
            }
        });
    });

    // Add to your existing main.js
    document.querySelector('.scroll-down').addEventListener('click', function(e) {
        e.preventDefault();
        const heroSection = document.querySelector('#hero');
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        window.scrollTo({
            top: heroBottom,
            behavior: 'smooth'
        });
    });

    // Debug: Check if we can find fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Function to check if element is in viewport
    const checkVisibility = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Check visibility on scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Initial check for elements in view
    checkVisibility();

    // Add this to your existing scroll detection code
    const timeline = document.querySelector('.timeline');
    const timelineItems = document.querySelectorAll('.timeline__item');
    
    const triggerAnimation = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('timeline')) {
                    timelineItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100 * index);
                    });
                }
            }
        });
    };

    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(triggerAnimation, options);
    observer.observe(timeline);

    // Initialize all modals
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        // Create modal instance with options
        const modalInstance = new bootstrap.Modal(modal, {
            backdrop: true,      // Allows clicking outside to close
            keyboard: true,      // Allows ESC key to close
            focus: true         // Enables focus management
        });

        // Handle close button clicks
        const closeButton = modal.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => modalInstance.hide());
        }

        // Handle clicks outside modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modalInstance.hide();
            }
        });

        // Handle ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modalInstance.hide();
            }
        });

        // Clean up when modal is hidden
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.classList.remove('modal-open');
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop) backdrop.remove();
        });
    });
}) 