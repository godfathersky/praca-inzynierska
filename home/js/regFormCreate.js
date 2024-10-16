import { registerUser } from './regUser.js';

document.addEventListener("DOMContentLoaded", function() {

    const startContainer = document.getElementsByTagName("main")[0];

    const isBannedUsername = {
        admin: true,
        root: true,
        administrator: true,
        user: true,
        test: true,
        example: true,
        guest: true,
        moderator: true,
        superuser: true,
        superadmin: true,
        superadministrator: true,
        supermoderator: true,
        superuser: true
    }

    function createRegContainer() {
        const regContainer = document.createElement("div");
        regContainer.className = "reg-container";
        regContainer.id = "regContainer";

        const closeRegBtn = document.createElement("button");
        closeRegBtn.id = "closeRegBtn";
        closeRegBtn.textContent = "X";

        const minimizeRegBtn = document.createElement("button");
        minimizeRegBtn.id = "minimizeRegBtn";
        minimizeRegBtn.textContent = "_";

        regContainer.appendChild(closeRegBtn);
        regContainer.appendChild(minimizeRegBtn);

        const register = document.createElement("div");
        register.className = "register";

        const info = document.createElement("div");
        info.className = "info";

        const img = document.createElement("img");
        img.src = "/img/tick_task_19_09_23_white.png";
        img.alt = "tick_task_19_09_23_white.png";

        info.appendChild(img);

        register.appendChild(info);

        const form = document.createElement("form");

        const title = document.createElement("div");
        title.className = "title";

        const heading = document.createElement("h1");
        heading.textContent = "Formularz rejestracji";

        title.appendChild(heading);

        form.appendChild(title);

        const emailRegContainer = document.createElement("div");
        emailRegContainer.className = "email-reg";
        emailRegContainer.id = "emailRegContainer";

        const emailLabel = document.createElement("label");
        emailLabel.htmlFor = "emailRegInput";
        emailLabel.textContent = "Adres email";

        const emailInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.name = "email";
        emailInput.id = "emailRegInput";

        emailRegContainer.appendChild(emailLabel);
        emailRegContainer.appendChild(emailInput);

        form.appendChild(emailRegContainer);

        const usernameRegContainer = document.createElement("div");
        usernameRegContainer.className = "username-reg";
        usernameRegContainer.id = "usernameRegContainer";

        const usernameLabel = document.createElement("label");
        usernameLabel.htmlFor = "usernameRegInput";
        usernameLabel.textContent = "Nazwa użytkownika";

        const usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.name = "username";
        usernameInput.id = "usernameRegInput";

        usernameRegContainer.appendChild(usernameLabel);
        usernameRegContainer.appendChild(usernameInput);

        form.appendChild(usernameRegContainer);

        const passwordRegContainer = document.createElement("div");
        passwordRegContainer.className = "password-reg";
        passwordRegContainer.id = "passwordRegContainer";

        const passwordLabel = document.createElement("label");
        passwordLabel.htmlFor = "passwordRegInput";
        passwordLabel.textContent = "Hasło";

        const passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.name = "password";
        passwordInput.id = "passwordRegInput";

        passwordRegContainer.appendChild(passwordLabel);
        passwordRegContainer.appendChild(passwordInput);

        form.appendChild(passwordRegContainer);

        const rePasswordRegContainer = document.createElement("div");
        rePasswordRegContainer.className = "re-password-reg";
        rePasswordRegContainer.id = "rePasswordRegContainer";

        const rePasswordLabel = document.createElement("label");
        rePasswordLabel.htmlFor = "rePasswordRegInput";
        rePasswordLabel.textContent = "Powtórz hasło";

        const rePasswordInput = document.createElement("input");
        rePasswordInput.type = "password";
        rePasswordInput.name = "re-password";
        rePasswordInput.id = "rePasswordRegInput";

        rePasswordRegContainer.appendChild(rePasswordLabel);
        rePasswordRegContainer.appendChild(rePasswordInput);

        form.appendChild(rePasswordRegContainer);

        const checkConditionContainer = document.createElement("div");
        checkConditionContainer.className = "check-condition-reg";
        checkConditionContainer.id = "checkConditionContainer";

        const checkConditionLabel = document.createElement("label");
        checkConditionLabel.setAttribute("for", "check-condition");
        checkConditionLabel.htmlFor = "checkConditionInput";
        checkConditionLabel.textContent = "Akceptuję wszystkie niezbędne zgody i zezwalam na przetwarzania moich danych osobowych.";

        const checkConditionInput = document.createElement("input");
        checkConditionInput.setAttribute("type", "checkbox");
        checkConditionInput.setAttribute("name", "check-condition");
        checkConditionInput.type = "checkbox";
        checkConditionInput.name = "check-condition";
        checkConditionInput.id = "checkConditionInput";

        checkConditionContainer.appendChild(checkConditionLabel);
        checkConditionContainer.appendChild(checkConditionInput);

        form.appendChild(checkConditionContainer);

        const buttonsReg = document.createElement("div");
        buttonsReg.className = "buttons-reg";

        const regBtn = document.createElement("button");
        regBtn.id = "regBtn";
        regBtn.textContent = "Zarejestruj";

        const clrRegBtn = document.createElement("button");
        clrRegBtn.id = "clrRegBtn";
        clrRegBtn.textContent = "Wyczyść";

        buttonsReg.appendChild(regBtn);
        buttonsReg.appendChild(clrRegBtn);

        form.appendChild(buttonsReg);

        register.appendChild(form);

        regContainer.appendChild(register);

        document.body.appendChild(regContainer);

        const showRegBtn = document.getElementById("showRegBtn");
        showRegBtn.addEventListener("click", () => {
            regContainer.style.transition = "opacity 500ms";
            regContainer.style.opacity = "0";
            regContainer.style.display = "flex";

            passwordInput.style.borderBottomColor = "white";
            rePasswordInput.style.borderBottomColor = "white";
            setTimeout(() => {
                regContainer.style.opacity = "1";
                startContainer.style.display = "none";
            }, 200);
        });
    
        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        };
    
        function resetRegisterInputs() {
            emailInput.value = "";
            usernameInput.value = "";
            passwordInput.value = "";
            rePasswordInput.value = "";
            checkConditionInput.checked = false;
            emailInput.style.borderBottomColor = "white";
            usernameInput.style.borderBottomColor = "white";
            passwordInput.style.borderBottomColor = "white";
            rePasswordInput.style.borderBottomColor = "white";
        };
    
        closeRegBtn.addEventListener("click", () => {
            regContainer.style.transition = "opacity 500ms";
            regContainer.style.opacity = "0";
            setTimeout(() => {
                resetRegisterInputs();
                regContainer.style.display = "none";
                startContainer.style.display = "flex";
            }, 200);
        });
    
        let minRegBtn = document.getElementById("minimizeRegBtn");
        let minRegContainer = document.getElementById("minRegContainer");
        minRegBtn.addEventListener("click", () => {
            regContainer.style.display = "none";
            startContainer.style.display = "flex";
            minRegContainer.style.display = "flex";
        });
    
        let maxRegBtn = document.getElementById("maximizeRegBtn");
        maxRegBtn.addEventListener("click", () => {
            minRegContainer.style.display = "none";
            startContainer.style.display = "none";
            regContainer.style.display = "flex";
        });
    
        let minCloseRegBtn = document.getElementById("minCloseRegBtn");
        minCloseRegBtn.addEventListener("click", () => {
            startContainer.style.display = "flex";
            minRegContainer.style.display = "none";
            resetRegisterInputs();
        });
    
        emailInput.addEventListener("blur", () => {
            const email = emailInput.value.trim();
            if (email) {
                if (validateEmail(email)) {
                    emailInput.style.borderBottomColor = "white";
                }
                else {
                    emailInput.style.borderBottomColor = "red";
                }
            }
            else {
                emailInput.style.borderBottomColor = "white";
            }
        });

        const spanToolTipUsername = document.createElement("span");
        spanToolTipUsername.className = "tooltip";
        spanToolTipUsername.style.display = "none";
        spanToolTipUsername.style.color = "red";
        spanToolTipUsername.textContent = "Zakazana nazwa użytkownika!";
        usernameRegContainer.appendChild(spanToolTipUsername);
    
        usernameInput.addEventListener("input", () => {
            const username = usernameInput.value.trim();

            function checkBannedUsername(username){
                if(isBannedUsername[username]){
                    spanToolTipUsername.style.display = "inline-block";
                    return true;
                }
                else{
                    spanToolTipUsername.style.display = "none";
                    return false;
                }
            }

            if(checkBannedUsername(username)){
                usernameInput.style.borderBottomColor = "red";
            }
            else{
                usernameInput.style.borderBottomColor = "white";
            }
        });
    
        const spanToolTipPassword = document.createElement("span");
        spanToolTipPassword.className = "tooltip";
        spanToolTipPassword.style.display = "none";
        spanToolTipPassword.style.color = "red";
        spanToolTipPassword.textContent = "Hasło musi zawierać minimum 8 znaków!";
        passwordRegContainer.appendChild(spanToolTipPassword);

        passwordInput.addEventListener("input", () => {
            let isPasswordNotValid = passwordInput.value.length < 8;
            if(isPasswordNotValid){
                passwordInput.style.borderBottomColor = "red";
                spanToolTipPassword.style.display = "inline-block";
            }
            else{
                passwordInput.style.borderBottomColor = "white";
                spanToolTipPassword.style.display = "none";

                rePasswordInput.addEventListener("input", () => {
                    const passwordsMatch = passwordInput.value === rePasswordInput.value;
                    passwordInput.style.borderBottomColor = passwordsMatch ? "white" : "red";
                    rePasswordInput.style.borderBottomColor = passwordsMatch ? "white" : "red";
                });
            }
        });

        regBtn.addEventListener("click", event =>{
            event.preventDefault();

            let username = document.getElementById("usernameRegInput").value;
            let email = document.getElementById("emailRegInput").value;
            let password = document.getElementById("passwordRegInput").value;
            let rePassword = document.getElementById("rePasswordRegInput").value;
            let checkCondition = document.getElementById("checkConditionInput").checked;
        
            if(username === "" || email === "" || password === "" || rePassword === "" || checkCondition === false){
                alert("Wypełnij wszystkie pola!");
                return;
            }

            if(email.indexOf("@") === -1){
                alert("Niepoprawny adres email!");
                return;
            }

            if(password !== rePassword){
                alert("Hasła nie są takie same!");
                return;
            }

            if(password.length < 8){
                alert("Hasło musi zawierać minimum 8 znaków!");
                return;
            }

            registerUser(username, email, password)
            .then((success) => {
                if (success) {
                    alert("Rejestracja pomyślna!");
                }
                else {
                    alert("Rejestracja nieudana!");
                }
            });

            resetRegisterInputs();
        });

        clrRegBtn.addEventListener("click", event =>{
            event.preventDefault();
            resetRegisterInputs();
        });

    }
    createRegContainer();
});
