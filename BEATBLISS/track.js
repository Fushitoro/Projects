function loadOrders() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  const container = document.getElementById('orders-list');
  container.innerHTML = '';

  orders.forEach((order, index) => {
    const orderCard = document.createElement('div');
    orderCard.className = 'order-card';

    const header = document.createElement('div');
    header.className = 'order-header';

    const idEl = document.createElement('div');
    idEl.className = 'order-id';
    idEl.innerText = `Order ID: ${order.id}`;

    const statusEl = document.createElement('span');
    statusEl.className = `status ${order.status}`;
    statusEl.innerText = order.status;

    header.appendChild(idEl);
    header.appendChild(statusEl);

    const date = document.createElement('p');
    date.innerText = `Date: ${new Date(order.date).toLocaleString()}`;

    const total = document.createElement('p');
    total.innerText = `Total: ₹${order.total.toFixed(2)}`;

    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'toggle-details';
    detailsBtn.innerText = 'View Items';

    const itemList = document.createElement('div');
    itemList.className = 'order-items';

    order.items.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'item';

      const img = document.createElement('img');
      img.src = item.image;

      const info = document.createElement('div');
      info.className = 'item-info';
      info.innerText = `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`;

      itemRow.appendChild(img);
      itemRow.appendChild(info);
      itemList.appendChild(itemRow);
    });

    detailsBtn.addEventListener('click', () => {
      itemList.classList.toggle('show');
    });

    orderCard.appendChild(header);
    orderCard.appendChild(date);
    orderCard.appendChild(total);
    orderCard.appendChild(detailsBtn);
    orderCard.appendChild(itemList);
    container.appendChild(orderCard);
  });
}

function refreshStatus() {
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.forEach(order => {
    if (order.status === 'Pending') {
      order.status = 'Shipped';
    } else if (order.status === 'Shipped') {
      order.status = 'Delivered';
    }
  });
  localStorage.setItem('orders', JSON.stringify(orders));
  loadOrders();
}

document.getElementById('refreshStatus').addEventListener('click', refreshStatus);
window.onload = loadOrders;
