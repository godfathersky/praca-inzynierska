export async function loginUser(username, password) {
    try {
      const response = await fetch('https://localhost:7121/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: username,
          Password: password
        }),
      });
  
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      }
      else {
        data = await response.text();
      }
  
      if (response.ok) {
        console.log(data);
        location.href="/panel"
        return true;
      }
      else {
        console.error(data);
        return false;
      }
    }
    catch (error) {
      console.error('There was a problem with the fetch operation: ', error);
      return false;
    }
};