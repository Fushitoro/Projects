document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', function () {
        const box = this.closest('.prod1');
        const name = box.getAttribute('data-name');
        const price = parseFloat(box.getAttribute('data-price'));
        const image = box.getAttribute('data-image');
        const quantity = parseInt(box.querySelector('.qty-input').value);

        const product = { name, price, image, quantity };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = cart.findIndex(item => item.name === name);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        const toast = document.getElementById('notif');

        function showNotification(msg) {
            const notify = document.querySelector(".notification");
            notify.innerText = msg;
            notify.style.display = "block";

            setTimeout(() => {
                notify.style.display = "none";
            }, 3000);
        }

        document.querySelector(".add-to-cart-btn").addEventListener("click", () => {
            showNotification("Product added to cart!");
        });

    });
});