document.addEventListener("DOMContentLoaded", e => {
    var btnLogin = document.querySelector('.log-btn');
    //var btnRegister = document.querySelector(".reg-btn");
    var btnLoginCancel = document.querySelector('.log-btn-cancel');
    var loginForm = document.getElementById('login-form');
    var loginFormIsValid = document.getElementById('login-form').classList;

    function loginUser(){
        btnLogin.addEventListener("click", login => {
            loginForm.classList.remove("display-none");
            loginForm.classList.add("display");
            console.log("login");
        })
    }
    loginUser();

    function cancelLoginUser(){
        btnLoginCancel.addEventListener("click", cancel => {
            loginForm.classList.remove("display");
            loginForm.classList.add("display-none");
            console.log("cancel login");
        })
    }
    cancelLoginUser();

    // if(loginFormIsValid=="display-none"){
    //     loginUser();
    // }
    // else if(loginFormIsValid=="display"){
    //     cancelLoginUser();
    // };

    // btnRegister.addEventListener("click", e=>{
    //     console.log("register");
    // })
})