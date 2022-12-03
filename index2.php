<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <script src="./script.js"></script>
    <title>Management App</title>
</head>
<body>
    <div class="log-reg-box">
        <header>
            <!-- Delete span after create App logo -->
            <span>App logo</span>
            <!-- <img src="" alt="App logo"> -->
        </header>
        <div class="log-box">
            <button class="log-btn">Sign in</button>
        </div>
        <div class="reg-box">
            <button class="reg-btn">Sign up</button>
        </div>
    </div>
    <div id="login-form">
        <form action="" method="post" class="login-form-body">
            <div class="login-form-content">
                <label for="username" class="username-label">Username</label>
                <input type="text" name="username" placeholder="Enter username" class="username-input" required>
                <label for="username" class="password-label">Password</label>
                <input type="password" name="password" placeholder="Enter password" class="password-input" required>
                <button type="submit" class="log-btn-form">Login</button>
            </div>
        </form>
        <div class="login-form-footer">
            <button type="button" class="log-btn-cancel">Cancel</button>
            <span>Forgot <a href="#">password</a>?</span>
        </div>
    </div>
    <div id="register-form">
        <form action="site1.php" method="post" class="register-form-body">
            <div class="register-form-content">
                <label for="email" class="email-label">Email</label>
                <input type="email" name="email" placeholder="Enter email" required>

                <label for="username" class="username-label">Username</label>
                <input type="text" name="username" placeholder="Enter username" required>

                <label for="password" class="password-label">Password</label>
                <input type="password" name="password" placeholder="Enter password" class="reg-form-password" required>

                <label for="password-confirm" class="password-label">Confirm password</label>
                <input type="password" name="password-confirm" placeholder="Confirm password" class="reg-form-password-valid" required>

                <button type="submit" class="reg-btn-form">Register</button>
                <button id="check-pass">Check pass</button>
            </div>
        </form>
        <div class="register-form-footer">
            <div class="register-form-footer-left">
                <button type="button" class="reg-btn-cancel">Cancel</button>
            </div>
            <div class="register-form-footer-right">
                <input type="checkbox">I accept the terms and conditions</input>
            </div>
        </div>
    </div>
    <footer>
        <span>Akademia im. Jakuba z Paradyża w Gorzowie Wlkp.</span>
        <span id="current-date"></span>
    </footer>
</body>
</html>

<?php

?>