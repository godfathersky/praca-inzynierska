document.addEventListener("DOMContentLoaded", function(){
  const logoutBtn = document.getElementById("logoutBtn");
  logoutBtn.addEventListener("click", function(){
    logout();
  })
})

async function logout() {
  fetch('https://localhost:7121/api/Users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.text())
  .then(data => {
    console.log("Wylogowano:", data);
    location.href="/home";
  })
  .catch((error) => {
    console.error("Błąd podczas wylogowania:", error);
  });
}
