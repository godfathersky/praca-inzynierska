document.addEventListener("DOMContentLoaded", function(){
const logoutBtn = document.getElementById("logOutBtn");
logoutBtn.addEventListener("click", function(){
logoutUser();
})
logoutExpired();
})

async function logoutUser() {
  fetch('https://localhost:7121/api/Users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.text())
  .then(data => {
    console.log("Wylogowano:", data);
    document.cookie = "jwt" + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href="/home";
  })
  .catch((error) => {
    console.error("Błąd podczas wylogowania:", error);
  });
}

function logoutExpired(){
  setTimeout(function(){
    logoutUser();
  },3600*1000);
}