document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('mainForm');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const message = document.getElementById('message');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (checkInputs()) {
            // 1. Recolectamos los datos de los inputs
            const formData = {
                name: name.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim(),
                password: password.value.trim(),
                message: message.value.trim()
            };

            // 2. Enviamos los datos al servidor con fetch
            fetch('http://localhost:8000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 3. Si el servidor responde OK, mostramos el modal y limpiamos
                    showModal();
                    form.reset(); 
                    // Opcional: limpiar las clases de éxito (las marquitas verdes)
                    document.querySelectorAll('.form-control').forEach(el => el.className = 'form-control');
                } else {
                    alert('Error al guardar en la base de datos: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('No se pudo conectar con el servidor. ¿Olvidaste encender el server con "node server.js"?');
            });
        }
    });

    function checkInputs() {
        let isValid = true;
        validateField(name, name.value.trim() !== '', 'Name cannot be blank');
        validateField(email, isEmail(email.value.trim()), 'Not a valid email');
        validateField(phone, isPhone(phone.value.trim()), 'Not a valid phone number');
        validateField(password, password.value.trim().length >= 8, 'Password must be at least 8 characters');
        validateField(message, message.value.trim() !== '', 'Message cannot be blank');

        document.querySelectorAll('.form-control').forEach((control) => {
            if (control.classList.contains('error')) {
                isValid = false;
            }
        });

        return isValid;

    }

    function validateField(input, condition, errorMessage) {
        if (condition) {
            setSuccess(input);
        } else {
            setError(input, errorMessage);
        }
    }

    function setError(input, message) {
        const formControl = input.parentElement;
        const icon = formControl.querySelector('.icon');
        formControl.className = 'form-control error';
        icon.className = 'icon fas fa-times-circle';
        input.placeholder = message;
    }

    function setSuccess(input) {
        const formControl = input.parentElement;
        const icon = formControl.querySelector('.icon');
        formControl.className = 'form-control success';
        icon.className = 'icon fas fa-check-circle';
    }

    function isEmail(email) {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }

    function isPhone(phone) {
        return /^\+?(\d.*){3,}$/.test(phone);
    }

    function showModal() {
        const modal = document.getElementById('successModal');
        modal.style.display = 'block';

        const closeBtn = document.querySelector('.close-button');
        closeBtn.onclick = function () {
            modal.style.display = 'none';
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

});