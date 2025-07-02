document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const storedPassword = localStorage.getItem(username);

        if (storedPassword && storedPassword === password) {

            Swal.fire({
                icon: 'success',
                title: 'Login successful!',
                text: 'Welcome back, ' + username + ' 🎧',
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true
            }).then(() => window.location.href = 'index.html');
        } else {

            Swal.fire({
                icon: 'error',
                title: 'Oops…',
                text: 'Invalid credentials. Please register or try again.',
                confirmButtonColor: '#6c63ff'
            }).then(() => window.location.href = 'register.html');
        }
    });
});
