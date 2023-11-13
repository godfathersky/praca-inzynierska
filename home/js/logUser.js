export async function loginUser(username, password){
    try{
        const response = await fetch('https://localhost:7121/api/Users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            credentials: 'include'
        });

        let data;
        const contentType = response.headers.get('content-type');
        if(contentType && contentType.indexOf('application/json') !== -1){
            data = await response.json();
        }
        else{
            data = await response.text();
        }

        if(response.status === 200){
            location.href = '/panel';
            return true;
        }
        else{
            console.error("An error occurred while logging in the user: ", data);
            return false;
        }
    }
    catch(err){
        console.error("An error occurred while logging in the user: ", err);
        return false;
    }
}