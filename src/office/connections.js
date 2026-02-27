
export class Connections{
    static onlineUsers = [];

    static connectUser(userName){
        this.onlineUsers.append(new UserInstance(userName));
        console.log("Attempting to connect user: " + userName);
        console.log(JSON.stringify(this.onlineUsers))
    }

    static updateUserPosition(userName, x, y){
        userObj = this.onlineUsers.find(item => item.userName == userName);
        userObj.x = x;
        userObj.y = y;
    }

}

class UserInstance{
    userName;
    x;
    y;
    isTalking;

    constructor(userName){
        this.userName = userName;
        this.x = 0;
        this.y = 0;
        this.isTalking = false;
    }

}