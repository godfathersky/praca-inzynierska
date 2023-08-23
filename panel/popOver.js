document.addEventListener("DOMContentLoaded", () =>{
    let clickedAddTaskBtn = document.getElementById("addTaskBtn");
    let itemsList = document.querySelector(".items-list");

    clickedAddTaskBtn.onclick = function() {
        // const taskDiv = document.createElement("div");
        // taskDiv.classList.add("task");
    
        // const taskColorBand = document.createElement("div");
        // taskColorBand.classList.add("color-band");
    
        // const taskContent = document.createElement("div");
        // taskContent.classList.add("task-content");
    
        // taskDiv.appendChild(taskColorBand);
        // taskDiv.appendChild(taskContent);
        // itemsList.appendChild(taskDiv);


        // Stworzyć popover, w którym będzie możliwość podania danych wejściowych
        // Wewnątrz powinny znajdować się dwa przyciski "OK" i "CANCEL"
        // Po włączeniu popover'u należy zablokować korzystanie z reszty treści
        // Po wciśnięciu obszaru poza elementem popover powinnien on ulec zamknięciu
        const popOver = document.createElement("div");
        popOver.classList.add("popover");
        const popOverInput = document.createElement("input");
        popOver.appendChild(popOverInput);
        document.body.appendChild(popOver);
    }
});