document.addEventListener("DOMContentLoaded", e=>{
    // Basic
    let regBtn = document.getElementById("regBtn");
    let logBtn = document.getElementById("logBtn");
    // Register form
    let clsRegBtn = document.getElementById("closeRegBtn");
    let minRegBtn = document.getElementById("minimizeRegBtn");
    let maxRegBtn = document.getElementById("maximizeRegBtn");
    let minCloseRegBtn = document.getElementById("minCloseRegBtn");
    let regContainer = document.getElementById("regContainer");
    let minRegContainer = document.getElementById("minRegContainer");
    let emailRegInput = document.getElementById("emailRegInput");
    let usernameRegInput = document.getElementById("usernameRegInput");
    let passwordRegInput = document.getElementById("passwordRegInput");
    let rePasswordRegInput = document.getElementById("rePasswordRegInput");
    let emailRegContainer = document.getElementById("emailRegContainer");
    let usernameRegContainer = document.getElementById("usernameRegContainer");
    // Login form
    let clsLogBtn = document.getElementById("closeLogBtn");
    let minLogBtn = document.getElementById("minimizeLogBtn");
    let maxLogBtn = document.getElementById("maximizeLogBtn");
    let minCloseLogBtn = document.getElementById("minCloseLogBtn");
    let logContainer = document.getElementById("logContainer");
    let minLogContainer = document.getElementById("minLogContainer");
    let usernameLogInput = document.getElementById("usernameLogInput");
    let passwordLogInput = document.getElementById("passwordLogInput");

    //
    /* Register form func */
    //
    function registerForm(){
        regBtn.addEventListener("click", () => {
            regContainer.style.display="flex";
        });

        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        };

        clsRegBtn.addEventListener("click", close => {
            regContainer.style.display="none";
            emailRegInput.value="";
            usernameRegInput.value="";
            passwordRegInput.value="";
            rePasswordRegInput.value="";
        });
    
        minRegBtn.addEventListener("click", minimize => {
            regContainer.style.display="none";
            minRegContainer.style.display="flex";
        });
    
        maxRegBtn.addEventListener("click", maximize => {
            minRegContainer.style.display="none";
            regContainer.style.display="flex";
        });
    
        minCloseRegBtn.addEventListener("click", closeMin => {
            minRegContainer.style.display="none";
            emailRegInput.value="";
            usernameRegInput.value="";
            passwordRegInput.value="";
            rePasswordRegInput.value="";
        });
    
        emailRegInput.addEventListener("blur", () => {
            const email = emailRegInput.value.trim();
            if (email) {
                if (validateEmail(email)) {
                    console.log("Email is valid");
                    emailRegContainer.style.borderBottomColor = "white";
                }
                else {
                    console.log("Email is not valid");
                    emailRegContainer.style.borderBottomColor = "red";
                }
            }
            else {
                emailRegContainer.style.borderBottomColor = "white";
            }
        });
        
        usernameRegInput.addEventListener("blur", () => {
            const username = usernameRegInput.value.trim();
            usernameRegContainer.style.borderBottomColor = username === "admin" ? "red" : "white";
        });
    }
    registerForm();

    // 
    /* Login form func */
    //
    function loginForm(){
        logBtn.addEventListener("click", () =>{
            logContainer.style.display="flex";
        });

        clsLogBtn.addEventListener("click", close =>{
            logContainer.style.display="none";
            usernameLogInput.value="";
            passwordLogInput.value="";
        });
    
        minLogBtn.addEventListener("click", minimize =>{
            logContainer.style.display="none";
            minLogContainer.style.display="flex";
        });
    
        maxLogBtn.addEventListener("click", maximize =>{
            minLogContainer.style.display="none";
            logContainer.style.display="flex";
        });
    
        minCloseLogBtn.addEventListener("click", minClose =>{
            minLogContainer.style.display="none";
            usernameLogInput.value="";
            passwordLogInput.value="";
        });
    }
    loginForm();
});