

class AudioCall{
    callStage;
    peerConnection;
    socketConnection;
    audioList = [];
    setConnectionEstablished;
    externalUser;

    constructor(socketConnection, setConnectionEstablished){
        this.callStage = "init";
        this.socketConnection = socketConnection;
        this.setConnectionEstablished = setConnectionEstablished;
        this.socketConnection.registerHandler((msg) => {this.audioHandler(msg)})
        this.requestCall();

    }

    async requestCall(){
        this.socketConnection.sendCallData({type:"audio",stage:"request-call"})
    }

    async makeCall(){
        const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
        this.peerConnection = new RTCPeerConnection(configuration);
        await this.setAudioChannels();
        await this.getIce();
        const audioStream = await navigator.mediaDevices.getUserMedia({audio:true});
        audioStream.getTracks().forEach(track => { //TODO: figure out why I have to getTracks()
            this.peerConnection.addTrack(track, audioStream);
        });
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.callStage = "listening";
        this.socketConnection.sendCallData({'offer': offer, type: "audio", stage:'offer'});
    }

    audioHandler(msg){
        if(msg.type == "audio"){
            console.log("Recieved audio data");
            if(msg.stage == 'answer' && this.callStage == "listening"){
                console.log("DEBUG: other caller's id: " + msg.userName);
                this.externalUser = msg.userName;
                this.recieveAnswer(msg.answer);
            } else if(msg.stage == 'offer' && this.callStage == "listening"){
                console.log("DEBUG: other caller's id: " + msg.userName);
                this.externalUser = msg.userName;
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
        await this.setAudioChannels();
        await this.getIce();
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.socketConnection.sendCallData({'answer': answer, stage: 'answer', type:"audio"});

    }

    async recieveAnswer (answer){
        const remoteDesc = new RTCSessionDescription(answer);
        await this.peerConnection.setRemoteDescription(remoteDesc);
        this.callStage = "first-contact"
    }

    async setAudioChannels(){
        const audioStream = await navigator.mediaDevices.getUserMedia({audio: true});
        audioStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, audioStream);
        });
        this.peerConnection.addEventListener('track', event => {
            console.log("Receiving external input audio!");
            const audioPackage = {
                audio: event.streams[0],
                id:this.externalUser,
            };
            this.audioList.push(audioPackage);
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
            if (this.peerConnection.connectionState === 'connected') {
                console.log("WebRTC connection complete!");
                this.callStage = "connection-established"
                this.setConnectionEstablished(true);
            }
        });
    }

    getAudioList(){
        return this.audioList;
    }

    async recieveIce (iceCandidate){

        try {
            await this.peerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
            console.error('Error adding received ice candidate', e);
        }

    }

}

export { AudioCall}