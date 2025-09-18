// This ensures all code runs after the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // --- Particle Canvas Background ---
    const canvas = document.getElementById("particles");
    // Check if the canvas element exists before trying to manipulate it.
    if (canvas) {
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        });

        class Particle {
            constructor(x, y, dx, dy, size) {
                this.x = x;
                this.y = y;
                this.dx = dx;
                this.dy = dy;
                this.size = size;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = "#00ffcc"; // particle color
                ctx.fill();
            }

            update() {
                this.x += this.dx;
                this.y += this.dy;

                // Bounce off walls
                if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

                // Mouse interaction logic
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    this.x -= dx / 10;
                    this.y -= dy / 10;
                }

                this.draw();
            }
        }

        function init() {
            particles = [];
            for (let i = 0; i < 120; i++) {
                let size = 2;
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let dx = (Math.random() - 0.5) * 2;
                let dy = (Math.random() - 0.5) * 2;
                particles.push(new Particle(x, y, dx, dy, size));
            }
        }

        function connect() {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = dx * dx + dy * dy;

                    // Draw lines for particles within a certain distance
                    if (distance < 15000) {
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(0, 255, 204, 0.3)"; // line color
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => p.update());
            connect();
            requestAnimationFrame(animate);
        }

        init();
        animate();

        // Handle window resize event
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }

    // --- Navbar Toggle ---
    const toggleBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');

    if (toggleBtn && nav) {
        toggleBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle the icon text between '☰' and '❌'
            toggleBtn.textContent = nav.classList.contains('active') ? '❌' : '☰';
        });

        // Close nav on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggleBtn.textContent = '☰'; // Reset the icon to '☰'
            });
        });
    }

    // --- Dynamic Hero Text Typing ---
    const roles = ["Web Developer", "Competitive Coder", "Software Developer"];
    let roleIndex = 0;
    const dynamicRoleElement = document.getElementById('dynamic-role');

    if (dynamicRoleElement) {
        function typeWriterEffect() {
            const currentRole = roles[roleIndex];
            let i = 0;
            dynamicRoleElement.textContent = ''; // Clear text before typing
            
            const typing = setInterval(() => {
                if (i < currentRole.length) {
                    dynamicRoleElement.textContent += currentRole.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                    setTimeout(deleteText, 2000);
                }
            }, 100);
        }

        function deleteText() {
            const currentRole = roles[roleIndex];
            let i = currentRole.length;
            const deleting = setInterval(() => {
                if (i > 0) {
                    dynamicRoleElement.textContent = currentRole.substring(0, i - 1);
                    i--;
                } else {
                    clearInterval(deleting);
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(typeWriterEffect, 500);
                }
            }, 50);
        }

        setTimeout(typeWriterEffect, 500);
    }
    
    // --- Consolidated Scroll Reveal Observer ---
    const allRevealElements = document.querySelectorAll('.reveal-item, .section-title, .skills-grid .skill-card, .experience-row, .timeline-item, .about-section');
    if (allRevealElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Use 'revealed' class for a consistent animation across all sections
                    entry.target.classList.add('revealed'); 
                    // For experience section, also add 'show' for compatibility
                    if (entry.target.classList.contains('experience-row')) {
                        entry.target.classList.add('show');
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        allRevealElements.forEach(el => observer.observe(el));
    }

    // --- Active Nav Link Highlight ---
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- AOS Init ---
    // Ensure AOS is properly loaded before trying to initialize.
    if (typeof AOS !== "undefined") {
        AOS.init({ duration: 1200, once: true });
    }

    // --- Skills Progress Animation ---
    const progressBars = document.querySelectorAll('.progress-fill');
    if (progressBars.length > 0) {
        const skillObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const targetPercent = parseInt(fill.getAttribute('data-fill'));
                    fill.style.width = targetPercent + "%";

                    const percentSpan = fill.closest('.progress-container').querySelector('.percent');
                    let current = 0;
                    const update = setInterval(() => {
                        if (current >= targetPercent) {
                            clearInterval(update);
                        } else {
                            current++;
                            percentSpan.textContent = current + "%";
                        }
                    }, 25);

                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressBars.forEach(bar => skillObserver.observe(bar));
    }
    
    // --- Contact Form Submission ---
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;
            console.log("Form Submitted:", { name, email, message });
            alert("Thanks, " + name + "! Your message has been received.");
            contactForm.reset();
        });
    }

    // --- Modal for Certificates on Education Page ---
    const modal = document.getElementById("certificate-modal");
    const modalImg = document.getElementById("modal-certificate");
    const closeBtn = document.querySelector(".close-btn-modal");
    const achievementChips = document.querySelectorAll(".achievement-chip");

    if (modal && modalImg && closeBtn && achievementChips.length > 0) {
        // Open modal on chip click
        achievementChips.forEach(chip => {
            chip.addEventListener("click", () => {
                const certificatePath = chip.getAttribute("data-certificate");
                if (certificatePath) {
                    modalImg.src = certificatePath;
                    modal.style.display = "block";
                }
            });
        });

        // Close modal when close button is clicked
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Close modal when user clicks outside of the modal content
        window.addEventListener("click", e => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});