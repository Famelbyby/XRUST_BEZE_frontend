class User {
    private userID: string;

    constructor() {
        this.userID = "67e3b36b9a36154096b4bbea";
    }

    getUserID: () => string = () => {
        return this.userID;
    }
};

export default new User;