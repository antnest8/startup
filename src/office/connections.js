

class Connections{
    onlineUsers = {};
    handlers = [];
    socket;

    constructor(){
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    }
    
}

const OfficeConnections = new Connections();
export { OfficeConnections };