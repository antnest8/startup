import React from 'react';
import hark from 'hark';

const TOKENSIZE = 37; // I do need to manually input this value in the className since tailwind doesn't do styling in runtime.

export function OfficeSpace(props){
    //const fakeUser = new Object({initials: "YA", xPos: "50", yPos:"50"});
    const userList = props.userList; //replace this with live data from WebSocket mock
    const moveUser = props.moveUserFunc;
    const audioList = props.audioList;
    const [userGains, setUserGains] = React.useState({})
    const vadList = React.useRef([]);



    function calculateClick(event){
        const screenCoords = [event.clientX, event.clientY];
        const windowRect = document.getElementById("app-window").getBoundingClientRect();
        const relativeCoords = [screenCoords[0] - windowRect.x, screenCoords[1] - windowRect.y];

        function boundBounce(relativeCoords){
            if(relativeCoords[0] < TOKENSIZE / 2){
                relativeCoords[0] = TOKENSIZE / 2;
            }
            if(relativeCoords[1] < TOKENSIZE / 2){
                relativeCoords[1] = TOKENSIZE / 2;
            }
            if(relativeCoords[0] + TOKENSIZE / 2 > windowRect.width){
                relativeCoords[0] = windowRect.width - TOKENSIZE / 2;
            }
            if(relativeCoords[1] + TOKENSIZE / 2 > windowRect.height){
                relativeCoords[1] = windowRect.height - TOKENSIZE / 2;
            }
        }

        boundBounce(relativeCoords);
        const normalizedCoords = [relativeCoords[0] / windowRect.width * 100, relativeCoords[1] / windowRect.height * 100]
        moveUser(normalizedCoords);
    }

    function adjustGains(){
        for(const [key, obj] of Object.entries(userGains)){
            const userObj = userList.find((userObj)=>userObj.userName == key);
            if(userObj){
                obj.gain.value = calcProximity(userList[0], userObj);
            } else {
                obj.gain.value = 0;
            }
        }
    }

    function renderUsers(props){
    
        adjustGains();

        const userTokens = userList.map((userObj, index) => <UserToken key={`token-${index}`} isTalking={userObj.isTalking} initials={userObj.initials} userImage={userObj.userImage} xPos={userObj.x} yPos={userObj.y}/>);
        return userTokens;
    }

    React.useEffect(()=>{
        const tempGains = {}
        const tempContexts = []
        //console.log(`DEBUG-OfficeSpace is mounting with ${audioList.length} audio streams`)
        audioList.forEach(soundPackage=>{
            const context = new AudioContext();
            tempContexts.push(context);
            const userGain = context.createGain();
            //console.log(`DEBUG-soundPackageID: ${soundPackage.id}`)
            tempGains[soundPackage.id] = userGain;

            
            const userObj = userList.find((userObj)=>userObj.userName == soundPackage.id);
            const userVAD = hark(soundPackage.audio.clone(), {audioContext: context});
            userVAD.on("speaking", ()=>{
                userObj.isTalking = true;
                console.log(`DEBUG: ${soundPackage.id} is talking`);
            });
            userVAD.on("stopped_speaking", ()=>{
                userObj.isTalking = false;
                console.log(`DEBUG: ${soundPackage.id} stopped talking`)
            })
            vadList.current.push(userVAD);

            //console.log(`DEBUG-userGains print: ${JSON.stringify(userGains)}`)
            context.createMediaStreamSource(soundPackage.audio)
                .connect(userGain)
                .connect(context.destination);
        })
        setUserGains(tempGains)

        return () => {
            tempContexts.forEach(context=>context.close());
            vadList.current.forEach(vad=>vad.stop());
        }
    },[audioList])

    return(
    <div id="app-window" className="relative grow" onClick={calculateClick}>
        {renderUsers()}
    </div>
    );
}


function UserToken(props){
    const initials = props.initials;
    const userImage = props.userImage;
    //const userName = props.userName;
    const dynamicStyle = {
        left: `${props.xPos}%`,
        top: `${props.yPos}%`,
        position: "absolute",
        transitionProperty:"left top",
        transitionDuration:"1s"
    };

    //console.log(userImage);

    const displayVal = props.isTalking ? "block": "none"
    const micStyle = {
        display: displayVal,
    }

    return (
        <figure style={dynamicStyle} className="size-[37px] translate-[-50%]" id="user-1">
            <div className="size-[32px]" dangerouslySetInnerHTML={userImage} />
            <img style={micStyle} className="size-[20px] absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
        </figure>
    );
}

/*
<img width="65" height="65" type="image/svg+xml" src={userImage} />


<figure style={dynamicStyle} className="size-[75px] translate-[-50%]"  id="user-1">
    <svg width="75" height="75">
        <circle stroke="#599259" strokeWidth="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
        <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">{initials}</text>
    </svg>
    <img style={micStyle} className="size-[20px] absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
</figure>
*/


function calcProximity(localUser, otherUser){
    const maxDistance = 40;
    const distance = Math.sqrt((localUser.x - otherUser.x)**2 + (localUser.y - otherUser.y)**2);
    const volume = Math.max(0, 1 - (Math.log(0.1 + distance) / Math.log(0.1 + maxDistance)));
    return volume;
}

