// Improved translation script for LandingPage-PPE
document.addEventListener("DOMContentLoaded", function () {
    // Get DOM elements that might not exist on all pages
    const abrir = document.querySelector(".abrir");
    const cerrar = document.querySelector(".cerrar");
    const list = document.querySelector(".list-nav");
    const nav = document.querySelector(".navigation");
    const logo = document.querySelector(".logo");
    const carousel = document.querySelector(".container-one");
    const translateBtn = document.getElementById("translate-btn");

    // Only apply scroll behavior if these elements exist
    if (nav && logo) {
        // Variables for scrolling behavior - using complete path for images
        const logotipoNormal = "/static/Imgs/logos/logotipo_web.svg";
        const logotipoScroll = "/static/Imgs/logos/iconweb.svg";

        // Scroll behavior
        window.addEventListener("scroll", function () {
            const isScrolled = window.scrollY > 0;
            if (isScrolled) {
                nav.classList.add("active");
                if (carousel) carousel.classList.add("active");
                if (list) list.classList.add("active");
                logo.src = logotipoScroll;
                logo.style.height = "60px";
                logo.style.transform = "rotate(360deg)";
            } else {
                nav.classList.remove("active");
                if (carousel) carousel.classList.remove("active");
                if (list) list.classList.remove("active");
                logo.src = logotipoNormal;
                logo.style.height = "80px";
                logo.style.transform = "rotate(0deg)";
            }
        });
    }

    // Mobile menu functionality - only if elements exist
    if (abrir && cerrar && list) {
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
    }

    // Translation functionality
    if (translateBtn) {
        // Set initial state - check local storage or default to Spanish
        let currentLanguage = localStorage.getItem('currentLanguage') || 'es';
        document.documentElement.setAttribute('lang', currentLanguage);
        translateBtn.textContent = currentLanguage === 'es' ? "EN" : "ES";

        // Translation function
        translateBtn.addEventListener("click", function () {
            if (currentLanguage === 'es') {
                // Change to English
                currentLanguage = 'en';
                translateBtn.textContent = "ES";
                document.documentElement.setAttribute('lang', 'en');

                // Hide Spanish elements
                document.querySelectorAll('.lang-es').forEach(el => {
                    el.style.display = 'none';
                });

                // Show English elements
                document.querySelectorAll('.lang-en').forEach(el => {
                    el.style.display = '';
                });
            } else {
                // Change to Spanish
                currentLanguage = 'es';
                translateBtn.textContent = "EN";
                document.documentElement.setAttribute('lang', 'es');

                // Hide English elements
                document.querySelectorAll('.lang-en').forEach(el => {
                    el.style.display = 'none';
                });

                // Show Spanish elements
                document.querySelectorAll('.lang-es').forEach(el => {
                    el.style.display = '';
                });
            }

            // Save language preference
            localStorage.setItem('currentLanguage', currentLanguage);
            console.log('Language switched to:', currentLanguage);
        });

        // Initialize - apply saved language preference
        if (currentLanguage === 'es') {
            // Show Spanish, hide English by default
            document.querySelectorAll('.lang-es').forEach(el => {
                el.style.display = 'inline-block';
            });
            document.querySelectorAll('.lang-en').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            // Show English, hide Spanish by default
            document.querySelectorAll('.lang-es').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.lang-en').forEach(el => {
                el.style.display = 'inline-block';
            });
        }
        console.log('Translation initialized with language:', currentLanguage);
    }
});
