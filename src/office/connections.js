

class Connections{
    onlineUsers = {};
    handlers = [];
    socket;
    connected;

    constructor(){
        this.connected = false;

        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = (event) => {
            console.log("Connection Opened Succesfully!");
            this.connected = true;
        }

        this.socket.onmessage = async (event) => {
            console.log(`Event recieved!`);
            const data = JSON.parse(await event.data.text());
            this.onlineUsers[data.userName] = data;
            this.notifyHandlers('temp', data.username, this.onlineUsers.values())
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
        //TODO: send data in websocket
    }

    notifyHandlers(eventType, from, data){
        this.handlers.forEach(handler => {handler(eventType, from, data)});
    }
    
}

const OfficeConnections = new Connections();
export { OfficeConnections };