// JavaScript source code
document.addEventListener("DOMContentLoaded", function () {
    function validateForm(event) {
        event.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;
        const errorMessage = document.getElementById('error-message');

        if (password !== confirmPassword) {
            errorMessage.style.display = 'block';
            return false;
        }

        errorMessage.style.display = 'none';
        document.getElementById('registerForm').submit();
    }

    document.getElementById('registerForm').addEventListener('submit', validateForm);
});
