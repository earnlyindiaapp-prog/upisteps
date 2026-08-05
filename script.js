// Interactive Script for Button Clicks and Menu Actions
document.addEventListener('DOMContentLoaded', () => {
    
    // Start Project button interaction
    const startProjectBtn = document.getElementById('start-project-btn');
    if (startProjectBtn) {
        startProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Start Project clicked!");
            alert("Redirecting to Project Setup page...");
        });
    }

    // Explore Solution button interaction
    const exploreSolutionBtn = document.getElementById('explore-solution-btn');
    if (exploreSolutionBtn) {
        exploreSolutionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Explore Solutions clicked!");
            alert("Loading AI Solutions overview...");
        });
    }

    // Navbar Navigation handling (Ready for multi-page linking)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all
            navLinks.forEach(item => item.classList.remove('active'));
            // Add to clicked one
            this.classList.add('active');
        });
    });

});

// About Section Learn More interaction
const learnMoreBtn = document.querySelector('.btn-learn');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("More details about AI.Now will be displayed here!");
    });
}

// Contact Form Submission Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent successfully.");
        contactForm.reset();
    });
}
