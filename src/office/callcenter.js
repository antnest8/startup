

class Audiocall{
    callStage;
    peerConnection;
    socketConnection;

    constructor(socketConnection){
        this.callStage = "init";
        this.socketConnection = socketConnection;
        this.socketConnection.registerHandler((msg) => {this.audioHandler(msg)})
        this.requestCall();




    }

    async requestCall(){
        this.socketConnection.sendCallData({type:"audio",stage:"request-call"})
    }

    async makeCall(){
        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);
        this.getIce();
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.callStage = "listening";
        this.socketConnection.sendCallData({'offer': offer, type: "audio", stage:'offer'});
    }

    audioHandler(msg){
        if(msg.type == "audio"){
            console.log("Recieved audio data");
            if(msg.stage == 'answer' && this.callStage == "listening"){
                this.recieveAnswer(msg.answer);
            } else if(msg.stage == 'offer' && this.callStage == "listening"){
                this.recieveOffer(msg.offer);
            }else if(msg.stage == 'send-ice' && this.callStage == "first-contact"){
                this.recieveIce(msg.iceCandidate);
            }else if(this.callStage == "init" && msg.stage == "init-call"){
                if(msg.role == "caller"){
                    this.makeCall();
                } else{
                    this.callStage = "listening";
                }
            }
        }
    }

    async recieveOffer(offer){
        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);
        this.getIce();
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.socketConnection.sendCallData({'answer': answer, stage: 'first-contact', type:"audio"});

    }

    async recieveAnswer (answer){
        const remoteDesc = new RTCSessionDescription(answer);
        await this.peerConnection.setRemoteDescription(remoteDesc);
        this.callStage = "first-contact"
    }

    async getIce(){
        // Listen for local ICE candidates on the local RTCPeerConnection
        this.peerConnection.addEventListener('icecandidate', event => {
            if (event.candidate) {
                this.socketConnection.sendCallData({iceCandidate: event.candidate, type: "audio", stage: "send-ice"});
            }
        });
    }

    async recieveIce (iceCandidate){

        try {
            await this.peerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }

        // Listen for connectionstatechange on the local RTCPeerConnection
        this.peerConnection.addEventListener('connectionstatechange', event => {
            if (this.peerConnection.connectionState === 'connected') {
                console.log("WebRTC connection complete!");
                this.callStage = "connection-established"
            }
        });

    }


}