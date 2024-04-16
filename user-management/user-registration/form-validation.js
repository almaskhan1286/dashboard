// This file is related to the validity of the user and validity functionality. we can add more functionalities in this file just like => email format validation, password strength validation, username format, unique email, password confirmation, terms of services agreement, CAPTCHA validation etc.

class FormValidator {
    static validate(username, email, password, confirmPassword) {
        if(!username || !email || !password) {
            throw new Error("All fields are required.")
        }

        if (username.length < 5) {
            throw new Error("Username atleast 5 characters long.")
        }

        if (!this.validateUsernameFormat(username)) {
            throw new Error("Invalid username format. Username only contain alphanumeric characters and underscores.")
        }

        if (password.length < 6) {
            throw new Error("Password should be at least 6 characters long.")
        }

        if (!this.validatePasswordStrength(password)) {
            throw new Error("Password must contain at least one uppercase letter, one lowercase letter and one special character.")
        }

        if (password !== confirmPassword) {
            throw new Error("Passwords don't match.")
        }
    }

    static validateUsernameFormat(username) {
        const usernamePattern = /^[a-zA-Z0-9_]+$/;
        return usernamePattern.test(username);
    }

    static validateEmailFormat(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    static validatePasswordStrength(password) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    }
}


document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    console.log(username);
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    try {
        FormValidator.validate(username, email, password, confirmPassword);
    } catch (error) {
        const errorMsg = document.createElement("div");
        errorMsg.textContent = error.message;
        errorMsg.style.color = "red";

        if (error.message.includes("username")) {
            document.querySelector(".usernameError").appendChild(errorMsg);
        } else if (error.message.includes("email")) {
            document.querySelector(".emailError").appendChild(errorMsg);
        } else if (error.message.includes("password")) {
            document.querySelector(".passwordError").appendChild(errorMsg);
        } else {
            console.error(error);
        }
        return; 
    }
})

