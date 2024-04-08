class UserManager {
    static signIn(usernameOrEmail, password) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

        for (const storedUser of storedUsers) {
            if(
                (storedUser.username === usernameOrEmail || storedUser.email === usernameOrEmail) && storedUser.password === password
            ) {
                alert("SignIn successful!");
                window.location.replace("/Product_Management/product_management.html");
                return;
            }
        }

        alert("Invalid username/email or password. Please try again.");
    }
}

document.querySelector("#signInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usernameOrEmail = document.querySelector("#usernameOrEmail").value;
    const password = document.querySelector("#password").value;

    if (!usernameOrEmail || !password) {
        alert("Please fill both Email & Password fields.");
        return;
    }

    UserManager.signIn(usernameOrEmail, password);
});