document.addEventListener('DOMContentLoaded', () => {
    
    // --- Menu Mobile ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');
    let isMenuOpen = false;

    const iconBars = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
    const iconClose = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        const svg = mobileBtn.querySelector('svg');
        
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', '-translate-y-4', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            svg.innerHTML = iconClose;
        } else {
            mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', '-translate-y-4', 'pointer-events-none');
            svg.innerHTML = iconBars;
        }
    }

    mobileBtn.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', () => isMenuOpen && toggleMenu()));

    // --- Navbar Scroll Logic ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-sm', 'bg-brand-bg/95');
            navbar.classList.remove('bg-brand-bg/80', 'py-4');
            navbar.classList.add('py-3');
        } else {
            navbar.classList.remove('shadow-sm', 'bg-brand-bg/95', 'py-3');
            navbar.classList.add('bg-brand-bg/80', 'py-4');
        }
    }, { passive: true });

    // --- WhatsApp Button Auto-Hide (Smart Logic) ---
    // Esconde o botão quando chega no footer para não poluir
    const whatsappBtn = document.getElementById('whatsapp-float');
    const footer = document.querySelector('footer');

    if(whatsappBtn && footer) {
        window.addEventListener('scroll', () => {
            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Se o topo do footer estiver visível na janela
            if (footerRect.top < windowHeight - 50) {
                whatsappBtn.style.opacity = '0';
                whatsappBtn.style.pointerEvents = 'none';
                whatsappBtn.style.transform = 'translateY(20px)';
            } else {
                whatsappBtn.style.opacity = '1';
                whatsappBtn.style.pointerEvents = 'auto';
                whatsappBtn.style.transform = 'translateY(0)';
            }
        }, { passive: true });
    }

    // --- FAQ Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        button.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Fecha outros itens abertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-content').style.height = '0';
                    otherItem.querySelector('.faq-icon').classList.remove('rotate-45', 'text-brand-accent');
                    otherItem.querySelector('.faq-icon').classList.add('text-brand-primary');
                }
            });

            if (!isOpen) {
                item.classList.add('open');
                content.style.height = content.scrollHeight + 'px';
                icon.classList.add('rotate-45', 'text-brand-accent');
                icon.classList.remove('text-brand-primary');
            } else {
                item.classList.remove('open');
                content.style.height = '0';
                icon.classList.remove('rotate-45', 'text-brand-accent');
                icon.classList.add('text-brand-primary');
            }
        });
    });

    // --- Reveal Animation on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
});