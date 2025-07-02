document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const contact = {
    name,
    email,
    message,
    date: new Date().toLocaleString()
  };

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));

  document.getElementById("successMsg").textContent = "Message sent successfully!";
  document.getElementById("contactForm").reset();
});
