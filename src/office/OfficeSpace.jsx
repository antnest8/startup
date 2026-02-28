import React from 'react';


export function OfficeSpace(props){
    //const fakeUser = new Object({initials: "YA", xPos: "50", yPos:"50"});
    const userList = props.userList; //replace this with live data from WebSocket mock
    const moveUser = props.moveUserFunc;
    //const testGainNode = props.gainNode;

    function calculateClick(event){
        const screenCoords = [event.clientX, event.clientY];
        const windowRect = document.getElementById("app-window").getBoundingClientRect();
        const relativeCoords = [screenCoords[0] - windowRect.x, screenCoords[1] - windowRect.y];

        const boundBounce = (relativeCoords) => {
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

    function renderUsers(props){
        
        console.log(`rendererTokenListSize: ${userList.length}`)

        const userTokens = userList.map((userObj, index) => <UserToken key={`token-${index}`} initials={userObj.initials} xPos={userObj.x} yPos={userObj.y}/>);
        return userTokens;
    }

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

    return (
        <figure style={dynamicStyle} className="size-[75px] translate-[-50%]"  id="user-1">
            <svg width="75" height="75">
                <circle stroke="#599259" strokeWidth="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
                <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">{initials}</text>
            </svg>
            <img className="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
        </figure>
    );
}
