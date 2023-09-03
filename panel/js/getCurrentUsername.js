document.addEventListener("DOMContentLoaded", function(){
  getUserInfo();
});

async function getUserInfo() {
  try {
    const response = await fetch('https://localhost:7121/api/Users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      const data = await response.json();
      const usernameParagraph = document.getElementById("username");
      usernameParagraph.innerText+="Witaj, "+data.username;
      console.log('Zalogowany jako:', data.username);
    } else if (response.status === 401) {
      console.log('Nieautoryzowany dostęp. Brak lub nieważny token.');
    } else if (response.status === 400) {
      console.log('Nieprawidłowy token.');
    } else {
      console.log('Nieoczekiwany błąd:', response.status);
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas komunikacji z serwerem:', error);
  }
}
