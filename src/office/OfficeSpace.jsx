import React from 'react';


export function OfficeSpace(props){
    const fakeUser = new Object({initials: "YA", xPos: "50", yPos:"50"});
    const userList = [fakeUser]; //replace this with live data from WebSocket mock

    function renderUsers(props){

        console.log(`rendererTokenListSize: ${userList.length}`)

        const userTokens = userList.map((userObj, index) => <UserToken key={`token-${index}`} initials={userObj.initials} xPos={userObj.xPos} yPos={userObj.yPos}/>);
        return userTokens;
    }

    return(
    <div className="relative grow">
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
    };

    return (
        <figure style={dynamicStyle} className="size-[75px]"  id="user-1">
            <svg width="75" height="75">
                <circle stroke="#599259" strokeWidth="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
                <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">{initials}</text>
            </svg>
            <img className="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
        </figure>
    );
}
