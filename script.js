document.addEventListener("DOMContentLoaded", e => {
    var btnLogin = document.querySelector('.log-btn');
    //var btnRegister = document.querySelector(".reg-btn");
    var btnLoginCancel = document.querySelector('.log-btn-cancel');
    var loginForm = document.getElementById('login-form');
    // var loginFormIsValid = document.getElementById('login-form');

    function loginUser(){
        btnLogin.addEventListener("click", login => {
            loginForm.style.display="flex";
            console.log("login");
        })
    }
    loginUser();

    function cancelLoginUser(){
        btnLoginCancel.addEventListener("click", cancel => {
            loginForm.style.display="none";
            console.log("cancel login");
        })
    }
    cancelLoginUser();

    // btnRegister.addEventListener("click", e=>{
    //     console.log("register");
    // })
})