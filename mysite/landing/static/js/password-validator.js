class PasswordValidator {
    constructor(passwordInput, options = {}) {
        this.passwordInput = passwordInput;
        this.options = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            specialChars: '!@#$%^&*()_+{}[]|:;"\'<>,.?/~`',
            container: null,
            ...options
        };
        
        this.requirements = [];
        this.init();
    }
    
    init() {
        // Crear contenedor si no se proporciona uno
        if (!this.options.container) {
            this.options.container = document.createElement('div');
            this.options.container.className = 'password-validator';
            this.passwordInput.parentNode.insertBefore(this.options.container, this.passwordInput.nextSibling);
        }
        
        // Crear elementos de requisitos
        this.createRequirements();
        
        // Crear barra de fortaleza
        this.createStrengthMeter();
        
        // Agregar event listeners
        this.setupEventListeners();
    }
    
    createRequirements() {
        const requirements = [
            {
                id: 'length',
                text: {
                    es: 'Al menos 8 caracteres',
                    en: 'At least 8 characters'
                },
                validator: (value) => value.length >= this.options.minLength
            },
            {
                id: 'uppercase',
                text: {
                    es: 'Al menos una letra mayúscula',
                    en: 'At least one uppercase letter'
                },
                validator: (value) => /[A-Z]/.test(value),
                required: this.options.requireUppercase
            },
            {
                id: 'lowercase',
                text: {
                    es: 'Al menos una letra minúscula',
                    en: 'At least one lowercase letter'
                },
                validator: (value) => /[a-z]/.test(value),
                required: this.options.requireLowercase
            },
            {
                id: 'number',
                text: {
                    es: 'Al menos un número',
                    en: 'At least one number'
                },
                validator: (value) => /[0-9]/.test(value),
                required: this.options.requireNumbers
            },
            {
                id: 'special',
                text: {
                    es: 'Al menos un carácter especial',
                    en: 'At least one special character'
                },
                validator: (value) => {
                    const specialChars = this.options.specialChars.split('');
                    return specialChars.some(char => value.includes(char));
                },
                required: this.options.requireSpecialChars
            }
        ];
        
        // Filtrar requisitos según configuración
        this.requirements = requirements.filter(req => req.required !== false);
        
        // Crear elementos HTML para los requisitos
        this.requirements.forEach(req => {
            const reqElement = document.createElement('div');
            reqElement.className = 'password-requirement';
            reqElement.id = `req-${req.id}`;
            reqElement.innerHTML = `
                <i class="bi bi-x-circle"></i>
                <span class="lang-es">${req.text.es}</span>
                <span class="lang-en" style="display: none;">${req.text.en}</span>
            `;
            this.options.container.appendChild(reqElement);
        });
    }
    
    createStrengthMeter() {
        // Contenedor de la barra de fortaleza
        const strengthContainer = document.createElement('div');
        strengthContainer.className = 'password-strength';
        
        // Barra de progreso
        this.strengthBar = document.createElement('div');
        this.strengthBar.className = 'password-strength-bar';
        
        // Texto de fortaleza
        this.strengthText = document.createElement('div');
        this.strengthText.className = 'password-strength-text';
        this.strengthText.innerHTML = `
            <span class="lang-es">Seguridad: Débil</span>
            <span class="lang-en" style="display: none;">Strength: Weak</span>
        `;
        
        strengthContainer.appendChild(this.strengthBar);
        this.options.container.appendChild(strengthContainer);
        this.options.container.appendChild(this.strengthText);
    }
    
    setupEventListeners() {
        this.passwordInput.addEventListener('input', () => this.validate());
        this.passwordInput.addEventListener('focus', () => this.options.container.style.display = 'block');
        this.passwordInput.addEventListener('blur', () => {
            // Ocultar solo si no hay foco en ningún elemento del validador
            if (!this.options.container.contains(document.activeElement)) {
                this.options.container.style.display = 'none';
            }
        });
        
        // Manejar clics fuera del validador
        document.addEventListener('click', (e) => {
            if (!this.passwordInput.contains(e.target) && !this.options.container.contains(e.target)) {
                this.options.container.style.display = 'none';
            }
        });
    }
    
    validate() {
        const value = this.passwordInput.value;
        let validCount = 0;
        
        // Validar cada requisito
        this.requirements.forEach(req => {
            const reqElement = document.getElementById(`req-${req.id}`);
            const isValid = req.validator(value);
            
            if (isValid) {
                reqElement.classList.add('valid');
                reqElement.classList.remove('invalid');
                reqElement.querySelector('i').className = 'bi bi-check-circle';
                validCount++;
            } else {
                reqElement.classList.add('invalid');
                reqElement.classList.remove('valid');
                reqElement.querySelector('i').className = 'bi bi-x-circle';
            }
        });
        
        // Actualizar barra de fortaleza
        this.updateStrengthMeter(validCount);
        
        // Mostrar/ocultar el validador
        if (value.length > 0) {
            this.options.container.style.display = 'block';
        } else {
            this.options.container.style.display = 'none';
        }
        
        return validCount === this.requirements.length;
    }
    
    updateStrengthMeter(validCount) {
        const total = this.requirements.length;
        const percentage = (validCount / total) * 100;
        
        // Actualizar ancho de la barra
        this.strengthBar.style.width = `${percentage}%`;
        
        // Actualizar clases de fortaleza
        const container = this.options.container;
        container.classList.remove('password-strength-weak', 'password-strength-medium', 'password-strength-strong');
        
        let strengthClass = 'password-strength-weak';
        let strengthTextEs = 'Débil';
        let strengthTextEn = 'Weak';
        
        if (percentage >= 80) {
            strengthClass = 'password-strength-strong';
            strengthTextEs = 'Fuerte';
            strengthTextEn = 'Strong';
            this.strengthBar.style.backgroundColor = '#28a745';
        } else if (percentage >= 50) {
            strengthClass = 'password-strength-medium';
            strengthTextEs = 'Media';
            strengthTextEn = 'Medium';
            this.strengthBar.style.backgroundColor = '#ffc107';
        } else {
            this.strengthBar.style.backgroundColor = '#dc3545';
        }
        
        container.classList.add(strengthClass);
        
        // Actualizar texto de fortaleza
        const textElements = this.strengthText.getElementsByClassName('lang-es');
        for (let el of textElements) {
            el.textContent = `Seguridad: ${strengthTextEs}`;
        }
        
        const enTextElements = this.strengthText.getElementsByClassName('lang-en');
        for (let el of enTextElements) {
            el.textContent = `Strength: ${strengthTextEn}`;
        }
    }
    
    // Método para verificar si la contraseña es válida
    isValid() {
        return this.validate();
    }
}

// Inicialización automática para elementos con data-password-validator
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-password-validator]').forEach(input => {
        new PasswordValidator(input);
    });
});
