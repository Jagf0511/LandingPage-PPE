require("./main.css");


const $b1a76c4bb39a91ce$var$abrir = document.querySelector(".abrir");
const $b1a76c4bb39a91ce$var$cerrar = document.querySelector(".cerrar");
const $b1a76c4bb39a91ce$var$list = document.querySelector(".list-nav");
document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector(".navigation");
    const logo = document.querySelector(".logo");
    const carousel = document.querySelector(".container-one");
    const form = document.querySelector(".contact-form form");
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("#email");
    const messageInput = document.querySelector("#message");
    const logotipoNormal = "Assets/Imgs/logos/logotipo_web.svg";
    const logotipoScroll = "Assets/Imgs/logos/iconweb.svg";
    window.addEventListener("scroll", function() {
        const isScrolled = window.scrollY > 0;
        if (isScrolled) {
            nav.classList.add("active");
            carousel.classList.add("active");
            $b1a76c4bb39a91ce$var$list.classList.add("active");
            logo.src = logotipoScroll;
            logo.style.height = "60px";
            logo.style.transform = "rotate(360deg)";
        } else {
            nav.classList.remove("active");
            carousel.classList.remove("active");
            $b1a76c4bb39a91ce$var$list.classList.remove("active");
            logo.src = logotipoNormal;
            logo.style.height = "80px";
            logo.style.transform = "rotate(0deg)";
        }
    });
    $b1a76c4bb39a91ce$var$abrir.addEventListener("click", function() {
        $b1a76c4bb39a91ce$var$abrir.classList.remove("visible");
        $b1a76c4bb39a91ce$var$cerrar.classList.add("visible");
        $b1a76c4bb39a91ce$var$list.classList.add("visible");
    });
    $b1a76c4bb39a91ce$var$cerrar.addEventListener("click", function() {
        $b1a76c4bb39a91ce$var$abrir.classList.add("visible");
        $b1a76c4bb39a91ce$var$cerrar.classList.remove("visible");
        $b1a76c4bb39a91ce$var$list.classList.remove("visible");
    });
    window.onload = function() {
        const images = [
            "Assets/Imgs/photos/carrusel_1-min.jpg",
            "Assets/Imgs/photos/carrusel_2-min.jpg",
            "Assets/Imgs/photos/carrusel_3-min.jpg",
            "Assets/Imgs/photos/carrusel_4-min.jpg",
            "Assets/Imgs/photos/carrusel_5-01.jpg"
        ];
        images.forEach((src)=>{
            const img = new Image();
            img.src = src;
        });
    };
    // Funcionalidad del formulario
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío 
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();
        if (nameValue === "" || emailValue === "" || messageValue === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }
        alert("\xa1Gracias por contactar con nosotros!\n " + nameValue + " Sera enviado nuestra respuesta al\nEmail: " + emailValue);
        form.reset(); // Limpia los campos después del envío
    });
});


//# sourceMappingURL=main.js.map
