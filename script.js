// Interactive Mouse Parallax for UPISTEPS Hero
document.addEventListener('mousemove', (e) => {
    const visualContainer = document.querySelector('.hero-visual');
    if (!visualContainer) return;

    const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.015;

    // Apply smooth tracking to the 3D core object
    const core = document.querySelector('.tech-3d-object');
    if (core) {
        core.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    threshold: 0.1
};

const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.metric-block, .intel-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    blockObserver.observe(el);
});

// Premium Card Tilt Interaction for CTA Section
const glassCard = document.querySelector('.glass-action-card');
if (glassCard) {
    glassCard.addEventListener('mousemove', (e) => {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        
        // Tilt degree limitation
        const tiltX = (y / (rect.height / 2)) * -4;
        const tiltY = (x / (rect.width / 2)) * 4;
        
        glassCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    glassCard.addEventListener('mouseleave', () => {
        glassCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// Premium Smooth FAQ Accordion Logic
document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const parent = trigger.parentElement;
        const panel = trigger.nextElementSibling;
        const isActive = parent.classList.contains('faq-active');

        // Close all other panels first for unified feel
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('faq-active');
            item.querySelector('.faq-panel').style.maxHeight = null;
        });

        // Toggle active current block panel
        if (!isActive) {
            parent.classList.add('faq-active');
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// Premium Analytics Dashboard Graph Trigger Animation
const dashboardSection = document.querySelector('.upisteps-dashboard-console');

if (dashboardSection) {
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to launch the CSS animation trigger transitions
                dashboardSection.classList.add('loaded-animate');
            }
        });
    }, { threshold: 0.2 });

    chartObserver.observe(dashboardSection);
}

// High Performance Drag to Scroll Logic for UPISTEPS Features Matrix
const slider = document.getElementById('upisteps-drag-container');
if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll Sensitivity Speed Modifier
        slider.scrollLeft = scrollLeft - walk;
    });
}

// High-End Interactive Telemetry Upload Simulator Logic
const uploadTrigger = document.getElementById('trigger-upload-node');
const statusText = document.getElementById('upload-status-text');
const progressContainer = document.getElementById('progress-bar-container');
const trackFill = document.getElementById('real-track-fill');
const percentCount = document.getElementById('upload-percent-count');
const successBadge = document.getElementById('success-badge-node');
const workflowSection = document.querySelector('.upisteps-workflow');

if (uploadTrigger) {
    uploadTrigger.addEventListener('click', () => {
        // Prevent re-trigger loops if already completed
        if (trackFill.style.width === '100%') return;

        statusText.style.display = 'none';
        progressContainer.style.display = 'block';

        let progressValue = 0;
        const uploadInterval = setInterval(() => {
            progressValue += 4; // Loader speed progression increment counters
            
            if (progressValue <= 100) {
                trackFill.style.width = `${progressValue}%`;
                percentCount.innerText = `${progressValue}%`;
            } else {
                clearInterval(uploadInterval);
                // Trigger success visual indicators states
                percentCount.style.display = 'none';
                successBadge.style.display = 'flex';
                
                // Add pipeline class framework modifier to slide up step 2 charts logs rows
                if(workflowSection) {
                    workflowSection.classList.add('reveal-results');
                }
            }
        }, 60); // Total animation runtime configuration interval parameters
    });
}

// Premium Extended FAQ Array Matrix Toggle Logic
document.querySelectorAll('.faq-matrix-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const parent = trigger.parentElement;
        const panel = trigger.nextElementSibling;
        const isActive = parent.classList.contains('matrix-active');

        document.querySelectorAll('.faq-node-row').forEach(item => {
            item.classList.remove('matrix-active');
            item.querySelector('.faq-matrix-panel').style.maxHeight = null;
        });

        if (!isActive) {
            parent.classList.add('matrix-active');
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// High-End Interactive Form Subscription Logic Control
const newsForm = document.getElementById('newsletter-form-node');
const emailField = document.getElementById('subscriber-email-input');
const feedbackAlert = document.getElementById('form-feedback-msg');

if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Lock form reloading crash states

        const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const inputString = emailField.value.trim();

        // Clear previous state alarms loops
        feedbackAlert.className = "console-feedback-alert";
        feedbackAlert.innerText = "";

        if (inputString === "") {
            feedbackAlert.classList.add('feedback-error');
            feedbackAlert.innerText = ">> ERR: System input channel empty. Please specify a valid email address.";
        } else if (!mailRegex.test(inputString)) {
            feedbackAlert.classList.add('feedback-error');
            feedbackAlert.innerText = ">> ERR: Invalid string format. Vector matching failed.";
        } else {
            feedbackAlert.classList.add('feedback-success');
            feedbackAlert.innerText = ">> SUCCESS: Connection established. Neural subscription encrypted and saved.";
            emailField.value = ""; // Flush input slot logs data
        }
    });
}

