document.addEventListener("DOMContentLoaded", e => {
    var btnLog = document.querySelector('.log-btn');
    var btnReg = document.querySelector(".reg-btn");
    var logForm = document.getElementById('login-form');
    var regForm = document.getElementById('register-form');
    var btnLogCancel = document.querySelector('.log-btn-cancel');
    var btnRegCancel = document.querySelector('.reg-btn-cancel');
    var spanFooterDate = document.getElementById('current-date');
    var inputRegPass = document.getElementsByClassName('reg-form-password');
    var inputRegPassValid = document.getElementsByClassName('reg-form-password-valid');

    var btnCheckPass = document.getElementById('check-pass');

    function loginUser(){
        btnLog.addEventListener("click", log => {
            logForm.style.display="flex";
            console.log("login");
        })
    }
    loginUser();

    function cancelLogUser(){
        btnLogCancel.addEventListener("click", logCancel => {
            logForm.style.display = "none";
            console.log("cancel login");
        })
    }
    cancelLogUser();

    function registerUser(){
        btnReg.addEventListener("click", reg => {
            regForm.style.display = "flex";
            console.log("register");
        })
    }
    registerUser();
    
    function cancelRegUser(){
        btnRegCancel.addEventListener("click", regCancel => {
            regForm.style.display = "none";
            console.log("cancel register");
        })
    }
    cancelRegUser();

    function currentDate(){
        const author = "Robert Zima &copy; "
        const date = new Date();
        let currentYear = date.getFullYear();
        console.log(currentYear);
        spanFooterDate.innerHTML=author+currentYear;
    }
    currentDate();

    function validationRegForm(){
        btnCheckPass.addEventListener("click", checkPass => {
            if(inputRegPass[0].value==inputRegPassValid[0].value){
                console.log("OK");
            }
            else{
                console.log("DIFFERENT PASSWORDS");
            }
        })
    }
    validationRegForm();
})