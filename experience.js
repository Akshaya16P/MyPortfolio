document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });

    // --- Modal functionality ---
    const modal = document.getElementById('certificate-modal');
    const modalCertificate = document.getElementById('modal-certificate');

    window.showCertificate = function(imageName) {
      if (modal && modalCertificate) {
          modal.style.display = "block";
          modalCertificate.src = `./images/${imageName}`;
      }
    }

    window.closeCertificate = function() {
      if (modal) {
          modal.style.display = "none";
      }
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        closeCertificate();
      }
    }
    
    // --- Footer Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});