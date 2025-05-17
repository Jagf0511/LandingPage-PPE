// Simplified translation script for LandingPage-PPE
document.addEventListener("DOMContentLoaded", function () {
    const abrir = document.querySelector(".abrir");
    const cerrar = document.querySelector(".cerrar");
    const list = document.querySelector(".list-nav");
    const nav = document.querySelector(".navigation");
    const logo = document.querySelector(".logo");
    const carousel = document.querySelector(".container-one");
    const translateBtn = document.getElementById("translate-btn");

    // Variables for scrolling behavior
    const logotipoNormal = "static/Imgs/logos/logotipo_web.svg";
    const logotipoScroll = "static/Imgs/logos/iconweb.svg";

    // Set initial state - default is Spanish
    let currentLanguage = 'es';
    document.documentElement.setAttribute('lang', currentLanguage);
    translateBtn.textContent = "English";

    // Scroll behavior
    window.addEventListener("scroll", function () {
        const isScrolled = window.scrollY > 0;
        if (isScrolled) {
            nav.classList.add("active");
            carousel.classList.add("active");
            list.classList.add("active");
            logo.src = logotipoScroll;
            logo.style.height = "60px";
            logo.style.transform = "rotate(360deg)";
        } else {
            nav.classList.remove("active");
            carousel.classList.remove("active");
            list.classList.remove("active");
            logo.src = logotipoNormal;
            logo.style.height = "80px";
            logo.style.transform = "rotate(0deg)";
        }
    });

    // Mobile menu functionality
    abrir.addEventListener("click", function () {
        abrir.classList.remove("visible");
        cerrar.classList.add("visible");
        list.classList.add("visible");
    });

    cerrar.addEventListener("click", function () {
        abrir.classList.add("visible");
        cerrar.classList.remove("visible");
        list.classList.remove("visible");
    });

    // Translation function - simplify by toggling between languages
    translateBtn.addEventListener("click", function () {
        console.log('Botón de traducción pulsado. Idioma actual: ' + currentLanguage);

        if (currentLanguage === 'es') {
            // Change to English
            currentLanguage = 'en';
            translateBtn.textContent = "Español";
            document.documentElement.setAttribute('lang', 'en');

            // Navigate to Spanish version elements and hide them
            document.querySelectorAll('.lang-es').forEach(el => {
                el.style.display = 'none';
            });

            // Show English version elements
            document.querySelectorAll('.lang-en').forEach(el => {
                el.style.display = 'inline-block';
            });

            console.log('Cambiado a inglés');
        } else {
            // Change to Spanish
            currentLanguage = 'es';
            translateBtn.textContent = "English";
            document.documentElement.setAttribute('lang', 'es');

            // Hide English version elements
            document.querySelectorAll('.lang-en').forEach(el => {
                el.style.display = 'none';
            });

            // Show Spanish version elements
            document.querySelectorAll('.lang-es').forEach(el => {
                el.style.display = 'inline-block';
            });

            console.log('Cambiado a español');
        }
    });

    // Initialize - hide English version by default
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = 'none';
    });

    // Ensure Spanish version is displayed by default
    document.querySelectorAll('.lang-es').forEach(el => {
        el.style.display = 'inline-block';
    });

    console.log('Script de traducción cargado correctamente. Idioma inicial: ' + currentLanguage);
});
