document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {

            Swal.fire({
                icon: 'warning',
                title: 'Hold on…',
                text: 'Please fill in both fields.',
                confirmButtonColor: '#6c63ff'
            });
            return;
        }

        if (localStorage.getItem(username)) {

            Swal.fire({
                icon: 'error',
                title: 'Username taken',
                text: 'Try a different username!',
                confirmButtonColor: '#6c63ff'
            });
        } else {
            localStorage.setItem(username, password);

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Registered successfully!',
                showConfirmButton: false,
                timer: 1800,
                timerProgressBar: true
            }).then(() => window.location.href = 'login.html');
        }
    });
});