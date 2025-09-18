document.addEventListener('DOMContentLoaded', () => {
    // Array of certification objects with more detailed information
    const certifications = [
        {
            title: "AWS Certified Cloud Practitioner",
            provider: "Amazon Web Services (AWS)",
            date: "2024-03-15",
            url: "#",
            tags: ["cloud", "aws", "foundational"]
        },
        {
            title: "Microsoft Certified: Azure Administrator Associate",
            provider: "Microsoft",
            date: "2023-11-20",
            url: "#",
            tags: ["cloud", "azure", "administrator"]
        },
        {
            title: "CompTIA Security+",
            provider: "CompTIA",
            date: "2023-08-01",
            url: "#",
            tags: ["security", "comptia"]
        },
        {
            title: "Google Analytics Individual Qualification (GAIQ)",
            provider: "Google",
            date: "2024-01-10",
            url: "#",
            tags: ["data", "google", "marketing"]
        },
        {
            title: "Certified Kubernetes Administrator (CKA)",
            provider: "Linux Foundation",
            date: "2024-05-01",
            url: "#",
            tags: ["devops", "kubernetes", "containers"]
        },
        {
            title: "Professional Scrum Master I (PSM I)",
            provider: "Scrum.org",
            date: "2023-09-05",
            url: "#",
            tags: ["agile", "scrum", "project management"]
        }
    ];

    const certificationsGrid = document.getElementById('certifications-grid');
    const searchInput = document.getElementById('searchInput');

    /**
     * Creates and returns a DOM element for a single certification card.
     * @param {object} cert - The certification object.
     * @returns {HTMLElement} The card element.
     */
    const createCard = (cert) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h2>${cert.title}</h2>
            <p><strong>Provider:</strong> ${cert.provider}</p>
            <p><strong>Date:</strong> ${cert.date}</p>
            <a href="${cert.url}" target="_blank" rel="noopener noreferrer">View Certificate</a>
        `;
        return card;
    };

    /**
     * Displays a given array of certifications on the page.
     * @param {array} certs - The array of certification objects to display.
     */
    const displayCertifications = (certs) => {
        certificationsGrid.innerHTML = '';
        if (certs.length === 0) {
            certificationsGrid.innerHTML = '<p class="no-results">No certifications found. Try a different search.</p>';
        } else {
            certs.forEach(cert => {
                certificationsGrid.appendChild(createCard(cert));
            });
        }
    };

    // Initial display of all certifications
    displayCertifications(certifications);

    // Event listener for the search input to filter cards
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCerts = certifications.filter(cert => {
            return cert.title.toLowerCase().includes(searchTerm) ||
                   cert.provider.toLowerCase().includes(searchTerm) ||
                   cert.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        });
        displayCertifications(filteredCerts);
    });
});