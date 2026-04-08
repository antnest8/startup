

class Connections{
    onlineUsers = {};
    handlers = [];
    socket;
    connected;

    constructor(userName){
        this.connected = false;

        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.userName = userName;

        this.socket.onopen = (event) => {
            console.log("Connection Opened Succesfully!");
            this.connected = true;
        }

        this.socket.onmessage = async (msg) => {
            console.log(`Event recieved!`);
            const data = JSON.parse(await msg.data.text());
            if(data.type == 'movement'){
                this.onlineUsers[data.userName] = data.body;
            } else if(data.type == 'disconnection'){
                delete this.onlineUsers[data.userName];
            }

            this.notifyHandlers(Object.values(this.onlineUsers))
        }

        this.socket.onclose = (event) => {
            console.log("Connection Closed Succesfully!");
            this.connected = false;
        }

    }

    registerHandler(handler){
        this.handlers.push(handler);
        console.log("recieved new handler");
    }

    sendUserData(newUserData){
        console.log(`User Data recieved from ${newUserData.userName}`);
        this.socket.send(JSON.stringify(newUserData));
    }

    notifyHandlers(data){
        this.handlers.forEach(handler => {handler(data)});
    }

    closeConnection(){
        this.socket.close();
    }
    
}


export { Connections };