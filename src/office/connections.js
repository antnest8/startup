import { UserInstance } from "./userObj";

class Connections{
    onlineUsers = [];
    handler;

    constructor(){
        const testUser = {
            userName: "otherDude",
            initials: "OD",
            displayName: "Other Dude!",
            x : 50,
            y : 50,
            isTalking: false, //fix later
        }
        setInterval(()=>{
            //updateMovement
            if(this.handler){
                testUser.x = Math.random() * 100;
                testUser.y = Math.random() * 100;
                this.handler([testUser])
            }
        },10000)
    }

    connectSelf(userData, handler){
        console.log("OFFICE-CONNECTIONS: User Connected");
        this.handler = handler;
    }

    pushData(userData){
        console.log("OFFICE-CONNECTIONS: Data Recieved");
    }
    
}

const OfficeConnections = new Connections();
export { OfficeConnections };