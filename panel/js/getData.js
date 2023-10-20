async function getData(){
    const baseAddress = "https://localhost:7121";
    const apiUrlUser = `${baseAddress}/api/Users/me`;
    let loggedInUserId;
    try {
        const responseUserID = await fetch(apiUrlUser, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (responseUserID.status === 200) {
            const userData = await responseUserID.json();
            const usernameParagraph = document.getElementById("username");
            usernameParagraph.innerText += "Cześć, " + userData.username;
            loggedInUserId = userData.idUser;
            console.log(loggedInUserId);

            // https://localhost:7121/api/UserWorkspace/2/workspace

            let apiUrlWorkspaces = `${baseAddress}/api/UserWorkspace/${loggedInUserId}/workspace`;
            const responseWorkspaces = await fetch(apiUrlWorkspaces, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(responseWorkspaces.status === 200){
                const workspacesData = await responseWorkspaces.json();
                const workspaceList = document.querySelector(".list-of-workspaces");

                workspacesData.forEach(workspacesData => {
                    const workspaceDiv = document.createElement("div");
                    workspaceDiv.classList.add("workspace");
                    workspaceDiv.id = workspacesData.idUserWorkspace;

                    const workspaceHeaderDiv = document.createElement("div");
                    workspaceHeaderDiv.classList.add("workspace-header");

                    const workspaceHeaderH3 = document.createElement("h3");
                    workspaceHeaderH3.innerText = workspacesData.nameOfUserWorkspace;

                    const workspaceGoTo = document.createElement("div");
                    workspaceGoTo.classList.add("go-to-workspace");
                    workspaceGoTo.id = "goToWorkspace";

                    const workspaceGoToBtn = document.createElement("button");
                    workspaceGoToBtn.classList.add("btn","go-to-workspace-btn");
                    workspaceGoToBtn.id = "goToWorkspaceBtn";
                    workspaceGoToBtn.textContent = "Dodaj następną przestrzeń"

                    workspaceHeaderDiv.appendChild(workspaceHeaderH3);
                    workspaceDiv.appendChild(workspaceHeaderDiv);
                    workspaceGoTo.appendChild(workspaceGoToBtn);
                    workspaceDiv.appendChild(workspaceGoTo);
                    workspaceList.appendChild(workspaceDiv);
                });
            }

            // let apiUrlTasks = `${baseAddress}/api/Users/${loggedInUserId}/tasks`;
            // const responseTasks = await fetch(apiUrlTasks, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // });
            // if (responseTasks.status === 200) {
            //     const taskData = await responseTasks.json();
            //     const itemsList = document.querySelector(".items-list");
            
            //     taskData.forEach(taskData => {
            //         const taskDiv = document.createElement("div");
            //         taskDiv.classList.add("task");
            //         taskDiv.id = taskData.idTask;
            
            //         const taskColorBand = document.createElement("div");
            //         taskColorBand.classList.add("color-band");
            //         taskColorBand.style.backgroundColor = taskData.colorBandTask;

            //         const nameTask = document.createElement("p");
            //         nameTask.innerText = taskData.nameTask;
            
            //         const taskContent = document.createElement("div");
            //         taskContent.classList.add("task-content");

            //         const descTask = document.createElement("p");
            //         descTask.innerText = taskData.descTask;
            
            //         taskColorBand.appendChild(nameTask);
            //         taskContent.appendChild(descTask);
            //         taskDiv.appendChild(taskColorBand);
            //         taskDiv.appendChild(taskContent);
            //         itemsList.appendChild(taskDiv);
            //     });
            // }            
            // else if(responseTasks.status === 400){
            //     console.log("Bad Request: Invalid URL.");
            // }
        }
        else if (responseUserID.status === 401) {
            location.href = "/home";
            console.log('Unauthorized: Token is missing or invalid.');
        }
        else if (responseUserID.status === 400) {
            console.log('Bad Request: Invalid token.');
            location.href = "/home";
        }
        else {
            console.log('An unknown error occurred.');
            location.href = "/home";
        }
    }
    catch(error){
        console.error('An error occurred:', error);
        // location.href="/home";
    }
}

getData();