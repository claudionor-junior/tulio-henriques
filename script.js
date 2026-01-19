document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menu Mobile Otimizado ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');
    
    let isMenuOpen = false;

    // SVG Paths
    const iconBars = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    const iconClose = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        const svg = mobileBtn.querySelector('svg');
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            svg.innerHTML = iconClose;
            mobileBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
            svg.innerHTML = iconBars;
            mobileBtn.setAttribute('aria-expanded', 'false');
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);
    
    // Ajuste: Fechar o menu ao clicar em qualquer link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md', 'bg-white/95');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.remove('shadow-md', 'bg-white/95');
            navbar.classList.add('bg-white/80');
        }
    }, { passive: true });

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Fecha outros
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    const otherButton = otherItem.querySelector('button');

                    otherItem.classList.remove('open');
                    otherButton.setAttribute('aria-expanded', 'false');
                    otherContent.style.height = '0';
                    otherIcon.classList.remove('rotate-45', 'text-brand-accent');
                    otherIcon.classList.add('text-brand-primary');
                }
            });

            if (!isOpen) {
                item.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
                content.style.height = content.scrollHeight + 'px';
                
                icon.classList.add('rotate-45', 'text-brand-accent');
                icon.classList.remove('text-brand-primary');
            } else {
                item.classList.remove('open');
                button.setAttribute('aria-expanded', 'false');
                content.style.height = '0';
                icon.classList.remove('rotate-45', 'text-brand-accent');
                icon.classList.add('text-brand-primary');
            }
        });
    });

    // --- Intersection Observer (Animações) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
});