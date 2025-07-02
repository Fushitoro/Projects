document.querySelectorAll('.cart-btn').forEach((btn, i) => {
    btn.addEventListener('click', () => {
        const box = btn.closest('.prod1');
        const name = box.dataset.name;
        const price = parseFloat(box.dataset.price);
        const qty = parseInt(box.querySelector('.qty-input').value);

        if (qty < 1) return alert("Quantity must be at least 1");

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const exists = cart.find(item => item.name === name);
        if (exists) {
            exists.quantity += qty;
        } else {
            cart.push({ name, price, quantity: qty });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        showNotif();
    });
});

function showNotif() {
    const notif = document.getElementById('notif');
    if (!notif) return;
    notif.style.display = 'block';
    setTimeout(() => notif.style.display = 'none', 1500);
}
