async function getData(){
    const apiUrlUser = "https://localhost:7121/api/Users/me";
    let loggedInUserId;
    try{
        const responseUserID = await fetch(apiUrlUser, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
        });
        if (responseUserID.status === 200) {
            const data = await response.json();
            const usernameParagraph = document.getElementById("username");
            usernameParagraph.innerText+="Cześć, "+data.username;

            const userData = await responseUserID.json();
            loggedInUserId = userData.idUser;

            let apiUrlTasks = `https://localhost:7121/api/Users/${loggedInUserId}/tasks`;
            const responseTasks = await fetch(apiUrlTasks, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            });
            if (responseTasks.status === 200) {
                const tasks = await responseTasks.json();
                const itemsList = document.querySelector(".items-list");
            
                tasks.forEach(task => {
                    const taskDiv = document.createElement("div");
                    taskDiv.classList.add("task");
                    taskDiv.id = task.idTask;
            
                    const taskColorBand = document.createElement("div");
                    taskColorBand.classList.add("color-band");
                    taskColorBand.style.backgroundColor = task.colorBandTask;

                    const nameTask = document.createElement("p");
                    nameTask.innerText = task.nameTask;
            
                    const taskContent = document.createElement("div");
                    taskContent.classList.add("task-content");

                    const descTask = document.createElement("p");
                    descTask.innerText = task.descTask;
            
                    taskColorBand.appendChild(nameTask);
                    taskContent.appendChild(descTask);
                    taskDiv.appendChild(taskColorBand);
                    taskDiv.appendChild(taskContent);
                    itemsList.appendChild(taskDiv);
                });
            }            
            else if(responseTasks.status === 400){
                console.log("BAD RESPONSE 2");
            }
        }
        else if (response.status === 401) {
            console.log('Unauthorized: Token is missing or invalid.');
            location.href="/home";
        }
        else if (response.status === 400) {
            console.log('Bad Request: Invalid token.');
            location.href="/home";
        }
        else {
            console.log('An unknown error occurred.');
            location.href="/home";
        }
    }
    catch(error){
        console.error('An error occurred:', error);
        location.href="/home";
    }
}

getData();