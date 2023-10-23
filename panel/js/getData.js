
async function getData(){
    const baseAddress = "https://localhost:7121";
    let loggedInUserId;
    try {
        const apiUrlUser = `${baseAddress}/api/Users/me`;
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

            let apiUrlWorkspaces = `${baseAddress}/api/UserWorkspace/${loggedInUserId}/workspace`;
            const responseWorkspaces = await fetch(apiUrlWorkspaces, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(responseWorkspaces.status === 200){
                const workspacesData = await responseWorkspaces.json();
                const mainSpaceDiv = document.querySelector(".main-space");

                const listOfWorkspaceDiv = document.createElement("div");
                listOfWorkspaceDiv.classList.add("list-of-workspaces");

                const addWorkspaceDiv = document.createElement("div");
                addWorkspaceDiv.classList.add("add-workspace");
                addWorkspaceDiv.id = "addWorkspace";

                const addWorkspaceBtn = document.createElement("button");
                addWorkspaceBtn.classList.add("btn", "add-workspace-btn");
                addWorkspaceBtn.id = "addWorkspaceBtn";
                addWorkspaceBtn.innerText = "Dodaj przestrzeń";

                addWorkspaceDiv.appendChild(addWorkspaceBtn);
                mainSpaceDiv.appendChild(listOfWorkspaceDiv);
                mainSpaceDiv.append(addWorkspaceDiv);
                
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

                    workspaceHeaderDiv.appendChild(workspaceHeaderH3);
                    workspaceDiv.appendChild(workspaceHeaderDiv);
                    workspaceDiv.appendChild(workspaceGoTo);
                    listOfWorkspaceDiv.appendChild(workspaceDiv);

                    workspaceDiv.addEventListener("click", async function onClick(){
                        let workspaceId = workspacesData.idUserWorkspace;
                        let apiUrlBoards = `${baseAddress}/api/Boards/${workspaceId}/board`;
                        const responseBoards = await fetch(apiUrlBoards, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if(responseBoards.status === 200){
                            const categoryNameSpan = document.getElementById("nameOfCategory");
                            categoryNameSpan.innerText = `Przestrzeń robocza: ${workspacesData.nameOfUserWorkspace}`;
                            const boardsData = await responseBoards.json();
                            listOfWorkspaceDiv.remove();
                            addWorkspaceDiv.remove();
                            const listOfBoardsDiv = document.createElement("div");
                            listOfBoardsDiv.classList.add("list-of-boards");
                            mainSpaceDiv.append(listOfBoardsDiv);

                            boardsData.forEach(boardsData =>{
                                const boardDiv = document.createElement("div");
                                boardDiv.classList.add("board");
                                boardDiv.id = boardsData.idBoard;

                                const boardHeaderDiv = document.createElement("div");
                                boardHeaderDiv.classList.add("board-header");

                                const boardHeaderH3 = document.createElement("h3");
                                boardHeaderH3.innerText = boardsData.nameOfBoard;

                                boardHeaderDiv.appendChild(boardHeaderH3);
                                boardDiv.appendChild(boardHeaderDiv);
                                listOfBoardsDiv.appendChild(boardDiv);

                                boardDiv.addEventListener("click", async function onClick(){
                                    // Poniższy mechanizm ma zostać użyty w etapie końcowym wyświetlania zadań w tablicach
                                    let apiUrlTasks = `${baseAddress}/api/Users/${loggedInUserId}/tasks`;
                                    const responseTasks = await fetch(apiUrlTasks, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    });
                                    if (responseTasks.status === 200) {
                                        const tasksData = await responseTasks.json();
                                        const categoryNameSpan = document.getElementById("nameOfCategory");
                                        categoryNameSpan.innerText = `Tablica: ${boardsData.nameOfBoard}`;
                                        listOfBoardsDiv.remove();
                                        const listOfTasksDiv = document.createElement("div");
                                        listOfTasksDiv.classList.add("list-of-tasks");
                                        const headerListDiv = document.createElement("div");
                                        headerListDiv.classList.add("header-list");
                                        const headerListH3 = document.createElement("h3");
                                        headerListH3.innerText = "Test"; 
                                        const itemsListDiv = document.createElement("div");
                                        itemsListDiv.classList.add("items-list");
                                        itemsListDiv.id = "itemsList";
                                        const addTaskDiv = document.createElement("div");
                                        addTaskDiv.classList.add("add-task");
                                        addTaskDiv.id = "addTask";
                                        const addTaskBtn = document.createElement("button");
                                        addTaskBtn.classList.add("btn", "add-task-btn");
                                        addTaskBtn.id = "addTaskBtn";
                                        addTaskBtn.innerText = "+";
                                        headerListDiv.appendChild(headerListH3);
                                        addTaskDiv.appendChild(addTaskBtn);
                                        listOfTasksDiv.appendChild(headerListDiv);
                                        listOfTasksDiv.appendChild(itemsListDiv);
                                        tasksData.forEach(tasksData => {
                                            const taskDiv = document.createElement("div");
                                            taskDiv.classList.add("task");
                                            taskDiv.id = tasksData.idTask;
                                    
                                            const taskColorBand = document.createElement("div");
                                            taskColorBand.classList.add("color-band");
                                            taskColorBand.style.backgroundColor = tasksData.colorBandTask;

                                            const nameTask = document.createElement("p");
                                            nameTask.innerText = tasksData.nameTask;
                                    
                                            const taskContent = document.createElement("div");
                                            taskContent.classList.add("task-content");

                                            const descTask = document.createElement("p");
                                            descTask.innerText = tasksData.descTask;
                                    
                                            taskColorBand.appendChild(nameTask);
                                            taskContent.appendChild(descTask);
                                            taskDiv.appendChild(taskColorBand);
                                            taskDiv.appendChild(taskContent);
                                            itemsListDiv.appendChild(taskDiv);
                                        });
                                        listOfTasksDiv.appendChild(addTaskDiv);
                                        mainSpaceDiv.appendChild(listOfTasksDiv);

                                        function ShowTaskDesc(task) {
                                            task.dataset.clickCount = 0;
                                    
                                            task.addEventListener('click', function onClick() {
                                                let clickCount = parseInt(this.dataset.clickCount, 10);
                                                clickCount++;
                                                this.dataset.clickCount = clickCount;
                                    
                                                if (clickCount % 2 === 1) {
                                                    this.style.backgroundColor = "red";
                                                }
                                                else {
                                                    this.style.backgroundColor = "lightgray";
                                                    task.dataset.clickCount = 0;
                                                }
                                                const elementId = this.id;
                                                console.log("Task id: " + elementId + ", Click Count: " + clickCount);
                                            });
                                        };
                                    
                                        function AddTaskPopOver(){
                                            const clickedAddTaskBtn = document.getElementById("addTaskBtn");
                                            let popOver, popOverContentInputText, popOverContentTextarea, popOverContentInputColor;
                                            let taskId = 0;
                                    
                                            clickedAddTaskBtn.addEventListener("click", () =>{
                                                const popOverCheckExist = document.getElementById("popoverBlock");
                                                if(popOverCheckExist !== null){
                                                    console.log("test");
                                                }
                                                else{
                                                    popOver = document.createElement("div");
                                                    popOver.classList.add("popover");
                                                    popOver.id = ("popoverBlock");
                                            
                                                    const popOverHeader = document.createElement("div");
                                                    popOverHeader.classList.add("popover-header");
                                                    const popOverHeaderTitle = document.createElement("p");
                                                    popOverHeaderTitle.textContent = "Dodaj zadanie";
                                                    popOverHeader.appendChild(popOverHeaderTitle);
                                            
                                                    const popOverContent = document.createElement("div");
                                                    popOverContent.classList.add("popover-content");
                                                    const popOverContentLabelInputText = document.createElement("label");
                                                    popOverContentLabelInputText.htmlFor = "addTaskInputText";
                                                    popOverContentLabelInputText.textContent = "Tytuł zadania:"
                                                    popOverContentInputText = document.createElement("input");
                                                    popOverContentInputText.id = "addTaskInputText";
                                                    popOverContentInputText.name = "input";
                                                    popOverContentInputText.type = "text";
                                                    popOverContentInputText.placeholder = "Tytuł zadania...";
                                                    popOverContentInputText.maxLength = "100";
                                                    popOverContentInputText.autofocus = true;
                                                    popOverContentInputText.required = true;
                                                    const popOverContentLabelTextarea = document.createElement("label");
                                                    popOverContentLabelTextarea.htmlFor = "addTaskTextarea";
                                                    popOverContentLabelTextarea.textContent = "Opis zadania:";
                                                    popOverContentTextarea = document.createElement("textarea");
                                                    popOverContentTextarea.id = "addTaskTextarea";
                                                    popOverContentTextarea.name = "textarea";
                                                    popOverContentTextarea.placeholder = "Opisz zadanie...";
                                                    popOverContentTextarea.maxLength = "100";
                                                    popOverContentTextarea.rows = "5";
                                                    popOverContentTextarea.required = true;
                                                    const popOverContentLabelInputColor = document.createElement("label");
                                                    popOverContentLabelInputColor.htmlFor = "addTaskInputColor";
                                                    popOverContentLabelInputColor.textContent = "Wybierz kolor okładki:";
                                                    popOverContentInputColor = document.createElement("input");
                                                    popOverContentInputColor.type = "color";
                                                    popOverContentInputColor.id = "addTaskInputColor";
                                                    popOverContentInputColor.name = "inputColor";
                                                    popOverContentInputColor.required = true;
                                                    popOverContent.appendChild(popOverContentLabelInputText);
                                                    popOverContent.appendChild(popOverContentInputText);
                                                    popOverContent.appendChild(popOverContentLabelTextarea);
                                                    popOverContent.appendChild(popOverContentTextarea);
                                                    popOverContent.appendChild(popOverContentLabelInputColor);
                                                    popOverContent.appendChild(popOverContentInputColor);
                                            
                                                    const popOverBtns = document.createElement("div");
                                                    popOverBtns.classList.add("popover-btns");
                                                    const popOverBtnOk = document.createElement("button")
                                                    popOverBtnOk.id = "popOverBtnOk"
                                                    popOverBtnOk.textContent = "OK";
                                                    const popOverBtnCancel = document.createElement("button");
                                                    popOverBtnCancel.id = "popOverBtnCancel"
                                                    popOverBtnCancel.textContent = "CANCEL";
                                                    popOverBtns.appendChild(popOverBtnOk);
                                                    popOverBtns.appendChild(popOverBtnCancel);
                                            
                                                    popOver.appendChild(popOverHeader);
                                                    popOver.appendChild(popOverContent);
                                                    popOver.appendChild(popOverBtns);
                                            
                                                    document.body.appendChild(popOver);
                                    
                                                    clickedAddTaskBtn.disabled = true;
                                                    clickedAddTaskBtn.style.pointerEvents = "none";
                                                }
                                                
                                                const clickedAddTaskBtnCancel = document.getElementById("popOverBtnCancel");
                                                clickedAddTaskBtnCancel.addEventListener("click", () => {
                                                    clickedAddTaskBtn.disabled = false;
                                                    clickedAddTaskBtn.style.pointerEvents = "auto";
                                                    popOver.remove();
                                                });
                                    
                                                const clickedAddTaskBtnOk = document.getElementById("popOverBtnOk");
                                                clickedAddTaskBtnOk.addEventListener("click", () => {
                                                    let taskDiv = "";
                                                    let popOverContentInputTextValue = popOverContentInputText.value.trim();
                                                    let popOverContentTextareaValue = popOverContentTextarea.value.trim();
                                                    let popOverContentInputColorValue = popOverContentInputColor.value;
                                                    // Konwersja RGB do HEX w celu przechowywania w bazie danych informacji o wybranym kolorze
                                                    let ConvertedInputColorValue = popOverContentInputColorValue.toString(16);
                                                    if(popOverContentTextareaValue=="" || popOverContentInputTextValue==""){
                                                        alert("Uzupełnij brakujące pola.")
                                                    }
                                                    else{
                                                        let itemsList = document.querySelector(".items-list");
                                    
                                                        taskDiv = document.createElement("div");
                                                        taskDiv.classList.add("task");
                                                        taskId++;
                                                        taskDiv.id = "task-"+taskId;
                                                    
                                                        const taskColorBand = document.createElement("div");
                                                        taskColorBand.classList.add("color-band");
                                                        taskColorBand.style.backgroundColor = popOverContentInputColorValue;
                                                    
                                                        const taskContent = document.createElement("div");
                                                        taskContent.classList.add("task-content");
                                        
                                                        const p = document.createElement("p");
                                                        p.innerText = popOverContentInputTextValue;
                                                    
                                                        taskContent.appendChild(p);
                                                        taskDiv.appendChild(taskColorBand);
                                                        taskDiv.appendChild(taskContent);
                                                        itemsList.appendChild(taskDiv);
                                    
                                                        // addTask(popOverContentInputTextValue, popOverContentTextareaValue, ConvertedInputColorValue)
                                                        // .then((success) => {
                                                        //     if (success) {
                                                        //         clickedAddTaskBtn.disabled = false;
                                                        //         clickedAddTaskBtn.style.pointerEvents = "auto";
                                                        //         popOver.remove();
                                                        //     }
                                                        //     else {
                                                        //         alert("Dodawanie zadania nieudane!");
                                                        //     }
                                                        // });

                                                        async function addTask(name, desc, color){
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
                                                                    clickedAddTaskBtn.disabled = false;
                                                                    clickedAddTaskBtn.style.pointerEvents = "auto";
                                                                    popOver.remove();
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

                                                        addTask(popOverContentInputTextValue, popOverContentTextareaValue, ConvertedInputColorValue)
                                    
                                                    }
                                                    ShowTaskDesc(taskDiv);
                                                });
                                            });
                                        };
                                        AddTaskPopOver();
                                    }            
                                    else if(responseTasks.status === 400){
                                        console.log("Bad Request: Invalid URL.");
                                    }
                                });
                            })
                        }
                    })
                });
            }
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