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
      usernameParagraph.innerText+="Cześć, "+data.username;
    } else if (response.status === 401) {
      console.log('Unauthorized access. Missing or invalid token.');
    } else if (response.status === 400) {
      console.log('Invalid token.');
    } else {
      console.log('Unexpected error:', response.status);
    }
  } catch (error) {
    console.error('An error occurred while communicating with the server:', error);
  }
};