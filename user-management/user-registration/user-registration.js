// Handle user-registration process related to get the input data from the registration form and manage it, check validating etc opening and closing the form and move to the next sign-in page etc, but we can add more functionality in this file as => social media integration include options for users to register using socail accounts, email availability check, confirmation email etc.

class UserRegistration {
    constructor(form, userManager) {
        this.form = form;
        this.userManager = userManager;
        this.init()
    }

    // this method sets up the event listener for the form's submit event
    init() {
        this.form.addEventListener("submit", this.handleRegistration.bind(this));
    }

    handleRegistration(event) {
        event.preventDefault();

        const username = this.form.querySelector("#username").value;
        const email = this.form.querySelector("#email").value;
        const password = this.form.querySelector("#password").value;
        const confirmPassword = this.form.querySelector("#confirmPassword").value;

        try {
            FormValidator.validate(username, email, password, confirmPassword);

            const user = new User(username, email, password, confirmPassword);
            this.userManager.registerUser(user);

            this.form.reset();
            this.hideForm();
            alert("Registration Successful! Please sign in to proceed.")
            window.location.replace("../login-user/sign-in.html");
            // ="../login-user/sign-in.html

        } catch (error) {
            alert(error.message);
        }
    }

    hideForm() {
        this.form.style.display = "none";
    }
}

// Initialize the registration process..

// const registrationForm = document.getElementById("registrationForm");
// const userManager = UserManager;
// new UserRegistration(registrationForm, userManager);