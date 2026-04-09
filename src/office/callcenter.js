

class AudioCall{
    callStage;
    peerConnection;
    socketConnection;
    audioPackages = [];
    setCallEstablished;
    externalUser;
    beginRecievingIce;
    stopIceUntilReady;

    constructor(socketConnection, setCallEstablished, setAudioList){
        this.callStage = "init";
        this.socketConnection = socketConnection;
        this.setCallEstablished = setCallEstablished;
        this.setAudioList = setAudioList;
        this.socketConnection.registerHandler((msg) => {this.audioHandler(msg)})
        this.requestCall();

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
                this.externalUser = msg.userName;
                if(msg.role == "caller"){
                    this.makeCall();
                } else{
                    this.callStage = "listening";
                }
            }else if(msg.stage == "close"){
                if(this.peerConnection){
                    this.peerConnection.close();
                    console.log(`WebRTC closing status: ${this.peerConnection.connectionState}`)
                    delete this.peerConnection;
                    //Note: I don't think I need to reset anything else since a new AudioCall object will be created upon remounting.
                }

            }
        }
    }

    async requestCall(){
        this.socketConnection.sendCallData({type:"audio",stage:"request-call"})
    }

    async makeCall(){
        this.stopIceUntilReady = new Promise(resolve => {
            this.beginRecievingIce = resolve;
        })

        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);
        await this.setAudioChannels();
        await this.getIce();
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.callStage = "listening";
        this.socketConnection.sendCallData({'offer': offer, type: "audio", stage:'offer'});
    }

    async recieveOffer(offer){
        this.stopIceUntilReady = new Promise(resolve => {
            this.beginRecievingIce = resolve;
        })

        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);
        await this.setAudioChannels();
        await this.getIce();
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        this.beginRecievingIce();
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.socketConnection.sendCallData({'answer': answer, stage: 'answer', type:"audio"});

    }

    async recieveAnswer (answer){
        const remoteDesc = new RTCSessionDescription(answer);
        await this.peerConnection.setRemoteDescription(remoteDesc);
        this.beginRecievingIce();
        this.callStage = "first-contact"
    }

    async setAudioChannels(){
        const audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
        audioStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, audioStream);
        });
        this.peerConnection.addEventListener('track', event => {
            const audioPackage = {
                audio: event.streams[0],
                id:this.externalUser,
            };
            this.audioPackages.push(audioPackage);

            this.setAudioList(this.audioPackages)
        });

        console.log("AudioChannels set up!");
    }

    async getIce(){
        // Listen for local ICE candidates on the local RTCPeerConnection
        this.peerConnection.addEventListener('icecandidate', event => {
            if (event.candidate) {
                this.socketConnection.sendCallData({iceCandidate: event.candidate, type: "audio", stage: "send-ice"});
            }
        });
        // Listen for connectionstatechange on the local RTCPeerConnection
        this.peerConnection.addEventListener('connectionstatechange', event => {
            if (this.peerConnection && this.peerConnection.connectionState === 'connected') {
                console.log("WebRTC connection complete!");
                this.callStage = "connection-established"
                this.setCallEstablished(true);
            }
            if(this.peerConnection && (this.peerConnection.connectionState === "failed" || 
                this.peerConnection.connectionState === "closed" || 
                this.peerConnection.connectionState === "disconnected")){
                console.log("WebRTC peer connection disconnected... cleaning up");
                this.socketConnection.closeConnection();
            }
        });
    }

    async recieveIce (iceCandidate){

        try {
            await this.stopIceUntilReady;
            await this.peerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
            console.log('Error adding received ice candidate', e);
        }

    }

}

export { AudioCall}