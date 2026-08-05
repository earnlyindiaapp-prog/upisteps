const slider = document.getElementById('carouselTrack');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.parentElement.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
});

slider.addEventListener('mouseup', () => {
    isDown = false;
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.parentElement.scrollLeft = scrollLeft - walk;
});

// Touch support for mobile phones/tablets
slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.parentElement.scrollLeft;
});

slider.addEventListener('touchend', () => {
    isDown = false;
});

slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.parentElement.scrollLeft = scrollLeft - walk;
});

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    
    questionBtn.addEventListener('click', () => {
        // Close other open accordions
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current accordion
        item.classList.toggle('active');
    });
});
