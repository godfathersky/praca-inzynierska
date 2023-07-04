document.addEventListener("DOMContentLoaded", function() {

    function createRegContainer() {
        // Tworzenie kontenera
        const regContainer = document.createElement("div");
        regContainer.className = "reg-container";
        regContainer.id = "regContainer";

        // Tworzenie przycisku zamykającego
        const closeRegBtn = document.createElement("button");
        closeRegBtn.id = "closeRegBtn";
        closeRegBtn.textContent = "X";

        // Tworzenie przycisku minimalizującego
        const minimizeRegBtn = document.createElement("button");
        minimizeRegBtn.id = "minimizeRegBtn";
        minimizeRegBtn.textContent = "_";

        // Dodawanie przycisków do kontenera
        regContainer.appendChild(closeRegBtn);
        regContainer.appendChild(minimizeRegBtn);

        // Tworzenie kontenera formularza rejestracji
        const register = document.createElement("div");
        register.className = "register";

        // Tworzenie sekcji informacyjnej
        const info = document.createElement("div");
        info.className = "info";

        // Tworzenie obrazka
        const img = document.createElement("img");
        img.src = "/img/text4254-4.png";
        img.alt = "text4254-4.png";

        // Tworzenie paragrafu
        const paragraph = document.createElement("p");
        paragraph.textContent = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, totam veritatis! Magnam ab ea quis illum soluta quam. Temporibus numquam necessitatibus similique? Accusantium hic consequuntur consectetur. Esse aperiam quo reiciendis.";

        // Dodawanie obrazka i paragrafu do sekcji informacyjnej
        info.appendChild(img);
        info.appendChild(paragraph);

        // Dodawanie sekcji informacyjnej do kontenera formularza rejestracji
        register.appendChild(info);

        // Tworzenie formularza
        const form = document.createElement("form");

        // Tworzenie sekcji tytułowej
        const title = document.createElement("div");
        title.className = "title";

        // Tworzenie nagłówka
        const heading = document.createElement("h1");
        heading.textContent = "Formularz rejestracji";

        // Dodawanie nagłówka do sekcji tytułowej
        title.appendChild(heading);

        // Dodawanie sekcji tytułowej do formularza
        form.appendChild(title);

        // Tworzenie kontenera dla adresu email
        const emailRegContainer = document.createElement("div");
        emailRegContainer.className = "email-reg";
        emailRegContainer.id = "emailRegContainer";

        // Tworzenie etykiety dla adresu email
        const emailLabel = document.createElement("label");
        emailLabel.setAttribute("for", "email");
        emailLabel.textContent = "Adres email";

        // Tworzenie pola input dla adresu email
        const emailInput = document.createElement("input");
        emailInput.setAttribute("type", "email");
        emailInput.setAttribute("name", "email");
        emailInput.id = "emailRegInput";

        // Dodawanie etykiety i pola input do kontenera adresu email
        emailRegContainer.appendChild(emailLabel);
        emailRegContainer.appendChild(emailInput);

        // Dodawanie kontenera adresu email do formularza
        form.appendChild(emailRegContainer);

        // Tworzenie kontenera dla nazwy użytkownika
        const usernameRegContainer = document.createElement("div");
        usernameRegContainer.className = "username-reg";
        usernameRegContainer.id = "usernameRegContainer";

        // Tworzenie etykiety dla nazwy użytkownika
        const usernameLabel = document.createElement("label");
        usernameLabel.setAttribute("for", "username");
        usernameLabel.textContent = "Nazwa użytkownika";

        // Tworzenie pola input dla nazwy użytkownika
        const usernameInput = document.createElement("input");
        usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("name", "username");
        usernameInput.id = "usernameRegInput";

        // Dodawanie etykiety i pola input do kontenera nazwy użytkownika
        usernameRegContainer.appendChild(usernameLabel);
        usernameRegContainer.appendChild(usernameInput);

        // Dodawanie kontenera nazwy użytkownika do formularza
        form.appendChild(usernameRegContainer);

        // Tworzenie kontenera dla hasła
        const passwordRegContainer = document.createElement("div");
        passwordRegContainer.className = "password-reg";
        passwordRegContainer.id = "passwordRegContainer";

        // Tworzenie etykiety dla hasła
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for", "password");
        passwordLabel.textContent = "Hasło";

        // Tworzenie pola input dla hasła
        const passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        passwordInput.setAttribute("name", "password");
        passwordInput.id = "passwordRegInput";

        // Dodawanie etykiety i pola input do kontenera hasła
        passwordRegContainer.appendChild(passwordLabel);
        passwordRegContainer.appendChild(passwordInput);

        // Dodawanie kontenera hasła do formularza
        form.appendChild(passwordRegContainer);

        // Tworzenie kontenera dla powtórzenia hasła
        const rePasswordRegContainer = document.createElement("div");
        rePasswordRegContainer.className = "re-password-reg";
        rePasswordRegContainer.id = "rePasswordRegContainer";

        // Tworzenie etykiety dla powtórzenia hasła
        const rePasswordLabel = document.createElement("label");
        rePasswordLabel.setAttribute("for", "re-password");
        rePasswordLabel.textContent = "Powtórz hasło";

        // Tworzenie pola input dla powtórzenia hasła
        const rePasswordInput = document.createElement("input");
        rePasswordInput.setAttribute("type", "password");
        rePasswordInput.setAttribute("name", "re-password");
        rePasswordInput.id = "rePasswordRegInput";

        // Dodawanie etykiety i pola input do kontenera powtórzenia hasła
        rePasswordRegContainer.appendChild(rePasswordLabel);
        rePasswordRegContainer.appendChild(rePasswordInput);

        // Dodawanie kontenera powtórzenia hasła do formularza
        form.appendChild(rePasswordRegContainer);

        // Tworzenie kontenera dla zgody
        const checkConditionContainer = document.createElement("div");
        checkConditionContainer.className = "check-condition-reg";
        checkConditionContainer.id = "checkConditionContainer";

        // Tworzenie etykiety dla zgody
        const checkConditionLabel = document.createElement("label");
        checkConditionLabel.setAttribute("for", "check-condition");
        checkConditionLabel.textContent = "Akceptuję wszystkie niezbędne zgody i zezwalam na przetwarzania moich danych osobowych.";

        // Tworzenie pola checkbox dla zgody
        const checkConditionInput = document.createElement("input");
        checkConditionInput.setAttribute("type", "checkbox");
        checkConditionInput.setAttribute("name", "check-condition");
        checkConditionInput.id = "checkConditionInput";

        // Dodawanie etykiety i pola checkbox do kontenera zgody
        checkConditionContainer.appendChild(checkConditionLabel);
        checkConditionContainer.appendChild(checkConditionInput);

        // Dodawanie kontenera zgody do formularza
        form.appendChild(checkConditionContainer);

        // Tworzenie kontenera dla przycisków
        const buttonsReg = document.createElement("div");
        buttonsReg.className = "buttons-reg";

        // Tworzenie przycisku rejestracji
        const regBtn = document.createElement("button");
        regBtn.id = "regBtn";
        regBtn.textContent = "Zarejestruj";

        // Tworzenie przycisku wyczyszczenia
        const clrRegBtn = document.createElement("button");
        clrRegBtn.id = "clrRegBtn";
        clrRegBtn.textContent = "Wyczyść";

        // Dodawanie przycisków do kontenera przycisków
        buttonsReg.appendChild(regBtn);
        buttonsReg.appendChild(clrRegBtn);

        // Dodawanie kontenera przycisków do formularza
        form.appendChild(buttonsReg);

        // Dodawanie kontenera formularza rejestracji do głównego kontenera
        register.appendChild(form);

        // Dodawanie kontenera formularza rejestracji do głównego kontenera
        regContainer.appendChild(register);

        // Dodawanie głównego kontenera do dokumentu
        document.body.appendChild(regContainer);

        //
        /* Register form functions */
        //

        showRegBtn.addEventListener("click", () => {
            regContainer.style.transition = "opacity 500ms";
            regContainer.style.opacity = "0";
            regContainer.style.display = "flex";
            passwordRegContainer.style.borderBottomColor = "white";
            rePasswordRegContainer.style.borderBottomColor = "white";
            setTimeout(() => {
                regContainer.style.opacity = "1";
            }, 200);
        });
    
        function validateEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        };
    
        function resetRegisterInputs() {
            emailRegInput.value = "";
            usernameRegInput.value = "";
            passwordRegInput.value = "";
            rePasswordRegInput.value = "";
            checkConditionInput.checked = false;
        };
    
        closeRegBtn.addEventListener("click", () => {
            regContainer.style.transition = "opacity 500ms";
            regContainer.style.opacity = "0";
            setTimeout(() => {
                resetRegisterInputs();
                regContainer.style.display = "none";
            }, 200);
        });
    
        let minRegBtn = document.getElementById("minimizeRegBtn");
        let minRegContainer = document.getElementById("minRegContainer");
        minRegBtn.addEventListener("click", () => {
            regContainer.style.display = "none";
            minRegContainer.style.display = "flex";
        });
    
        let maxRegBtn = document.getElementById("maximizeRegBtn");
        maxRegBtn.addEventListener("click", () => {
            minRegContainer.style.display = "none";
            regContainer.style.display = "flex";
        });
    
        let minCloseRegBtn = document.getElementById("minCloseRegBtn");
        minCloseRegBtn.addEventListener("click", () => {
            minRegContainer.style.display = "none";
            resetRegisterInputs();
        });
    
        emailInput.addEventListener("blur", () => {
            const email = emailInput.value.trim();
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
    
        usernameInput.addEventListener("blur", () => {
            const username = usernameInput.value.trim();
            usernameRegContainer.style.borderBottomColor = username === "admin" ? "red" : "white";
        });
    
        rePasswordInput.addEventListener("input", () => {
            const passwordsMatch = passwordInput.value === rePasswordInput.value;
            passwordRegContainer.style.borderBottomColor = passwordsMatch ? "white" : "red";
            rePasswordRegContainer.style.borderBottomColor = passwordsMatch ? "white" : "red";
        });

        regBtn.addEventListener("click", event =>{
            event.preventDefault();
            resetRegisterInputs();
        });

        clrRegBtn.addEventListener("click", event =>{
            event.preventDefault();
            resetRegisterInputs();
        });
    }
    createRegContainer();
});