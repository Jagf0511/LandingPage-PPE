// Fixed JavaScript file for LandingPage-PPE
const abrir = document.querySelector(".abrir");
const cerrar = document.querySelector(".cerrar");
const list = document.querySelector(".list-nav");

// Inicialización de LogRocket para monitoreo de sesiones y errores
if (window.LogRocket) {
    window.LogRocket.init('l2tomk/landing-page');

    // Registrar un evento personalizado
    window.LogRocket.log('Página principal cargada');

    // Registrar un error personalizado de ejemplo
    try {
        // Simulación de código que podría fallar
        // throw new Error('Error de ejemplo para LogRocket');
    } catch (e) {
        window.LogRocket.error('Error capturado: ' + e.message);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navigation");
    const logo = document.querySelector(".logo");
    const carousel = document.querySelector(".container-one");
    const translateBtn = document.getElementById("translate-btn");

    // Variables para la traducción
    let isTranslated = false; // false = español, true = inglés

    // Definir textos para traducción
    const translations = {
        english: {
            home: "Home",
            aboutUs: "About us",
            brochure: "Brochure",
            loginBtn: "Login",
            registerBtn: "Sign up",
            translateBtn: "English",
            exploreTitle: "Explore amazing places",
            exploreDesc: "Discover unforgettable destinations in every trip.",
            adventureTitle: "Live the adventure",
            adventureDesc: "Find unique experiences in every corner.",
            horizonsTitle: "Discover new horizons",
            horizonsDesc: "Traveling is the best way to learn and grow.",
            natureTitle: "Connect with nature",
            natureDesc: "The most beautiful landscapes await you.",
            aboutUsHeading: "About Us",
            galleryHeading: "Photo Gallery",
            contactHeading: "Contact",
            socialHeading: "Social Networks"
        },
        spanish: {
            home: "Inicio",
            aboutUs: "Sobre nosotros",
            brochure: "Brochure",
            loginBtn: "Iniciar sesión",
            registerBtn: "Registrarse",
            translateBtn: "Español",
            exploreTitle: "Explora lugares increíbles",
            exploreDesc: "Descubre destinos inolvidables en cada viaje.",
            adventureTitle: "Vive la aventura",
            adventureDesc: "Encuentra experiencias únicas en cada rincón.",
            horizonsTitle: "Descubre nuevos horizontes",
            horizonsDesc: "Viajar es la mejor manera de aprender y crecer.",
            natureTitle: "Conéctate con la naturaleza",
            natureDesc: "Los paisajes más hermosos te esperan.",
            aboutUsHeading: "Sobre Nosotros",
            galleryHeading: "Galería de Fotos",
            contactHeading: "Contacto",
            socialHeading: "Redes sociales"
        }
    };

    const logotipoNormal = "static/Imgs/logos/logotipo_web.svg";
    const logotipoScroll = "static/Imgs/logos/iconweb.svg";

    // Set initial button text for translation button
    translateBtn.textContent = translations.spanish.translateBtn;

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

    // Función para traducir la página
    translateBtn.addEventListener("click", function () {
        // Cambiar el estado de traducción
        isTranslated = !isTranslated;

        // Seleccionar el idioma
        const language = isTranslated ? 'english' : 'spanish';
        const texts = translations[language];

        console.log(`Traduciendo a: ${language}, isTranslated=${isTranslated}`);

        // Actualizar el texto del botón de traducción
        translateBtn.textContent = texts.translateBtn;

        try {
            // Navegación - Seleccionar los elementos correctos
            const navLinks = document.querySelectorAll(".list-nav a");
            if (navLinks.length >= 3) {
                navLinks[0].textContent = texts.home;
                navLinks[1].textContent = texts.aboutUs;
            }

            // Botones
            const loginBtn = document.querySelector(".login_btn");
            const registerBtn = document.querySelector(".register_btn");
            if (loginBtn) loginBtn.textContent = texts.loginBtn;
            if (registerBtn) registerBtn.textContent = texts.registerBtn;

            // Títulos de secciones
            const aboutUsHeading = document.querySelector(".aboutus h2");
            const galleryHeading = document.querySelector(".gallery h2");

            if (aboutUsHeading) aboutUsHeading.textContent = texts.aboutUsHeading;
            if (galleryHeading) galleryHeading.textContent = texts.galleryHeading;

            // Carrusel - Slides
            const carouselTitles = document.querySelectorAll(".carousel-item h5");
            const carouselDescs = document.querySelectorAll(".carousel-item p");

            // Asegurar que podamos acceder a todos los elementos del carrusel
            if (carouselTitles.length >= 4) {
                carouselTitles[0].textContent = texts.exploreTitle;
                carouselTitles[1].textContent = texts.adventureTitle;
                carouselTitles[2].textContent = texts.horizonsTitle;
                carouselTitles[3].textContent = texts.natureTitle;
            } else {
                console.warn("No se encontraron todos los títulos del carrusel");
            }

            if (carouselDescs.length >= 4) {
                carouselDescs[0].textContent = texts.exploreDesc;
                carouselDescs[1].textContent = texts.adventureDesc;
                carouselDescs[2].textContent = texts.horizonsDesc;
                carouselDescs[3].textContent = texts.natureDesc;
            } else {
                console.warn("No se encontraron todas las descripciones del carrusel");
            }

            // Footer
            const footerTitles = document.querySelectorAll(".footer-column h3");
            if (footerTitles.length >= 2) {
                footerTitles[0].textContent = texts.contactHeading;
                footerTitles[1].textContent = texts.socialHeading;
            }

        } catch (error) {
            console.error("Error al traducir:", error);
        }
    });
});