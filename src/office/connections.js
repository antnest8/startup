

class Connections{
    onlineUsers = {};
    handlers = [];
    socket;
    connected;
    pendingRequest;

    constructor(userName, initialData, setConnectionEstablished){
        this.connected = false;

        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        this.socket.onopen = (event) => {
            console.log(`Connection Opened Succesfully with userName: ${userName}`);
            this.connected = true;
            const initialMessage = {
                type: "init",
                userName: userName,
                data: initialData
            }
            this.socket.send(JSON.stringify(initialMessage));
            setConnectionEstablished(true);
            if(this.pendingRequest){
                this.sendCallData(this.pendingRequest)
                this.pendingRequest = null;
            }

        }

        this.socket.onmessage = async (msg) => {
            //console.log(`DEBUG Data received: ${msg.data}`)
            const data = JSON.parse(msg.data);


            if(data.type == 'movement'){
                this.onlineUsers[data.userName] = data.body;
                const msg = {
                    type:"movement",
                    data:Object.values(this.onlineUsers)
                }
                this.notifyHandlers(msg);
            }else if(data.type == "init"){
                this.onlineUsers[data.userName] = data.body;
                const msg = {
                    type:"init",
                    data:Object.values(this.onlineUsers)
                }
                this.notifyHandlers(msg);
            } else if(data.type == 'disconnection'){
                this.socket.close();
            } else if(data.type == "audio"){
                this.notifyHandlers(data);
            } else{
                console.log("Socket data recieved that was not typed!?!?!?!")
            }
        }

        this.socket.onclose = (event) => {
            console.log("Connection Closed Succesfully!");
            setConnectionEstablished("closed");
            const msg = {
                type:"audio",
                stage:"close",
            }
            this.notifyHandlers(msg);
            this.connected = false;
        }

    }

    registerHandler(handler){
        this.handlers.push(handler);
        console.log("recieved new handler");
    }

    sendUserData(newUserData){
        //console.log(`DEBUG sending coords: ${newUserData.x}, ${newUserData.y}`)
        this.socket.send(JSON.stringify(newUserData));
    }

    sendCallData(callData){
        if(!this.connected){
            this.pendingRequest = callData;
        } else{
            this.socket.send(JSON.stringify(callData));
        }
    }

    notifyHandlers(data){
        this.handlers.forEach(handler => {handler(data)});
    }

    closeConnection(){
        this.socket.close();
    }
    
}


export { Connections };