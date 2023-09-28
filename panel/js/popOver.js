import { addTask } from './addTask.js';

document.addEventListener("DOMContentLoaded", () => {

    function ShowTaskDesc(){
        const tasks = document.getElementsByClassName("task");
        for (const task of tasks){
            task.dataset.clickCount = 0;
    
            task.addEventListener('click', function onClick() {
                let clickCount = parseInt(this.dataset.clickCount, 10);
                clickCount++;
                this.dataset.clickCount = clickCount;
    
                if (clickCount % 2 === 1){
                    this.style.backgroundColor = "red";
                }
                else{
                    this.style.backgroundColor = "lightgray";
                    task.dataset.clickCount = 0;
                }
                const elementId = this.id;
                console.log("Task id: " + elementId + ", Click Count: " + clickCount);
            });
        }
    }

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

                    const taskDiv = document.createElement("div");
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

                    addTask(popOverContentInputTextValue, popOverContentTextareaValue, ConvertedInputColorValue)
                    .then((success) => {
                        if (success) {
                            clickedAddTaskBtn.disabled = false;
                            clickedAddTaskBtn.style.pointerEvents = "auto";
                            popOver.remove();
                        }
                        else {
                            alert("Dodawanie zadania nieudane!");
                        }
                    });

                    ShowTaskDesc();
                }
            })
        });
    };

    AddTaskPopOver();
});