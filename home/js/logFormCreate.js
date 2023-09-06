import { loginUser } from './logUser.js';

document.addEventListener("DOMContentLoaded", () => {
    const startContainer = document.getElementsByTagName("main")[0];

    function createLogContainer() {

        const logContainer = document.createElement('div');
        logContainer.classList.add('log-container');
        logContainer.id = 'logContainer';
      
        const closeLogBtn = document.createElement('button');
        closeLogBtn.id = 'closeLogBtn';
        closeLogBtn.textContent = 'X';
      
        const minimizeLogBtn = document.createElement('button');
        minimizeLogBtn.id = 'minimizeLogBtn';
        minimizeLogBtn.textContent = '_';
      
        const loginDiv = document.createElement('div');
        loginDiv.classList.add('login');
      
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
      
        const image = document.createElement('img');
        image.src = '/img/text4254-4.png';
        image.alt = 'text4254-4.png';
      
        // const infoText = document.createElement('p');
        // infoText.textContent = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, totam veritatis! Magnam ab ea quis illum soluta quam. Temporibus numquam necessitatibus similique? Accusantium hic consequuntur consectetur. Esse aperiam quo reiciendis.';
      
        const form = document.createElement('form');
      
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
      
        const formTitle = document.createElement('h1');
        formTitle.textContent = 'Formularz logowania';
      
        const usernameLogContainer = document.createElement('div');
        usernameLogContainer.classList.add('username-log');
        usernameLogContainer.id = 'usernameLogContainer';
      
        const usernameLabel = document.createElement('label');
        usernameLabel.htmlFor = 'usernameLogInput';
        usernameLabel.textContent = 'Nazwa użytkownika';
      
        const usernameInput = document.createElement('input');
        usernameInput.type = 'text';
        usernameInput.name = 'username';
        usernameInput.id = 'usernameLogInput';
      
        const passwordLoginContainer = document.createElement('div');
        passwordLoginContainer.classList.add('password-log');
        passwordLoginContainer.id = 'passwordLoginContainer';
      
        const passwordLabel = document.createElement('label');
        passwordLabel.htmlFor = 'passwordLogInput';
        passwordLabel.textContent = 'Hasło';
      
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.name = 'password';
        passwordInput.id = 'passwordLogInput';
      
        const buttonsLogDiv = document.createElement('div');
        buttonsLogDiv.classList.add('buttons-log');
      
        const logBtn = document.createElement('button');
        logBtn.id = 'logBtn';
        logBtn.textContent = 'Zaloguj';
      
        const clrLogBtn = document.createElement('button');
        clrLogBtn.id = 'clrLogBtn';
        clrLogBtn.textContent = 'Wyczyść';
      
        infoDiv.appendChild(image);
        // infoDiv.appendChild(infoText);
      
        loginDiv.appendChild(infoDiv);
        loginDiv.appendChild(form);
      
        titleDiv.appendChild(formTitle);
      
        usernameLogContainer.appendChild(usernameLabel);
        usernameLogContainer.appendChild(usernameInput);
      
        passwordLoginContainer.appendChild(passwordLabel);
        passwordLoginContainer.appendChild(passwordInput);
      
        buttonsLogDiv.appendChild(logBtn);
        buttonsLogDiv.appendChild(clrLogBtn);
      
        form.appendChild(titleDiv);
        form.appendChild(usernameLogContainer);
        form.appendChild(passwordLoginContainer);
        form.appendChild(buttonsLogDiv);
      
        logContainer.appendChild(closeLogBtn);
        logContainer.appendChild(minimizeLogBtn);
        logContainer.appendChild(loginDiv);
      
        document.body.appendChild(logContainer);
    
        const showLogBtn = document.getElementById("showLogBtn");
        showLogBtn.addEventListener("click", function() {
            logContainer.style.transition = "opacity 500ms";
            logContainer.style.opacity = "0";
            logContainer.style.display = "flex";
            
            setTimeout(() => {
                logContainer.style.opacity = "1";
                startContainer.style.display = "none";
            }, 200);
        });

        function resetLoginInputs() {
            usernameInput.value = "";
            passwordInput.value = "";
        }
      
        closeLogBtn.addEventListener("click", () => {
            logContainer.style.transition = "opacity 500ms";
            logContainer.style.opacity = "0";
            setTimeout(() => {
                logContainer.style.display = "none";
                startContainer.style.display = "flex";
                resetLoginInputs();
            }, 200);
        });

        let minLogContainer = document.getElementById("minLogContainer");
        minimizeLogBtn.addEventListener("click", () => {
            logContainer.style.display = "none";
            startContainer.style.display = "flex";
            minLogContainer.style.display = "flex";
        });
      
        let maxLogBtn = document.getElementById("maximizeLogBtn");
        maxLogBtn.addEventListener("click", () => {
            minLogContainer.style.display = "none";
            startContainer.style.display = "none";
            logContainer.style.display = "flex";
        });
      
        let minCloseLogBtn = document.getElementById("minCloseLogBtn");
        minCloseLogBtn.addEventListener("click", () => {
            minLogContainer.style.display = "none";
            startContainer.style.display = "flex";
            resetLoginInputs();
        });

        logBtn.addEventListener("click", event =>{
            event.preventDefault();

            let username = document.getElementById("usernameLogInput").value;
            let password = document.getElementById("passwordLogInput").value;
            
            console.log(`Sending data: ${username}, ${password}`);
        
            loginUser(username, password).then((success) => {
                if (success) {
                    alert("Logowanie pomyślne!");
                }
                else {
                    alert("Logowanie nieudane!");
                }
            });

            resetLoginInputs();
        });

        clrLogBtn.addEventListener("click", event => {
            event.preventDefault();
            resetLoginInputs();
        });
    }
    
    createLogContainer();
});
