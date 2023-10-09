const apiUrl = "https://localhost:7121/api/Users/me";

async function getUserInfo() {
  try {
    const response = await fetch(apiUrl, {
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
    }
    else if (response.status === 401) {
      console.log('Unauthorized: Token is missing or invalid.');
    }
    else if (response.status === 400) {
      console.log('Bad Request: Invalid token.');
    }
    else {
      console.log('An unknown error occurred.');
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getUserInfo();
