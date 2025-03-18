const abrir = document.querySelector(".abrir");
const cerrar = document.querySelector(".cerrar");
const list = document.querySelector(".list-nav");

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navigation");
    const logo = document.querySelector(".logo");
    const carousel = document.querySelector(".container-one");


    const logotipoNormal = "Assets/Imgs/logos/logotipo_web.svg";
    const logotipoScroll = "Assets/Imgs/logos/iconweb.svg";

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

});

