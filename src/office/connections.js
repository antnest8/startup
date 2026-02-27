
export class Connections{
    static onlineUsers = [];

    static connectUser(userName, initials){
        this.onlineUsers.push(new UserInstance(userName, initials));
        console.log("Attempting to connect user: " + userName);
        console.log(JSON.stringify(this.onlineUsers))
    }

    static getUsers(){
        return this.onlineUsers;
    }

    static updateUserPosition(userName, x, y){
        userObj = this.onlineUsers.find(item => item.userName == userName);
        userObj.x = x;
        userObj.y = y;
    }

}

class UserInstance{
    userName;
    initials;
    x;
    y;
    isTalking;

    constructor(userName, initials){
        this.userName = userName;
        this.x = 0;
        this.y = 0;
        this.initials = initials;
        this.isTalking = false;
    }

}