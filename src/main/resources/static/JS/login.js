document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.login-container');
    // Asegúrate de usar los IDs del HTML adaptado
    const form = document.getElementById('login-register-form'); 
    const mainActionButton = document.getElementById('main-action-btn'); 
    
    let switcherP = container.querySelector('.switch-mode-text');
    let forgotPasswordP = container.querySelector('.forgot-password');
    let isRegisterMode = false; // Variable para rastrear el modo actual

    // --- LÓGICA DE INYECCIÓN DE ELEMENTOS ---

    if (!switcherP) {
        switcherP = document.createElement('p');
        switcherP.className = 'text-center switch-mode-text my-3 animate__animated animate__fadeIn';
        switcherP.innerHTML = '¿No tienes cuenta? <a href="#" class="click-link" id="mode-switcher">REGÍSTRATE AQUÍ</a>';
        form.after(switcherP);
    }

    // Nota: Se asume que en el HTML se usaron los nombres 'password' para la contraseña
    const passwordInput = container.querySelector('input[name="password"]'); 
    
    // Campo de Confirmar Contraseña (¡Añadimos el atributo name="confirm_password"!)
    const confirmPasswordFieldHTML = `
        <div class="input-group-custom mb-4 register-field animate__animated animate__fadeInDown">
            <div class="icon-wrapper"><i class="fas fa-lock"></i></div>
            <input type="password" class="form-control-custom" placeholder="CONFIRM PASSWORD" name="confirm_password" required>
        </div>
    `;
    
    if (passwordInput && !container.querySelector('.register-field')) {
        const passwordGroup = passwordInput.parentElement;
        // Asumimos que el input 'password' es el único con type='password' inicial. 
        // Mejor usar el padre del input de contraseña principal para insertar después.
        passwordGroup.parentElement.querySelector('.input-group-custom:last-of-type').insertAdjacentHTML('afterend', confirmPasswordFieldHTML);
    }
    
    const confirmField = container.querySelector('.register-field');
    let modeSwitcher = container.querySelector('#mode-switcher');
    
    // --- LÓGICA DE ALTERNANCIA (TOGGLE) ---

    function toggleMode(e) {
        if (e) e.preventDefault();
        
        // Actualiza la variable de estado y la clase del contenedor
        isRegisterMode = container.classList.toggle('register-mode');
        
        // Reconstrucción del enlace de alternancia
        const newSwitcherLink = `<a href="#" class="click-link" id="mode-switcher">`;

        if (isRegisterMode) {
            mainActionButton.textContent = 'REGISTER';
            switcherP.innerHTML = `¿Ya tienes cuenta? ${newSwitcherLink}INICIA SESIÓN AQUÍ</a>`;
            if (forgotPasswordP) forgotPasswordP.style.display = 'none';
            if (confirmField) {
                confirmField.style.display = 'flex';
                confirmField.classList.remove('animate__fadeOutUp');
                confirmField.classList.add('animate__fadeInDown');
            }
        } else {
            mainActionButton.textContent = 'LOGIN'; 
            switcherP.innerHTML = `¿No tienes cuenta? ${newSwitcherLink}REGÍSTRATE AQUÍ</a>`;
            if (forgotPasswordP) forgotPasswordP.style.display = 'block';
            if (confirmField) {
                confirmField.classList.remove('animate__fadeInDown');
                confirmField.classList.add('animate__fadeOutUp');
                setTimeout(() => {
                    confirmField.style.display = 'none';
                }, 500); 
            }
        }
        
        // Reasignar el listener al nuevo enlace
        const newSwitcher = container.querySelector('#mode-switcher');
        if (newSwitcher) newSwitcher.addEventListener('click', toggleMode);
    }

    if (modeSwitcher) modeSwitcher.addEventListener('click', toggleMode);
    
    // Asegurar el estado inicial al cargar
    if (confirmField) confirmField.style.display = 'none';
    if (mainActionButton.textContent === 'login / register' || mainActionButton.textContent === 'LOGIN / REGISTER') {
        mainActionButton.textContent = 'LOGIN'; 
    }
    
    // --- LÓGICA CLAVE: ENVÍO DE DATOS AL BACKEND PARA MY-SQL ---

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Detener la recarga de página por defecto
        
        mainActionButton.disabled = true; // Deshabilitar el botón

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()); // Convertir a objeto JSON

        if (isRegisterMode) {
            // Lógica de Registro
            if (data.password !== data.confirm_password) {
                alert("Las contraseñas no coinciden. Por favor, revísalas.");
                mainActionButton.disabled = false;
                return;
            }
            
            // Eliminar el campo de confirmación antes de enviar al servidor
            delete data.confirm_password; 

            // PETICIÓN FETCH para REGISTRO
            fetch('/api/register', { // <<--- ¡CAMBIA ESTA URL!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Enviamos los datos como JSON
            })
            .then(response => {
                if (!response.ok) {
                    // Si el servidor responde con 4xx o 5xx
                    return response.json().then(err => { throw new Error(err.message || 'Error al procesar registro.'); });
                }
                return response.json();
            })
            .then(result => {
                if (result.success) {
                    alert("✅ ¡Registro exitoso! Ya puedes iniciar sesión.");
                    toggleMode(); // Volver al modo Login
                } else {
                    alert("❌ Error: " + (result.message || "Usuario ya existe o error desconocido."));
                }
            })
            .catch(error => {
                console.error('Error de red/servidor:', error);
                alert("🔴 Ocurrió un error al intentar registrar. Revisa tu conexión y el servidor.");
            })
            .finally(() => {
                mainActionButton.disabled = false;
            });

        } else {
            // Lógica de Login

             // PETICIÓN FETCH para LOGIN
             fetch('/api/login', { // <<--- ¡CAMBIA ESTA URL!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Error al iniciar sesión.'); });
                }
                return response.json();
            })
            .then(result => {
                if (result.success) {
                    alert("🎉 ¡Inicio de sesión exitoso!");
                    // Redirigir (ej. al dashboard)
                    window.location.href = "/dashboard"; 
                } else {
                    alert("⚠️ Credenciales incorrectas o usuario no encontrado.");
                }
            })
            .catch(error => {
                console.error('Error de login:', error);
                alert("🔴 Ocurrió un error al intentar iniciar sesión. Revisa tu conexión y el servidor.");
            })
            .finally(() => {
                mainActionButton.disabled = false;
            });
        }
    });
});