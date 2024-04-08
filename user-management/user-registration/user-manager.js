// Store user information or registration creadential into local storage, we can add more functionalities in this file just like => user authentication, user update profile, user deletion, user listing which helpful for administrative purposes, user data validation, error handling during registration purposes, event logging to record user registration events or other important user-related actions for auditing purposes, user role management for giving permission to some resources or not, email verification etc.

class UserManager {
    static registerUser(user) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users))
    }
}