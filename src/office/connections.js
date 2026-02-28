
class Connections{
    onlineUsers = [];
    clientHandlers = [];

    connectSelf(userName, initials){
        this.onlineUsers.push(new UserInstance(userName, initials));
        console.log("Attempting to connect user: " + userName);
        console.log(JSON.stringify(this.onlineUsers));
        this.notifyClients();
    }

    addHandler(handler){
        this.clientHandlers.push(handler);
        return this.onlineUsers;
    }

    updateUserPosition(userName, x, y){
        userObj = this.onlineUsers.find(item => item.userName == userName);
        userObj.x = x;
        userObj.y = y;

        this.notifyClients();
    }
    
    notifyClients(){
        this.clientHandlers.forEach(handler => {
            handler(this.onlineUsers)
        })
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

const OfficeConnections = new Connections();
export { OfficeConnections };