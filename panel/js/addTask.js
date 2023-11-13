// Plik do usunięcia

export async function addTask(name, desc, color){
    try {
        const response = await fetch(`https://localhost:7121/api/Utasks/${loggedInUserId}/addTask`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            NameTask: name,
            DescTask: desc,
            ColorBandTask: color
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