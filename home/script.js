document.addEventListener("DOMContentLoaded", e=>{
    let regBtn = document.getElementById("regBtn");
    let logBtn = document.getElementById("logBtn");
    let container = document.getElementById("container");

    function showRegPanel(){
        regBtn.addEventListener("click", showRegPanel =>{
            container.style.display="flex";
        })
    }
    showRegPanel();
})