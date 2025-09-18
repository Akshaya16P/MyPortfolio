document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Toggle Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('open');
        menuToggle.classList.toggle('open');
        document.body.classList.toggle('no-scroll'); // Optional: Prevent body scroll when menu is open
    });

    // Close nav when a link is clicked (for mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navUl.classList.contains('open')) {
                navUl.classList.remove('open');
                menuToggle.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-item, .section-title');
    
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Active Nav Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '' || currentPath === 'index.html') {
        document.querySelector('nav ul li a[href="index.html"]').classList.add('active');
    } else {
        const activeLink = document.querySelector(`nav ul li a[href="${currentPath}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
});