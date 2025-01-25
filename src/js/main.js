// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
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
}) 