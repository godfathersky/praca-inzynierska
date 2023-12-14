document.addEventListener('DOMContentLoaded', function() {
    const baseAddress = 'https://localhost:7121';
    let loggedInUserId, workspaceId, tasksData, boardsData, boardId;
    let mainSpaceDiv = document.querySelector("#mainSpace");
    let categoryNameSpan = document.querySelector("#path");
    
    async function getLoggedInUserId() {
        const response = await fetch(`${baseAddress}/api/Users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    
        if(response.ok){
            const userData = await response.json();
            loggedInUserId = userData.idUser;
        
            const usernameSpan = document.querySelector("#usernameSpan");
            usernameSpan.innerText = "Cześć, " + userData.username;
            await getUserWorkspaces();
        }
        else if(response.status === 401){
            location.href = "/home";
            alert('Unauthorized: Token is missing or invalid.');
        }
        else if(response.status === 400){
            location.href = "/home";
            alert('Bad Request: Invalid token.');
        }
        else{
            location.href = "/home";
        }
    }
    
    async function getUserWorkspaces(){
        if (loggedInUserId) {
            mainSpaceDiv.innerHTML = "";
            const response = await fetch(`${baseAddress}/api/UserWorkspace/${loggedInUserId}/workspace`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.ok) {
                categoryNameSpan.innerText = "Przestrzenie robocze";

                const workspacesData = await response.json();

                workspacesData.forEach(workspace => {
                    workspace.type = "workspace";
                });

                displayListsItems(workspacesData);
                addPopover('workspace');
            }
            else {
                console.error('There was a problem with the fetch operation: ', error);
            }
        }
        else {
            console.error('Logged in user ID is undefined.');
        }
    }

    async function getUserBoards(){
        if (workspaceId) {
            mainSpaceDiv.innerHTML = "";
            mainSpaceDiv.classList.remove("flex");
            mainSpaceDiv.classList.remove("flex-row");
            const response = await fetch(`${baseAddress}/api/Boards/${workspaceId}/board`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.ok) {
                boardsData = await response.json();

                boardsData.forEach(board => {
                    board.type = "board";
                });

                displayListsItems(boardsData);
                addPopover('board');
            }
            else {
                console.error('There was a problem with the fetch operation: ', error);
            }
        }
        else {
            console.error('Workspace ID is undefined.');
        }
    }

    async function getUserListsOfTasks(){
        const response = await fetch(`${baseAddress}/api/Utasks/status`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(response.ok){
            const statusData = await response.json();
            displayListsOfTasks(statusData);
            getTasks(boardId);
            addPopoverTask();
        }
        else{
            console.error('There was a problem with the fetch operation: ', error);
        }
    }

    async function getTasks(boardId){
        if(boardId){
            const response = await fetch(`${baseAddress}/api/Utasks/${boardId}/task`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if(response.ok){
                tasksData = await response.json();
                displayTasks(tasksData);
            }
        }
        else{
            console.error('Selected board ID is undefined.');
        }
    }

    function displayListsItems(items){
        if(items && items.length > 0){
            mainSpaceDiv = document.querySelector("#mainSpace");
            const listOfItems = document.createElement("ol");
            let listOfItemsClasses = ["flex flex-row flex-wrap max-[640px]:justify-center max-[640px]:text-sm sm:justify-center md:justify-start list-none"];
            listOfItems.className = listOfItemsClasses;
            listOfItems.id = "listOfItems";
            mainSpaceDiv.appendChild(listOfItems);

            items.forEach(item => {
                const itemListOfItems = document.createElement("li");
                let itemListOfItemsClasses = ["h-24 max-[640px]:w-2/5 sm:w-2/5 md:w-1/5 font-bold bg-gray-400 mr-6 mb-6 rounded-lg hover:scale-105 duration-200 ease-in-out break-words"];
                itemListOfItems.className = itemListOfItemsClasses;
                if(item.type === "workspace"){
                    itemListOfItems.id = item.idUserWorkspace;
                }
                else if(item.type === "board"){
                    itemListOfItems.id = item.idBoard;
                }
    
                const btnItemListOfItems = document.createElement("button");
                let btnItemListOfItemsClasses = ["w-full h-full flex justify-start px-4 pt-2"];
                btnItemListOfItems.className = btnItemListOfItemsClasses;
    
                const spanBtnItemListOfItems = document.createElement("p");
                let spanBtnItemListOfItemsClasses = ["break-all"];
                spanBtnItemListOfItems.className = spanBtnItemListOfItemsClasses;
                if(item.type === "workspace"){
                    spanBtnItemListOfItems.innerText = item.nameOfUserWorkspace;
                }
                else if(item.type === "board"){
                    spanBtnItemListOfItems.innerText = item.nameOfBoard;
                }
            
                btnItemListOfItems.appendChild(spanBtnItemListOfItems);
                itemListOfItems.appendChild(btnItemListOfItems);
                listOfItems.append(itemListOfItems);

                itemListOfItems.addEventListener('click', async function onClick(){
                    if(item.type === "workspace"){
                        workspaceId = item.idUserWorkspace;
                        categoryNameSpan.innerText += ` >> ${item.nameOfUserWorkspace}`;
                        listOfItems.remove();
                        await getUserBoards();
                    }
                    else if(item.type === "board"){
                        boardId = item.idBoard;
                        categoryNameSpan.innerText += ` >> ${item.nameOfBoard}`;
                        listOfItems.remove();
                        await getUserListsOfTasks();
                    }
                });
            });
        }
    }

    function displayListsOfTasks(tasksLists){
        if(tasksLists && tasksLists.length > 0){  
            mainSpaceDiv.classList.add("flex");
            mainSpaceDiv.classList.add("flex-row");
            tasksLists.forEach(taskList => {
                const taskStatusList = document.createElement("div");
                let listOfTaskStatusListClasses = ["w-1/4 h-full bg-green-100 mr-5 flex flex-col flex-wrap justify-start list-none rounded-lg"];
                taskStatusList.className = listOfTaskStatusListClasses;
                taskStatusList.id = taskList.idStatus;

                const taskStatusListDivTitle = document.createElement("div");
                let listOfTaskStatusListDivTitleClasses = ["w-full h-1/10 flex items-center font-bold bg-gray-400 mr-6 px-4 rounded-t-lg pointer-events-none"];
                taskStatusListDivTitle.className = listOfTaskStatusListDivTitleClasses;

                const taskStatusListSpanTitle = document.createElement("span");
                taskStatusListSpanTitle.innerText = taskList.nameStatus;

                const listOfTasks = document.createElement("ol");
                let listOfTasksClasses = ["w-full h-[calc(100%-15%)] flex flex-col items-center pt-5 overflow-y-auto max-[640px]:justify-center max-[640px]:text-sm sm:justify-center md:justify-start list-none list-of-tasks"];
                listOfTasks.className = listOfTasksClasses;
                listOfTasks.id = `listOfTask-${taskList.idStatus}`;

                taskStatusListDivTitle.appendChild(taskStatusListSpanTitle);
                taskStatusList.appendChild(taskStatusListDivTitle);
                taskStatusList.appendChild(listOfTasks);

                if (taskList.idStatus === 1) {
                    const addTaskDiv = document.createElement("div");
                    addTaskDiv.className = "w-full h-1/20 flex items-center font-bold bg-gray-400 rounded-b-lg";
    
                    const addTaskBtn = document.createElement("button");
                    addTaskBtn.id = "addTaskBtn";
                    addTaskBtn.className = "w-full h-full flex justify-center items-center hover:text-white duration-300 ease-in-out";
                    addTaskBtn.innerText = "Dodaj zadanie";
    
                    addTaskDiv.appendChild(addTaskBtn);
                    taskStatusList.appendChild(addTaskDiv);
                }
                
                mainSpaceDiv.appendChild(taskStatusList);
            });
        }
    }

    function displayTasks(tasks){
        if(tasks && tasks.length > 0){
            const listToDo = document.getElementById("listOfTask-1");
            const listInProgress = document.getElementById("listOfTask-2");
            const listDone = document.getElementById("listOfTask-3");
            
            tasks.forEach(task => {
                // let clickCount = parseInt(this.dataset.clickCount, 10);
                // clickCount++;
                const itemListOfTasks = document.createElement("li");
                let itemListOfTasksClasses = ["w-4/5 h-20 bg-gray-400 mb-6 rounded-lg item break-words"];
                itemListOfTasks.className = itemListOfTasksClasses;
                itemListOfTasks.id = task.idTask;
                itemListOfTasks.draggable = true;
                itemListOfTasks.style.cursor = "grab";
                // itemListOfTasks.dataset.clickCount = 0;

                const itemListOfTaskColorBand = document.createElement("div");
                let itemListOfTaskColorBandClasses = ["w-full h-6 flex flex-col flex-wrap justify-start list-none rounded-t-lg"];
                itemListOfTaskColorBand.className = itemListOfTaskColorBandClasses;
                itemListOfTaskColorBand.style.backgroundColor = task.colorBandTask;

                const itemListOfTaskContent = document.createElement("div");
                let itemListOfTaskContentClasses = ["w-full h-14 flex flex-col flex-wrap justify-start ml-2.5 mt-1 list-none rounded-b-lg"];
                itemListOfTaskContent.className = itemListOfTaskContentClasses;

                const itemListOfTaskContentParagraph = document.createElement("p");
                let itemListOfTaskContentParagraphClasses = ["break-all"];
                itemListOfTaskContentParagraph.className = itemListOfTaskContentParagraphClasses; 
                itemListOfTaskContentParagraph.innerText = task.nameTask;

                itemListOfTaskContent.appendChild(itemListOfTaskContentParagraph);
                itemListOfTasks.appendChild(itemListOfTaskColorBand);
                itemListOfTasks.appendChild(itemListOfTaskContent);

                let taskStatusId = task.idStatus;
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
                        alert("Missing value of taskStatusId");
                }
            });

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
        }
    }

    function addPopoverTask(){
        const listOfTasks = document.querySelector("#listOfTask-1");

        if(!listOfTasks){
            console.error('List of tasks is undefined.');
            return;
        }

        const clickedAddTaskBtn = document.getElementById("addTaskBtn");

        clickedAddTaskBtn.addEventListener('click', () => {
            const popOver = document.createElement("div");
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
            const popOverContentInputText = document.createElement("input");
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
            const popOverContentTextarea = document.createElement("textarea");
            popOverContentTextarea.id = "addTaskTextarea";
            popOverContentTextarea.name = "textarea";
            popOverContentTextarea.placeholder = "Opisz zadanie...";
            popOverContentTextarea.maxLength = "100";
            popOverContentTextarea.rows = "5";
            popOverContentTextarea.required = true;
            const popOverContentLabelInputColor = document.createElement("label");
            popOverContentLabelInputColor.htmlFor = "addTaskInputColor";
            popOverContentLabelInputColor.textContent = "Wybierz kolor okładki:";
            const popOverContentInputColor = document.createElement("input");
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
                if(popOverContentTextareaValue=="" || popOverContentInputTextValue=="") {
                    alert("Uzupełnij brakujące pola.")
                }
                else {
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

                    addTask(popOverContentInputTextValue, popOverContentTextareaValue, ConvertedInputColorValue);
                }
            });
        });
    }

    function addPopover(contentType){

        const listOfItems = document.querySelector("#listOfItems");

        if(!listOfItems){
            mainSpaceDiv = document.querySelector("#mainSpace");
            const listOfItems = document.createElement("ol");
            let listOfItemsClasses = ["flex flex-row flex-wrap max-[640px]:justify-center max-[640px]:text-sm sm:justify-center md:justify-start list-none"];
            listOfItems.className = listOfItemsClasses;
            listOfItems.id = "listOfItems";
            mainSpaceDiv.appendChild(listOfItems);
        }

        const listOfItemsAfter = document.querySelector("#listOfItems");

        clearExistingPopoverButton();

        if(contentType === "workspace"){
            const btnAddWorkspace = createPopOver("Dodaj przestrzeń roboczą", "addWorkspaceBtn", () => {

                const clickedAddWorkspaceBtn = document.getElementById("addWorkspaceBtn");

                const popOver = document.createElement("div");
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
                const popOverContentInputText = document.createElement("input");
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

                const clickedAddWorkspaceBtnCancel = document.getElementById("popOverBtnCancel");
                clickedAddWorkspaceBtnCancel.addEventListener("click", () => {
                    clickedAddWorkspaceBtn.disabled = false;
                    clickedAddWorkspaceBtn.style.pointerEvents = "auto";
                    popOver.remove();
                });

                const clickedAddWorkspaceBtnOk = document.getElementById("popOverBtnOk");
                clickedAddWorkspaceBtnOk.addEventListener("click", () => {
                    if(popOverContentInputText.value.length > 0){
                        let itemListOfWorkspace;
                        let popOverContentInputTextValue = popOverContentInputText.value.trim();

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

                        let itemsListOfWorkspace = document.querySelector("#listOfItems");
                        let lastItem = itemsListOfWorkspace.lastElementChild;
                        itemsListOfWorkspace.insertBefore(itemListOfWorkspace, lastItem);
                        
                        addWorkspace(popOverContentInputText.value);

                        popOver.remove();
                    }
                    else{
                        alert("Nazwa przestrzeni roboczej nie może być pusta!");
                    }
                });
            });
            listOfItemsAfter.appendChild(btnAddWorkspace);
        }
        else if(contentType === "board"){
            const btnAddBoard = createPopOver("Dodaj tablicę", "addBoardBtn", () => {
                const clickedBoardBtn = document.getElementById("addBoardBtn");

                const popOver = document.createElement("div");
                let popOverClasses = ["w-4/12 h-2/5 flex flex-col justify-center items-center absolute bg-white text-black shadow-lg rounded-lg z-10"];
                popOver.className = popOverClasses;
                popOver.id = "popoverBlock";
        
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
                popOverContentLabelInputText.textContent = "Nazwa tablicy zadań:"
                const popOverContentInputText = document.createElement("input");
                popOverContentInputText.id = "addBoardInputText";
                popOverContentInputText.name = "input";
                popOverContentInputText.type = "text";
                popOverContentInputText.placeholder = "Nazwa tablicy zadań...";
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

                clickedBoardBtn.disabled = true;
                clickedBoardBtn.style.pointerEvents = "none";

                const clickedBoardBtnCancel = document.getElementById("popOverBtnCancel");
                clickedBoardBtnCancel.addEventListener("click", () => {
                    clickedBoardBtn.disabled = false;
                    clickedBoardBtn.style.pointerEvents = "auto";
                    popOver.remove();
                });

                const clickedBoardBtnOk = document.getElementById("popOverBtnOk");
                clickedBoardBtnOk.addEventListener("click", () => {
                    if(popOverContentInputText.value.length > 0){
                        let itemListOfBoard;
                        let popOverContentInputTextValue = popOverContentInputText.value.trim();

                        itemListOfBoard = document.createElement("li");
                        let itemListOfBoardClasses = ["h-24 max-[640px]:w-2/5 sm:w-2/5 md:w-1/5 font-bold bg-gray-400 mr-6 mb-6 rounded hover:scale-105 duration-200 ease-in-out"];
                        itemListOfBoard.className = itemListOfBoardClasses;
                        itemListOfBoard.id = "board-"+workspaceId;

                        const btnItemListOfBoard = document.createElement("button");
                        let btnItemListOfBoardClasses = ["w-full h-full flex justify-start px-4 pt-2"];
                        btnItemListOfBoard.className = btnItemListOfBoardClasses;

                        const spanBtnItemListOfBoard = document.createElement("span");
                        spanBtnItemListOfBoard.innerText = popOverContentInputTextValue;

                        btnItemListOfBoard.appendChild(spanBtnItemListOfBoard);
                        itemListOfBoard.appendChild(btnItemListOfBoard);

                        let itemsListOfBoard = document.querySelector("#listOfItems");
                        let lastItem = itemsListOfBoard.lastElementChild;
                        itemsListOfBoard.insertBefore(itemListOfBoard, lastItem);
                        
                        addBoard(popOverContentInputText.value);

                        popOver.remove();
                    }
                    else{
                        alert("Nazwa tablicy nie może być pusta!");
                    }
                });
            });
            listOfItemsAfter.appendChild(btnAddBoard);
        }
    }

    function createPopOver(buttonText, buttonId, onClickCallback){
        const itemBtn = document.createElement("li");
        let itemBtnClasses = ["h-24 sm:w-2/5 md:w-1/5 flex justify-center items-center bg-gray-400 hover:bg-white duration-200 ease-in-out mr-6 rounded"];
        itemBtn.className = itemBtnClasses;

        const btnAdd = document.createElement("button");
        btnAdd.id = buttonId;
        let btnAddClasses = ["w-full h-full flex justify-center items-center px-4 pt-2"];
        btnAdd.className = btnAddClasses;
        btnAdd.addEventListener('click', onClickCallback);

        const spanBtnAdd = document.createElement("span");
        spanBtnAdd.innerText = buttonText;
        spanBtnAdd.classList.add("text-center");

        itemBtn.appendChild(btnAdd);
        btnAdd.appendChild(spanBtnAdd);

        return itemBtn;
    }

    function clearExistingPopoverButton() {
        const existingPopover = document.querySelector("#listOfItems > li:last-child");
        if (existingPopover && (existingPopover.id === "addWorkspaceBtn" || existingPopover.id === "addBoardBtn")) {
            existingPopover.remove();
        }

        const existingPopoverTask = document.querySelector("#listOfTasks-1 > li:last-child");
        if (existingPopoverTask && existingPopoverTask.id === "addTaskBtn") {
            existingPopoverTask.remove();
        }
    }

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
                return false;
            }
        }
        catch (error) {
            console.error('There was a problem with the fetch operation: ', error);
            return false;
        }
    };

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
                const clickedAddBoardBtn = document.getElementById("addTaskBtn");
                const popOver = document.getElementById("popoverBlock");
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
    }

    async function addTask(name, description, colorBand){
        try {
            const response = await fetch(`${baseAddress}/api/Utasks/${loggedInUserId}/${boardId}/addtask`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    NameTask: name,
                    DescTask: description,
                    ColorBandTask: colorBand,
                    IdBoard: boardId
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
                const clickedAddTaskBtn = document.getElementById("addTaskBtn");
                const popOver = document.getElementById("popoverBlock");
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
    }

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

    const btnWorkspace = document.querySelector("#workspacesBtn");
    btnWorkspace.addEventListener('click', getUserWorkspaces);

    const btnBoards = document.querySelector("#boardsBtn");
    btnBoards.addEventListener('click', getUserBoards);

    const btnStats = document.querySelector("#statsBtn");
    btnStats.addEventListener('click', () =>{
        mainSpaceDiv.innerHTML = "";
        const canvas = document.createElement("canvas");
        canvas.id = "myChart";
        canvas.width = "400px";
        canvas.height = "400px";
        mainSpaceDiv.appendChild(canvas);

        let catToDo = tasksData.filter(task => task.idStatus == 1).length;
        let catInProgress = tasksData.filter(task => task.idStatus == 2).length;
        let catDone = tasksData.filter(task => task.idStatus == 3).length;

        let valueA = ["Do zrobienia", "W trakcie", "Zrobione"];
        let valueB = [catToDo, catInProgress, catDone];
        let barColors = ["#4CAF50", "#2196F3", "#f44336"];

        new Chart("myChart", {
            type: "doughnut",
            data: {
              labels: valueA,
              datasets: [{
                backgroundColor: barColors,
                data: valueB
              }]
            },
            options: {
              legend: {display: true},
              title: {
                display: true,
                text: "Zadania w tablicy"
              }
            }
          });
    });

    getLoggedInUserId();
});