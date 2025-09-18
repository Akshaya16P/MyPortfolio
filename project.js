document.addEventListener('DOMContentLoaded', () => {

    // Navbar Toggle
    const toggleBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            // Toggles the 'open' class on the navigation menu
            nav.classList.toggle('open');
            // Toggles the 'active' class on the button for the animation
            toggleBtn.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    toggleBtn.classList.remove('active');
                }
            });
        });
    }

    // Highlight Active Link
    const allNavLinks = document.querySelectorAll('#nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    allNavLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // Footer Year
    const footerParagraph = document.querySelector('footer p');
    if (footerParagraph) {
        footerParagraph.innerHTML = `&copy; ${new Date().getFullYear()} Akshaya Pandi. All rights reserved.`;
    }

    // Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-item');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    revealElements.forEach(el => observer.observe(el));
});