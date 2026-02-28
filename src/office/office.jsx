import React from 'react';
import { NavBarButton } from '../nav/barButtons';
import { OfficeConnections } from './connections';

export function Office(props){

    const userName = props.userName;
    const userData = JSON.parse(localStorage.getItem(userName + "_Data"));

    React.useEffect(() => {
        OfficeConnections.connectSelf(userName, userData.initials);
    },[]);

    

    return (
        <div className="flex flex-col grow">
            <header className="bg-stone-900 flex flex-row justify-end min-h-10">
                <div className="flex grow">
                    <h1 className="font-semibold font-[rubik] border-b-2 text-teal-400 m-1 text-5xl max-h-[0.9em]">OfficeTalk</h1>
                </div>
                <NavBarButton DisText="Logout" dest="/"/>
                <NavBarButton DisText="Settings" dest="/settings" />
                <figure className="size-[50px] mx-3" id="user-1">
                        <svg className="profile-token" width="50" height="50">
                            <circle stroke="#009200" strokeWidth="3" cx="25" cy="25" r="23" fill="#00BF00" />
                            <text x="25" y="30" fontSize="20" textAnchor="middle" fill="white">{userData.initials}</text>
                        </svg>
                    </figure>
            </header>
            <main className="flex grow bg-stone-800">
                <aside className="bg-stone-900/70 p-2 px-4 flex flex-col justify-top min-w-[25dvw]">
                    <ul className="rounded-md bg-stone-800 p-1 list-disc list-inside">
                        <h3 className="text-stone-500">Active Users</h3>
                        <li className="text-lime-400">You</li>
                        <li className="text-stone-300">User 2</li>
                        <li className="text-stone-300">User 3</li>
                    </ul>
                </aside>
                <OfficeSpace/>
            </main>
        </div>
    )
}

function OfficeSpace(props){
    const returnedList = OfficeConnections.addHandler(handleConnectionData);
    const [userList, setUserList] = React.useState(returnedList);

    function handleConnectionData(newList){
        console.log("Handler called with " + JSON.stringify(newList))
        setUserList(newList);
    }

    function renderUsers(props){
        const userTokens = [];

        console.log(`rendererTokenListSize: ${userList.length}`)

        userList.forEach((userObj) => {
            userTokens.push(
                <UserToken initials={userObj.initials} x={userObj.x} y={userObj.y}/>
            )
        })

        return userTokens;
    }

    return(
    <div className="application-window">
        {renderUsers()}
    </div>
    );
}


function UserToken(props){
    const initials = props.initials;
    //const userName = props.userName;
    const x = ` bottom-${props.x}/100`;
    const y = ` right-${props.y}/100`;


    return (
        <figure className={"absolute size-[75px]" + x + y} id="user-1">
            <svg width="75" height="75">
                <circle stroke="#599259" strokeWidth="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
                <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">{initials}</text>
            </svg>
            <img className="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
        </figure>
    );
}



//for safekeeping of my hard made styling

/*

<div className="application-window">
    <figure className="absolute top-3/5 left-30/100 size-[75px]" id="user-1">
        <svg width="75" height="75">
            <circle stroke="#599259" strokeWidth="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
            <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">You</text>
        </svg>
        <img className="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
    </figure>
    <figure className="size-[75px] absolute top-1/3 left-3/5" id="user-2">
        <svg width="75" height="75">
            <circle stroke="#925959" strokeWidth="3" cx="37" cy="37" r="30" fill="#BF8F8F" />
            <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">U2</text>
        </svg>
        <audio src="https://radioteca.net/media/uploads/audios/%25Y_%25m/never gonna give you up - astley rick top 20.mp3"></audio>
        <img className="size-[20px] absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
    </figure>
    
    <figure className="absolute size-[75px] top-18/100 left-40/100" id="user-3">
        <svg width="75" height="75">
            <circle stroke="#595992" strokeWidth="3" cx="37" cy="37" r="30" fill="#6F6FDF" />
            <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">U3</text>
        </svg>
        <img className="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
    </figure>
    
</div>
*/