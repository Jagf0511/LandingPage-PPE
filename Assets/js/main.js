const abrir = document.querySelector(".abrir");
const cerrar = document.querySelector(".cerrar");
    const list = document.querySelector(".list-nav")
document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navigation");
    const logo = document.querySelector(".logo");
    const carousel = document.querySelector(".container-one");

    const logotipoNormal = "Assets/Imgs/logos/logotipo_web.svg";
    const logotipoScroll = "Assets/Imgs/logos/iconweb.svg";

    let lastScrollY = window.scrollY; // Guarda la posición anterior del scroll

    window.addEventListener("scroll", function () {
        const isScrolled = window.scrollY > 0;
        if(isScrolled>0){
            nav.classList.add("active", isScrolled);
            carousel.classList.add("active", isScrolled);
            logo.src = logotipoScroll;
            logo.style.height = "60px";
            logo.style.transform = "rotate(360deg)";
            
        } 
       else{
        nav.classList.remove("active", isScrolled);
        carousel.classList.remove("active", isScrolled);
        logo.src = logotipoNormal;
        logo.style.height = "80px";
        logo.style.transform = "rotate(0deg)";
       }
        
    });
});

abrir.addEventListener("click", function(){
    abrir.classList.remove("visible");
    cerrar.classList.add("visible");
    list.classList.add("visible");
});
cerrar.addEventListener("click", function(){
    abrir.classList.add("visible");
    cerrar.classList.remove("visible");
    list.classList.remove("visible");
});

window.onload = function () {
    const images = [
        "Assets/Imgs/photos/carrusel_1-min.jpg",
        "Assets/Imgs/photos/carrusel_2-min.jpg",
        "Assets/Imgs/photos/carrusel_3-min.jpg",
        "Assets/Imgs/photos/carrusel_4-min.jpg",
        "Assets/Imgs/photos/carrusel_5-01.jpg"
    ];

    images.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
};
