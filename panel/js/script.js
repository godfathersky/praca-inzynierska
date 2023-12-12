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

        let mainSpaceDiv = document.querySelector("#mainSpace");
        const categoryNameSpan = document.querySelector("#path");

        if (responseUserID.ok) {
            const userData = await responseUserID.json();
            const usernameSpan = document.querySelector("#usernameSpan");
            usernameSpan.innerText = "Cześć, "+userData.username;
            loggedInUserId = userData.idUser;

            let apiUrlWorkspaces = `${baseAddress}/api/UserWorkspace/${loggedInUserId}/workspace`;
            const responseWorkspaces = await fetch(apiUrlWorkspaces, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(responseWorkspaces.ok){

                // Aktualizacja adresu URL
                
                // let currentUrl = new URL(window.location.href);
                // console.log(currentUrl);

                // currentUrl.searchParams.set("userId", loggedInUserId);
                // window.history.pushState({}, "", currentUrl);
                // console.log(currentUrl);

                const workspacesData = await responseWorkspaces.json();
                mainSpaceDiv = document.querySelector("#mainSpace");
                const listOfWorkspace = document.createElement("ol");
                let listOfWorkspaceClasses = ["flex flex-row flex-wrap max-[640px]:justify-center max-[640px]:text-sm sm:justify-center md:justify-start list-none"];
                listOfWorkspace.className = listOfWorkspaceClasses;
                listOfWorkspace.id = "listOfWorkspace";
                mainSpaceDiv.appendChild(listOfWorkspace);
                categoryNameSpan.innerText = "Przestrzenie robocze";

                workspacesData.forEach(workspacesData => {
                    const itemListOfWorkspace = document.createElement("li");
                    let itemListOfWorkspaceClasses = ["h-24 max-[640px]:w-2/5 sm:w-2/5 md:w-1/5 font-bold bg-gray-400 mr-6 mb-6 rounded-lg hover:scale-105 duration-200 ease-in-out break-words"];
                    itemListOfWorkspace.className = itemListOfWorkspaceClasses;
                    itemListOfWorkspace.id = workspacesData.idUserWorkspace;

                    const btnItemListOfWorkspace = document.createElement("button");
                    let btnItemListOfWorkspaceClasses = ["w-full h-full flex justify-start px-4 pt-2"];
                    btnItemListOfWorkspace.className = btnItemListOfWorkspaceClasses;

                    const spanBtnItemListOfWorkspace = document.createElement("p");
                    let spanBtnItemListOfWorkspaceClasses = ["break-all"];
                    spanBtnItemListOfWorkspace.className = spanBtnItemListOfWorkspaceClasses;
                    spanBtnItemListOfWorkspace.innerText = workspacesData.nameOfUserWorkspace;
                
                    btnItemListOfWorkspace.appendChild(spanBtnItemListOfWorkspace);
                    itemListOfWorkspace.appendChild(btnItemListOfWorkspace);
                    listOfWorkspace.append(itemListOfWorkspace);

                    itemListOfWorkspace.addEventListener("click", async function onClick(){
                        let workspaceId = workspacesData.idUserWorkspace;
                        let apiUrlBoards = `${baseAddress}/api/Boards/${workspaceId}/board`;
                        const responseBoards = await fetch(apiUrlBoards, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });
                        if(responseBoards.ok){
                            categoryNameSpan.innerText += ` >> ${workspacesData.nameOfUserWorkspace}`;
                            const boardsData = await responseBoards.json();
                            listOfWorkspace.remove();

                            const listOfBoards = document.createElement("ol");
                            let listOfBoardsClasses = ["flex flex-row flex-wrap max-[640px]:justify-center max-[640px]:text-sm sm:justify-center md:justify-start list-none"];
                            listOfBoards.className = listOfBoardsClasses;
                            listOfBoards.id = "listOfBoards";

                            mainSpaceDiv.appendChild(listOfBoards);

                            boardsData.forEach(boardsData =>{
                                const itemListOfBoards = document.createElement("li");
                                let itemListOfBoardsClasses = ["h-24 max-[640px]:w-2/5 sm:w-2/5 md:w-1/5 font-bold bg-gray-400 mr-6 mb-6 rounded-lg hover:scale-105 duration-200 ease-in-out"];
                                itemListOfBoards.className = itemListOfBoardsClasses;
                                itemListOfBoards.id = boardsData.idBoard;

                                const btnItemListOfBoards = document.createElement("button");
                                let btnItemListOfBoardsClasses = ["w-full h-full flex justify-start px-4 pt-2"];
                                btnItemListOfBoards.className = btnItemListOfBoardsClasses;

                                const spanBtnItemListOfBoards = document.createElement("p");
                                let spanBtnItemListOfBoardsClasses = ["break-all"];
                                spanBtnItemListOfBoards.className = spanBtnItemListOfBoardsClasses;
                                spanBtnItemListOfBoards.innerText = boardsData.nameOfBoard;

                                btnItemListOfBoards.appendChild(spanBtnItemListOfBoards);
                                itemListOfBoards.appendChild(btnItemListOfBoards);
                                listOfBoards.append(itemListOfBoards);

                                itemListOfBoards.addEventListener("click", async function onClick(){

                                    let apiUrlTaskStatuses = `${baseAddress}/api/Utasks/status`;
                                    const responseTaskStatuses = await fetch(apiUrlTaskStatuses, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    });

                                    if(responseTaskStatuses.ok){
                                        const taskStatusesData = await responseTaskStatuses.json();

                                        mainSpaceDiv.classList.add("flex");
                                        mainSpaceDiv.classList.add("flex-row");

                                        taskStatusesData.forEach(taskStatusesData => {
                                            const taskStatusList = document.createElement("div");
                                            let listOfTaskStatusListClasses = ["w-1/4 h-full bg-green-100 mr-5 flex flex-col flex-wrap justify-start list-none rounded-lg"];
                                            taskStatusList.className = listOfTaskStatusListClasses;
                                            taskStatusList.id = taskStatusesData.idStatus;

                                            const taskStatusListDivTitle = document.createElement("div");
                                            let listOfTaskStatusListDivTitleClasses = ["w-full h-1/10 flex items-center font-bold bg-gray-400 mr-6 px-4 rounded-t-lg pointer-events-none"];
                                            taskStatusListDivTitle.className = listOfTaskStatusListDivTitleClasses;

                                            const taskStatusListSpanTitle = document.createElement("span");
                                            taskStatusListSpanTitle.innerText = taskStatusesData.nameStatus;

                                            const listOfTasks = document.createElement("ol");
                                            let listOfTasksClasses = ["w-full h-[calc(100%-15%)] flex flex-col items-center pt-5 overflow-y-auto max-[640px]:justify-center max-[640px]:text-sm sm:justify-center md:justify-start list-none list-of-tasks"];
                                            listOfTasks.className = listOfTasksClasses;
                                            listOfTasks.id = `listOfTask-${taskStatusesData.idStatus}`;

                                            const addTaskDiv = document.createElement("div");
                                            let addTaskDivClasses = ["w-full h-1/20 flex items-center font-bold bg-gray-400 rounded-b-lg"];
                                            addTaskDiv.className = addTaskDivClasses;

                                            const addTaskBtn = document.createElement("button");
                                            let addTaskBtnClasses = ["w-full h-full flex justify-center items-center hover:text-white duration-300 ease-in-out"];
                                            addTaskBtn.id = "addTaskBtn";
                                            addTaskBtn.className = addTaskBtnClasses;
                                            addTaskBtn.innerText = "Dodaj zadanie";

                                            taskStatusListDivTitle.appendChild(taskStatusListSpanTitle);
                                            taskStatusList.appendChild(taskStatusListDivTitle);
                                            taskStatusList.appendChild(listOfTasks);
                                            addTaskDiv.appendChild(addTaskBtn);
                                            taskStatusList.appendChild(addTaskDiv);
                                            mainSpaceDiv.appendChild(taskStatusList);
                                        });

                                            let selectedBoardId = boardsData.idBoard;
                                            let apiUrlTasks = `${baseAddress}/api/Utasks/${selectedBoardId}/task`;
                                            const responseTasks = await fetch(apiUrlTasks, {
                                                method: 'GET',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            });

                                        if (responseTasks.ok) {
                                            const tasksData = await responseTasks.json();
                                            categoryNameSpan.innerText += ` >> ${boardsData.nameOfBoard}`;
                                            listOfBoards.remove();

                                            const listToDo = document.getElementById("listOfTask-1");
                                            const listInProgress = document.getElementById("listOfTask-2");
                                            const listDone = document.getElementById("listOfTask-3");

                                            tasksData.forEach(tasksData => {
                                                let clickCount = parseInt(this.dataset.clickCount, 10);
                                                clickCount++;
                                                const itemListOfTasks = document.createElement("li");
                                                let itemListOfTasksClasses = ["w-4/5 h-20 bg-gray-400 mb-6 rounded-lg item break-words"];
                                                itemListOfTasks.className = itemListOfTasksClasses;
                                                itemListOfTasks.id = tasksData.idTask;
                                                itemListOfTasks.draggable = true;
                                                itemListOfTasks.style.cursor = "grab";
                                                itemListOfTasks.dataset.clickCount = 0;

                                                const itemListOfTaskColorBand = document.createElement("div");
                                                let itemListOfTaskColorBandClasses = ["w-full h-6 flex flex-col flex-wrap justify-start list-none rounded-t-lg"];
                                                itemListOfTaskColorBand.className = itemListOfTaskColorBandClasses;
                                                itemListOfTaskColorBand.style.backgroundColor = tasksData.colorBandTask;

                                                const itemListOfTaskContent = document.createElement("div");
                                                let itemListOfTaskContentClasses = ["w-full h-14 flex flex-col flex-wrap justify-start ml-2.5 mt-1 list-none rounded-b-lg"];
                                                itemListOfTaskContent.className = itemListOfTaskContentClasses;

                                                const itemListOfTaskContentParagraph = document.createElement("p");
                                                let itemListOfTaskContentParagraphClasses = ["break-all"];
                                                itemListOfTaskContentParagraph.className = itemListOfTaskContentParagraphClasses; 
                                                itemListOfTaskContentParagraph.innerText = tasksData.nameTask;

                                                itemListOfTaskContent.appendChild(itemListOfTaskContentParagraph);
                                                itemListOfTasks.appendChild(itemListOfTaskColorBand);
                                                itemListOfTasks.appendChild(itemListOfTaskContent);

                                                let taskStatusId = tasksData.idStatus;
                                                switch(taskStatusId){
                                                    case 1:
                                                        listToDo.appendChild(itemListOfTasks);
                                                        break;
                                                    case 2:
                                                        listInProgress.appendChild(itemListOfTasks);
                                                        break;
                                                    case 3:
                                                        listDone.appendChild(itemListOfTasks);
                                                        break;
                                                    default:
                                                        console.log("Missing value of taskStatusId");
                                                }
                                            });

                                            // Drag and drop
                                            const draggables = document.querySelectorAll('.item');
                                            const containers = document.querySelectorAll('.list-of-tasks');

                                            draggables.forEach(draggable => {
                                                draggable.addEventListener('dragstart', () => {
                                                    draggable.classList.add('dragging');
                                                });

                                                draggable.addEventListener('dragend', () => {
                                                    draggable.classList.remove('dragging');
                                                });
                                            });

                                            containers.forEach(container => {
                                                container.addEventListener('dragover', e => {
                                                    e.preventDefault();
                                                    const afterElement = getDragAfterElement(container, e.clientY);
                                                    const draggable = document.querySelector('.dragging');
                                                    if (afterElement == null) {
                                                        container.appendChild(draggable);
                                                    } else {
                                                        container.insertBefore(draggable, afterElement);
                                                    }
                                                });
                                            });

                                            function getDragAfterElement(container, y) {
                                                const draggableElements = [...container.querySelectorAll('.item:not(.dragging)')];

                                                return draggableElements.reduce((closest, child) => {
                                                    const box = child.getBoundingClientRect();
                                                    const offset = y - box.top - box.height / 2;
                                                    if (offset < 0 && offset > closest.offset) {
                                                        return { offset: offset, element: child };
                                                    } else {
                                                        return closest;
                                                    }
                                                }, { offset: Number.NEGATIVE_INFINITY }).element;
                                            }

                                            // Pomyśleć nad działaniem tej funkcji
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
                                        
                                                clickedAddTaskBtn.addEventListener("click", () =>{
                                                    const popOverCheckExist = document.getElementById("popoverBlock");
                                                    if(popOverCheckExist !== null){
                                                        console.log("test");
                                                    }
                                                    else{
                                                        popOver = document.createElement("div");
                                                        let popOverClasses = ["w-4/12 h-2/5 flex flex-col justify-center items-center absolute bg-white text-black shadow-lg rounded-lg z-10"];
                                                        popOver.className = popOverClasses;
                                                        popOver.id = ("popoverBlock");
                                                
                                                        const popOverHeader = document.createElement("div");
                                                        let popOverHeaderClasses = ["w-full h-1/6 flex items-center font-bold px-2.5"];
                                                        popOverHeader.className = popOverHeaderClasses;
                                                        const popOverHeaderTitle = document.createElement("p");
                                                        popOverHeaderTitle.classList.add("m-0");
                                                        popOverHeaderTitle.textContent = "Dodaj zadanie";
                                                        popOverHeader.appendChild(popOverHeaderTitle);
                                                
                                                        const popOverContent = document.createElement("div");
                                                        let popOverContentClasses = ["w-full h-4/6 flex flex-col justify-evenly px-2.5"];
                                                        popOverContent.className = popOverContentClasses;
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
                                                        let popOverBtnsClasses = ["w-full h-1/6 flex justify-around p-2.5"];
                                                        popOverBtns.className = popOverBtnsClasses;
                                                        let popOverBtnsChildrenClasses = ["w-1/3 outline-none border-none font-bold rounded hover:text-white duration-200 ease-in-out"];
                                                        const popOverBtnOk = document.createElement("button");
                                                        popOverBtnOk.className = popOverBtnsChildrenClasses;
                                                        popOverBtnOk.classList.add("bg-green-800","hover:bg-green-500");
                                                        popOverBtnOk.id = "popOverBtnOk"
                                                        popOverBtnOk.textContent = "OK";
                                                        const popOverBtnCancel = document.createElement("button");
                                                        popOverBtnCancel.className = popOverBtnsChildrenClasses;
                                                        popOverBtnCancel.classList.add("bg-red","hover:bg-black");
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
                                                        let itemListOfTasks = "";
                                                        let popOverContentInputTextValue = popOverContentInputText.value.trim();
                                                        let popOverContentTextareaValue = popOverContentTextarea.value.trim();
                                                        let popOverContentInputColorValue = popOverContentInputColor.value;
                                                        // Konwersja RGB do HEX w celu przechowywania w bazie danych informacji o wybranym kolorze
                                                        let ConvertedInputColorValue = popOverContentInputColorValue.toString(16);
                                                        if(popOverContentTextareaValue=="" || popOverContentInputTextValue==""){
                                                            alert("Uzupełnij brakujące pola.")
                                                        }
                                                        else{
                                                            let itemsList = document.getElementById("listOfTask-1");
                                        
                                                            itemListOfTasks = document.createElement("li");
                                                            let itemListOfTasksClasses = ["w-4/5 h-20 bg-gray-400 mb-6 rounded-lg item break-words"];
                                                            itemListOfTasks.className = itemListOfTasksClasses;
                                                            itemListOfTasks.id = tasksData.idTask;
                                                            itemListOfTasks.draggable = true;
                                                            itemListOfTasks.style.cursor = "grab";

                                                            const itemListOfTaskColorBand = document.createElement("div");
                                                            let itemListOfTaskColorBandClasses = ["w-full h-6 flex flex-col flex-wrap justify-start list-none rounded-t-lg"];
                                                            itemListOfTaskColorBand.className = itemListOfTaskColorBandClasses;
                                                            itemListOfTaskColorBand.style.backgroundColor = popOverContentInputColorValue;

                                                            const itemListOfTaskContent = document.createElement("div");
                                                            let itemListOfTaskContentClasses = ["w-full h-14 flex flex-col flex-wrap justify-start ml-2.5 mt-1 list-none rounded-b-lg"];
                                                            itemListOfTaskContent.className = itemListOfTaskContentClasses;

                                                            const itemListOfTaskContentParagraph = document.createElement("p");
                                                            let itemListOfTaskContentParagraphClasses = ["break-all"];
                                                            itemListOfTaskContentParagraph.className = itemListOfTaskContentParagraphClasses; 
                                                            itemListOfTaskContentParagraph.innerText = popOverContentInputTextValue;

                                                            itemListOfTaskContent.appendChild(itemListOfTaskContentParagraph);
                                                            itemListOfTasks.appendChild(itemListOfTaskColorBand);
                                                            itemListOfTasks.appendChild(itemListOfTaskContent);

                                                            itemsList.appendChild(itemListOfTasks);

                                                            async function addTask(name, desc, color){
                                                                try {
                                                                    const response = await fetch(`https://localhost:7121/api/Utasks/${loggedInUserId}/${selectedBoardId}/addtask`, {
                                                                        method: 'POST',
                                                                        headers: {
                                                                        'Content-Type': 'application/json',
                                                                        },
                                                                        body: JSON.stringify({
                                                                            NameTask: name,
                                                                            DescTask: desc,
                                                                            ColorBandTask: color,
                                                                            IdBoard: selectedBoardId
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
                                                        ShowTaskDesc(itemListOfTasks);
                                                    });
                                                });
                                            };
                                            AddTaskPopOver();
                                        }            
                                        else if(responseTasks.status === 400){
                                            console.log("Bad Request: Invalid URL.");
                                        }
                                    }
                                    else if(responseTaskStatuses.status === 400){
                                        console.log("Bad Request: Invalid URL.");
                                    }
                                });
                            })

                            // Paste here
                            function AddBoardPopOver(){
                                const itemBtnAddBoard = document.createElement("li");
                                let itemBtnAddBoardClasses = ["h-24 sm:w-2/5 md:w-1/5 flex justify-center items-center bg-gray-400 hover:bg-white duration-200 ease-in-out mr-6 rounded"];
                                itemBtnAddBoard.className = itemBtnAddBoardClasses;
                
                                const btnAddBoard = document.createElement("button");
                                btnAddBoard.id = "addBoardBtn";
                                let btnAddBoardClasses = ["w-full h-full flex justify-center items-center px-4 pt-2"];
                                btnAddBoard.className = btnAddBoardClasses;
                
                                const spanBtnAddBoard = document.createElement("span");
                                spanBtnAddBoard.innerText = "Utwórz nową tablicę";
                                spanBtnAddBoard.classList.add("text-center");
                
                                itemBtnAddBoard.appendChild(btnAddBoard);
                                btnAddBoard.appendChild(spanBtnAddBoard);
                                listOfBoards.appendChild(itemBtnAddBoard);
            
                                const clickedAddBoardBtn = document.getElementById("addBoardBtn");
                                let popOver, popOverContentInputText;
                                let boardId = 0;
                        
                                clickedAddBoardBtn.addEventListener("click", () =>{
                                    const popOverCheckExist = document.getElementById("popoverBlock");
                                    if(popOverCheckExist !== null){
                                        console.error("popoverBlock already exists");
                                    }
                                    else{
                                        popOver = document.createElement("div");
                                        let popOverClasses = ["w-4/12 h-2/5 flex flex-col justify-center items-center absolute bg-white text-black shadow-lg rounded-lg z-10"];
                                        popOver.className = popOverClasses;
                                        popOver.id = ("popoverBlock");
                                
                                        const popOverHeader = document.createElement("div");
                                        let popOverHeaderClasses = ["w-full h-1/6 flex items-center font-bold px-2.5"];
                                        popOverHeader.className = popOverHeaderClasses;
                                        const popOverHeaderTitle = document.createElement("p");
                                        popOverHeaderTitle.classList.add("m-0");
                                        popOverHeaderTitle.textContent = "Dodaj tablicę";
                                        popOverHeader.appendChild(popOverHeaderTitle);
                                
                                        const popOverContent = document.createElement("div");
                                        let popOverContentClasses = ["w-full h-4/6 flex flex-col justify-evenly px-2.5"];
                                        popOverContent.className = popOverContentClasses;
                                        const popOverContentLabelInputText = document.createElement("label");
                                        popOverContentLabelInputText.htmlFor = "addBoardInputText";
                                        popOverContentLabelInputText.textContent = "Nazwa tablicy:"
                                        popOverContentInputText = document.createElement("input");
                                        popOverContentInputText.id = "addBoardInputText";
                                        popOverContentInputText.name = "input";
                                        popOverContentInputText.type = "text";
                                        popOverContentInputText.placeholder = "Nazwa tablicy...";
                                        popOverContentInputText.maxLength = "100";
                                        popOverContentInputText.autofocus = true;
                                        popOverContentInputText.required = true;
                                        let popOverContentInputTextClasses = ["h-1/10 p-2.5"];
                                        popOverContentInputText.className = popOverContentInputTextClasses;
                                        popOverContent.appendChild(popOverContentLabelInputText);
                                        popOverContent.appendChild(popOverContentInputText);
                                
                                        const popOverBtns = document.createElement("div");
                                        let popOverBtnsClasses = ["w-full h-1/6 flex justify-around p-2.5"];
                                        popOverBtns.className = popOverBtnsClasses;
                                        let popOverBtnsChildrenClasses = ["w-1/3 outline-none border-none font-bold rounded hover:text-white duration-200 ease-in-out"];
                                        const popOverBtnOk = document.createElement("button");
                                        popOverBtnOk.className = popOverBtnsChildrenClasses;
                                        popOverBtnOk.classList.add("bg-green-800","hover:bg-green-500");
                                        popOverBtnOk.id = "popOverBtnOk"
                                        popOverBtnOk.textContent = "OK";
                                        const popOverBtnCancel = document.createElement("button");
                                        popOverBtnCancel.className = popOverBtnsChildrenClasses;
                                        popOverBtnCancel.classList.add("bg-red","hover:bg-black");
                                        popOverBtnCancel.id = "popOverBtnCancel"
                                        popOverBtnCancel.textContent = "CANCEL";
                                        popOverBtns.appendChild(popOverBtnOk);
                                        popOverBtns.appendChild(popOverBtnCancel);
                                
                                        popOver.appendChild(popOverHeader);
                                        popOver.appendChild(popOverContent);
                                        popOver.appendChild(popOverBtns);
                                
                                        document.body.appendChild(popOver);
                        
                                        clickedAddBoardBtn.disabled = true;
                                        clickedAddBoardBtn.style.pointerEvents = "none";
                                    }
                                    
                                    const clickedAddBoardBtnCancel = document.getElementById("popOverBtnCancel");
                                    clickedAddBoardBtnCancel.addEventListener("click", () => {
                                        clickedAddBoardBtn.disabled = false;
                                        clickedAddBoardBtn.style.pointerEvents = "auto";
                                        popOver.remove();
                                    });
                        
                                    const clickedAddBoardBtnOk = document.getElementById("popOverBtnOk");
                                    clickedAddBoardBtnOk.addEventListener("click", () => {
                                        let boardDiv = "";
                                        let popOverContentInputTextValue = popOverContentInputText.value.trim();
                                        if(popOverContentInputTextValue==""){
                                            alert("Uzupełnij brakujące pola.")
                                        }
                                        else{
                                            let itemsList = document.getElementById(".list-of-boards");
                        
                                            boardDiv = document.createElement("div");
                                            boardDiv.classList.add("board");
                                            boardId++;
                                            boardDiv.id = "board-"+boardId;
                                        
                                            const boardContent = document.createElement("div");
                                            boardContent.classList.add("board-content");
                            
                                            const h3 = document.createElement("h3");
                                            h3.innerText = popOverContentInputTextValue;
                                        
                                            boardContent.appendChild(h3);
                                            boardDiv.appendChild(boardContent);
                                            itemsList.appendChild(boardDiv);
            
                                            async function addBoard(name){
                                                try {
                                                    const response = await fetch(`https://localhost:7121/api/Boards/${workspaceId}/addboard`, {
                                                        method: 'POST',
                                                        headers: {
                                                        'Content-Type': 'application/json',
                                                        },
                                                        body: JSON.stringify({
                                                        nameOfBoard: name
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
                                                        clickedAddBoardBtn.disabled = false;
                                                        clickedAddBoardBtn.style.pointerEvents = "auto";
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
            
                                            addBoard(popOverContentInputTextValue);
                        
                                        }
                                    });
                                });
                            };
                            AddBoardPopOver();
                        }
                    })
                });

                function AddWorkspacePopOver(){
                    const itemBtnAddWorkspace = document.createElement("li");
                    let itemBtnAddWorkspaceClasses = ["h-24 sm:w-2/5 md:w-1/5 flex justify-center items-center bg-gray-400 hover:bg-white duration-200 ease-in-out mr-6 rounded"];
                    itemBtnAddWorkspace.className = itemBtnAddWorkspaceClasses;
    
                    const btnAddWorkspace = document.createElement("button");
                    btnAddWorkspace.id = "addWorkspaceBtn";
                    let btnAddWorkspaceClasses = ["w-full h-full flex justify-center items-center px-4 pt-2"];
                    btnAddWorkspace.className = btnAddWorkspaceClasses;
    
                    const spanBtnAddWorkspace = document.createElement("span");
                    spanBtnAddWorkspace.innerText = "Utwórz nową przestrzeń roboczą";
                    spanBtnAddWorkspace.classList.add("text-center");
    
                    itemBtnAddWorkspace.appendChild(btnAddWorkspace);
                    btnAddWorkspace.appendChild(spanBtnAddWorkspace);
                    listOfWorkspace.appendChild(itemBtnAddWorkspace);

                    const clickedAddWorkspaceBtn = document.getElementById("addWorkspaceBtn");
                    let popOver, popOverContentInputText;
                    let workspaceId = 0;
            
                    clickedAddWorkspaceBtn.addEventListener("click", () =>{
                        const popOverCheckExist = document.getElementById("popoverBlock");
                        if(popOverCheckExist !== null){
                            console.error("popoverBlock already exists");
                        }
                        else{
                            popOver = document.createElement("div");
                            let popOverClasses = ["w-4/12 h-2/5 flex flex-col justify-center items-center absolute bg-white text-black shadow-lg rounded-lg z-10"];
                            popOver.className = popOverClasses;
                            popOver.id = "popoverBlock";
                    
                            const popOverHeader = document.createElement("div");
                            let popOverHeaderClasses = ["w-full h-1/6 flex items-center font-bold px-2.5"];
                            popOverHeader.className = popOverHeaderClasses;
                            const popOverHeaderTitle = document.createElement("p");
                            popOverHeaderTitle.classList.add("m-0");
                            popOverHeaderTitle.textContent = "Dodaj przestrzeń roboczą";
                            popOverHeader.appendChild(popOverHeaderTitle);
                    
                            const popOverContent = document.createElement("div");
                            let popOverContentClasses = ["w-full h-4/6 flex flex-col justify-evenly px-2.5"];
                            popOverContent.className = popOverContentClasses;
                            const popOverContentLabelInputText = document.createElement("label");
                            popOverContentLabelInputText.htmlFor = "addWorkspaceInputText";
                            popOverContentLabelInputText.textContent = "Nazwa przestrzeni roboczej:"
                            popOverContentInputText = document.createElement("input");
                            popOverContentInputText.id = "addWorkspaceInputText";
                            popOverContentInputText.name = "input";
                            popOverContentInputText.type = "text";
                            popOverContentInputText.placeholder = "Nazwa przestrzeni roboczej...";
                            popOverContentInputText.maxLength = "100";
                            popOverContentInputText.autofocus = true;
                            popOverContentInputText.required = true;
                            let popOverContentInputTextClasses = ["h-1/10 p-2.5"];
                            popOverContentInputText.className = popOverContentInputTextClasses;
                            popOverContent.appendChild(popOverContentLabelInputText);
                            popOverContent.appendChild(popOverContentInputText);
                    
                            const popOverBtns = document.createElement("div");
                            let popOverBtnsClasses = ["w-full h-1/6 flex justify-around p-2.5"];
                            popOverBtns.className = popOverBtnsClasses;
                            let popOverBtnsChildrenClasses = ["w-1/3 outline-none border-none font-bold rounded hover:text-white duration-200 ease-in-out"];
                            const popOverBtnOk = document.createElement("button");
                            popOverBtnOk.className = popOverBtnsChildrenClasses;
                            popOverBtnOk.classList.add("bg-green-800","hover:bg-green-500");
                            popOverBtnOk.id = "popOverBtnOk"
                            popOverBtnOk.textContent = "OK";
                            const popOverBtnCancel = document.createElement("button");
                            popOverBtnCancel.className = popOverBtnsChildrenClasses;
                            popOverBtnCancel.classList.add("bg-red","hover:bg-black");
                            popOverBtnCancel.id = "popOverBtnCancel"
                            popOverBtnCancel.textContent = "CANCEL";
                            popOverBtns.appendChild(popOverBtnOk);
                            popOverBtns.appendChild(popOverBtnCancel);
                    
                            popOver.appendChild(popOverHeader);
                            popOver.appendChild(popOverContent);
                            popOver.appendChild(popOverBtns);
                    
                            document.body.appendChild(popOver);
            
                            clickedAddWorkspaceBtn.disabled = true;
                            clickedAddWorkspaceBtn.style.pointerEvents = "none";
                        }
                        
                        const clickedAddWorkspaceBtnCancel = document.getElementById("popOverBtnCancel");
                        clickedAddWorkspaceBtnCancel.addEventListener("click", () => {
                            clickedAddWorkspaceBtn.disabled = false;
                            clickedAddWorkspaceBtn.style.pointerEvents = "auto";
                            popOver.remove();
                        });
            
                        const clickedAddWorkspaceBtnOk = document.getElementById("popOverBtnOk");
                        clickedAddWorkspaceBtnOk.addEventListener("click", () => {
                            let itemListOfWorkspace = "";
                            let popOverContentInputTextValue = popOverContentInputText.value.trim();
                            if(popOverContentInputTextValue==""){
                                alert("Uzupełnij brakujące pola.")
                            }
                            else{
                                itemListOfWorkspace = document.createElement("li");
                                let itemListOfWorkspaceClasses = ["h-24 max-[640px]:w-2/5 sm:w-2/5 md:w-1/5 font-bold bg-gray-400 mr-6 mb-6 rounded hover:scale-105 duration-200 ease-in-out"];
                                itemListOfWorkspace.className = itemListOfWorkspaceClasses;
                                itemListOfWorkspace.id = "workspace-"+workspaceId;

                                const btnItemListOfWorkspace = document.createElement("button");
                                let btnItemListOfWorkspaceClasses = ["w-full h-full flex justify-start px-4 pt-2"];
                                btnItemListOfWorkspace.className = btnItemListOfWorkspaceClasses;

                                const spanBtnItemListOfWorkspace = document.createElement("span");
                                spanBtnItemListOfWorkspace.innerText = popOverContentInputTextValue;

                                btnItemListOfWorkspace.appendChild(spanBtnItemListOfWorkspace);
                                itemListOfWorkspace.appendChild(btnItemListOfWorkspace);

                                let itemsListOfWorkspace = document.querySelector("#listOfWorkspace");
                                let lastItem = itemsListOfWorkspace.lastElementChild;
                                itemsListOfWorkspace.insertBefore(itemListOfWorkspace, lastItem);

                                async function addWorkspace(name){
                                    try {
                                        const response = await fetch(`https://localhost:7121/api/UserWorkspace/${loggedInUserId}/addworkspace`, {
                                            method: 'POST',
                                            headers: {
                                            'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                            NameOfUserWorkspace: name
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
                                            clickedAddWorkspaceBtn.disabled = false;
                                            clickedAddWorkspaceBtn.style.pointerEvents = "auto";
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

                                addWorkspace(popOverContentInputTextValue);
            
                            }
                        });
                    });
                };
                AddWorkspacePopOver();
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
        location.href="/home";
    }
}

getData();

