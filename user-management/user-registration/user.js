// here we define the user with their different properties. we also enhance the functionnality => getter & setter methods to access and modifty the user's properties, comprehensive profile information, avatar, serialization and deserialization( implement the methods to serialize the user object to json format and again into object), password reset, account status(active, deleted or suspended)

class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password
    }    
}