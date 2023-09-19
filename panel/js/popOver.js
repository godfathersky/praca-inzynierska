document.addEventListener("DOMContentLoaded", () => {

    function AddTaskPopOver(){
        const clickedAddTaskBtn = document.getElementById("addTaskBtn");
        let popOver, popOverContentTextarea, popOverContentInputColor;
        let taskId = 0;

        clickedAddTaskBtn.addEventListener("click", () =>{
            // Stworzyć popover, w którym będzie możliwość podania danych wejściowych
            // Wewnątrz powinny znajdować się dwa przyciski "OK" i "CANCEL"
            // Po włączeniu popover'u należy zablokować korzystanie z reszty treści
            // Po wciśnięciu obszaru poza elementem popover powinnien on ulec zamknięciu
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
                const popOverContentLabelTextarea = document.createElement("label");
                popOverContentLabelTextarea.htmlFor = "addTaskTextarea";
                popOverContentLabelTextarea.textContent = "Opis zadania:";
                popOverContentTextarea = document.createElement("textarea");
                popOverContentTextarea.id = "addTaskTextarea";
                popOverContentTextarea.name = "textarea";
                popOverContentTextarea.placeholder = "Opisz zadanie...";
                popOverContentTextarea.maxLength = "100";
                popOverContentTextarea.rows = "5";
                popOverContentTextarea.autofocus = true;
                popOverContentTextarea.required = true;
                const popOverContentLabelInputColor = document.createElement("label");
                popOverContentLabelInputColor.htmlFor = "addTaskInputColor";
                popOverContentLabelInputColor.textContent = "Wybierz kolor paska";
                popOverContentInputColor = document.createElement("input");
                popOverContentInputColor.type = "color";
                popOverContentInputColor.id = "addTaskInputColor";
                popOverContentInputColor.name = "inputColor";
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
            }
            
            const clickedAddTaskBtnCancel = document.getElementById("popOverBtnCancel");
            clickedAddTaskBtnCancel.addEventListener("click", () => {
                clickedAddTaskBtn.disabled = false;
                popOver.remove();
            });

            const clickedAddTaskBtnOk = document.getElementById("popOverBtnOk");
            clickedAddTaskBtnOk.addEventListener("click", () => {
                let popOverContentTextareaValue = popOverContentTextarea.value.trim();
                let popOverContentInputColorValue = popOverContentInputColor.value;
                if(popOverContentTextareaValue==""){
                    alert("Uzupełnij pole.")
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
                    p.innerText = popOverContentTextareaValue;
                
                    taskContent.appendChild(p);
                    taskDiv.appendChild(taskColorBand);
                    taskDiv.appendChild(taskContent);
                    itemsList.appendChild(taskDiv);
                    popOver.remove();
                }
            })
        });
    };

    AddTaskPopOver();
});