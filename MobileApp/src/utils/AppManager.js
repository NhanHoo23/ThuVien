class AppManager {
    constructor() {
        if (!AppManager.instance) {
            this.currentUser = null;
            AppManager.instance = this;
        }
        return AppManager.instance;
    }


    static shared = new AppManager();

    setCurrentUser(user) {
        this.currentUser = user;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 0;
    }
}


export default AppManager;