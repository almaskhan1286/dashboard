// this file is dedicated for initilizing the user registration process by creating the instancces of the necessary classes and coordinating their interactions.

const registrationForm = document.getElementById("registrationForm");
const userManager = UserManager;

new UserRegistration(registrationForm, userManager);
