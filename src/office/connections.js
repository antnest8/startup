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
            isTalking: true, //fix later
        }
        setInterval(()=>{
            //updateMovement
            if(this.handler){
                testUser.x = Math.random() * 90 + 5;
                testUser.y = Math.random() * 90 + 5;
                this.handler([testUser])
            }
        },10000)
    }

    connectSelf(userData, handler){
        console.log("OFFICE-CONNECTIONS: User Connected");
        this.handler = handler;
        const testUser = {
            userName: "otherDude",
            initials: "OD",
            displayName: "Other Dude!",
            x : 25,
            y : 25,
            isTalking: true, //fix later
        }
        handler([testUser])
    }

    pushData(userData){
        console.log("OFFICE-CONNECTIONS: Data Recieved");
    }
    
}

const OfficeConnections = new Connections();
export { OfficeConnections };