

class Connections{
    onlineUsers = {};
    handlers = [];
    socket;
    connected;

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
        }

        this.socket.onmessage = async (msg) => {
            const data = JSON.parse(msg.data);
            //console.log(`DEBUG Data received: ${JSON.stringify(data)}`)
            if(data.type == 'movement'){
                //console.log(`DEBUG movement data detected!`)
                this.onlineUsers[data.userName] = data.body;
            } else if(data.type == 'disconnection'){
                console.log(`${data.userName} disconnected.`)
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