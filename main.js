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
    // Funcionalidad del formulario de contacto
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
    // Funcionalidad de registro
    const registerForm = document.getElementById("register-form");
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value.trim();
        if (email === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }
        // Guardar usuario en localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find((user)=>user.email === email);
        if (existingUser) alert("Este email ya est\xe1 registrado.");
        else {
            users.push({
                email: email,
                password: password
            });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registro exitoso. Ahora puedes iniciar sesi\xf3n.");
            registerForm.reset();
        }
    });
    //  inicio de sesión
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value.trim();
        if (email === "" || password === "") {
            alert("Por favor, complete todos los campos.");
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find((user)=>user.email === email && user.password === password);
        if (user) alert("Inicio de sesi\xf3n exitoso. Bienvenido!");
        else alert("Email o contrase\xf1a incorrectos.");
    });
});


//# sourceMappingURL=main.js.map
