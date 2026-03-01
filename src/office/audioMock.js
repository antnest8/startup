

export function generateAudioList(){
        const testContext = new AudioContext();//creating generation context

        const audioElement = document.createElement("audio"); //creating test audio
        audioElement.crossOrigin = "anonymous";
        audioElement.src = "testAudio.m4a";
        audioElement.play();
       
        const testAudio = testContext.createMediaElementSource(audioElement); //creating nodes
        const audioStreamNode = testContext.createMediaStreamDestination();
        testAudio.connect(audioStreamNode);

        const audioPackage = {
            audio: audioStreamNode.stream,
            id:"otherDude",
        };

        return [audioPackage];
    }