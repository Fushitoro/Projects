document.addEventListener('DOMContentLoaded',()=>{
  renderCart();
  document.getElementById('buy-now').addEventListener('click',placeOrder);
  document.getElementById('track-order').addEventListener('click',()=>{window.location.href='track_order.html';});
});

function renderCart(){
  const cartList=document.getElementById('cart-list');
  const totalElement=document.getElementById('total');
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  cartList.innerHTML='';
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.price*item.quantity;
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`<strong>${item.name}</strong><br>
      Price: ₹${item.price} × ${item.quantity} = ₹${item.price*item.quantity}
      <img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;"><br>
      <button class="remove" data-index="${index}">Remove</button>`;
    cartList.appendChild(div);
  });
  totalElement.textContent=`Total: ₹${total}`;
  document.querySelectorAll('.remove').forEach(btn=>{
    btn.addEventListener('click',()=>{removeItem(btn.dataset.index);});
  });
}

function removeItem(index){
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  cart.splice(index,1);
  localStorage.setItem('cart',JSON.stringify(cart));
  renderCart();
}

function placeOrder(){
  let cart=JSON.parse(localStorage.getItem('cart'))||[];
  if(!cart.length){
    alert('Your cart is empty');
    return;
  }
  let orders=JSON.parse(localStorage.getItem('orders'))||[];
  const total=cart.reduce((sum,it)=>sum+it.price*it.quantity,0);
  const order={
    id:'ORD'+Date.now(),
    date:new Date().toISOString(),
    items:cart,
    total:total,
    status:'Pending'
  };
  orders.push(order);
  localStorage.setItem('orders',JSON.stringify(orders));
  localStorage.removeItem('cart');
  alert('Order placed successfully');
  window.location.href='track_order.html';
}
