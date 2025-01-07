import '../css/style.css'

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
}) 