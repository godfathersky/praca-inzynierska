export async function registerUser(username, email, password) {
    try{
        const response = await fetch('https://localhost:7121/api/Users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        
        let data;
        const contentType = response.headers.get('content-type');
        if(contentType && contentType.indexOf('application/json') !== -1){
            data = await response.json();
        }
        else{
            data = await response.text();
        }

        if(response.ok){
            return true;
        }
        else{
            console.error("An error occurred while registering the user: ", data);
            return false;
        }
    }
    catch(err){
        console.error("An error occurred while registering the user: ", err);
        return false;
    }
}
