        /*Scroll Hover Top Page*/
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
            header.classList.add('scrolled');
    } else {
            header.classList.remove('scrolled');
    }
    }); 

        /*Efecto Suave Texto*/
const elementos = document.querySelectorAll('.itinerario h1, .misa, .dresscode h1, h1, p, .dressimage');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2
});

elementos.forEach(el => {
    observer.observe(el);
});
        /*SLIDER DE IMÁGENES*/

const slides = document.querySelectorAll('.slide');
const container = document.querySelector('.slider-container');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;   // posición inicial (primera imagen)

/* Función que mueve el slider */
function updateSlider() {
    container.style.transform = `translateX(-${index * 100}%)`;
    container.style.transition = "transform 0.5s ease";
}

/* Botón siguiente */
next.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    updateSlider();
});

/* Botón anterior */
prev.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
});

/*Swipe Left Right*/

let touchStartX = 0;
let touchStartY = 0;
let isHorizontal = false;

const viewport = document.querySelector('.slider-viewport');

viewport.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isHorizontal = false;
}, { passive: true });

viewport.addEventListener('touchmove', (e) => {

    const moveX = e.touches[0].clientX;
    const moveY = e.touches[0].clientY;

    let diffX = Math.abs(moveX - touchStartX);
    let diffY = Math.abs(moveY - touchStartY);

    // 👉 Si el gesto es MÁS horizontal que vertical:
    if (diffX > diffY) {
        isHorizontal = true;
        e.preventDefault();   // solo bloqueamos cuando es swipe lateral
    }

}, { passive: false });

viewport.addEventListener('touchend', (e) => {

    if (!isHorizontal) return; // si fue scroll vertical, no hacemos nada

    const touchEndX = e.changedTouches[0].clientX;
    let diferencia = touchStartX - touchEndX;

    if (diferencia > 30) {
        index = (index + 1) % slides.length;
        updateSlider();
    }

    if (diferencia < -30) {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    }
});