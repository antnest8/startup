import React from 'react';


export function OfficeSpace(props){
    //const fakeUser = new Object({initials: "YA", xPos: "50", yPos:"50"});
    const userList = props.userList; //replace this with live data from WebSocket mock
    const moveUser = props.moveUserFunc;
    const audioList = props.audioList;
    const [userGains, setUserGains] = React.useState({})
    //console.log(`DEBUG-normal audioList.length: ${audioList.length}`)



    function calculateClick(event){
        const screenCoords = [event.clientX, event.clientY];
        const windowRect = document.getElementById("app-window").getBoundingClientRect();
        const relativeCoords = [screenCoords[0] - windowRect.x, screenCoords[1] - windowRect.y];

        function boundBounce(relativeCoords){
            if(relativeCoords[0] < 37){
                relativeCoords[0] = 37;
            }
            if(relativeCoords[1] < 37){
                relativeCoords[1] = 37;
            }
            if(relativeCoords[0] + 37 > windowRect.width){
                relativeCoords[0] = windowRect.width - 38;
            }
            if(relativeCoords[1] + 37 > windowRect.height){
                relativeCoords[1] = windowRect.height - 38;
    }
}

        boundBounce(relativeCoords);
        const normalizedCoords = [relativeCoords[0] / windowRect.width * 100, relativeCoords[1] / windowRect.height * 100]
        console.log("Click Detected! coords: " + JSON.stringify(normalizedCoords));
        moveUser(normalizedCoords);
    }

    function adjustGains(){
        for(const [key, obj] of Object.entries(userGains)){
            const userObj = userList.find((userObj)=>userObj.userName == key);
            if(userObj){
                obj.gain.value = calcProximity(userList[0], userObj);
            }
        }
    }

    function renderUsers(props){
        
        console.log(`rendererTokenListSize: ${userList.length}, #ofTalkingUsers: ${Object.keys(userGains).length}`)
        adjustGains();

        const userTokens = userList.map((userObj, index) => <UserToken key={`token-${index}`} isTalking={userObj.isTalking} initials={userObj.initials} xPos={userObj.x} yPos={userObj.y}/>);
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
            //console.log(`DEBUG-userGains print: ${JSON.stringify(userGains)}`)
            context.createMediaStreamSource(soundPackage.audio)
                .connect(userGain)
                .connect(context.destination);
        })
        setUserGains(tempGains)

        return () => {
            tempContexts.forEach(context=>context.close());
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
    //const userName = props.userName;
    const dynamicStyle = {
        left: `${props.xPos}%`,
        top: `${props.yPos}%`,
        position: "absolute",
        transitionProperty:"left top",
        transitionDuration:"1s"
    };

    const displayVal = props.isTalking ? "block": "none"
    const micStyle = {
        display: displayVal,
    }

    return (
        <figure style={dynamicStyle} className="size-[75px] translate-[-50%]"  id="user-1">
            <svg width="75" height="75">
                <circle stroke="#599259" strokeWidth="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
                <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">{initials}</text>
            </svg>
            <img style={micStyle} className="size-[20px] absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
        </figure>
    );
}



function calcProximity(localUser, otherUser){
    const maxDistance = 80;
    const distance = Math.sqrt((localUser.x - otherUser.x)**2 + (localUser.y - otherUser.y)**2);
    const volume = Math.max(0, 1 - (Math.log(0.1 + distance) / Math.log(0.1 + maxDistance)));
    return volume;
}

