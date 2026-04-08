import React from 'react';
import { NavBarButton } from '../nav/barButtons';
import { Connections } from './connections';
import { OfficeSpace } from './OfficeSpace';
import { generateAudioList } from './audioMock';

export function Office(props){
    const userName = props.userName;
    const userData = React.useRef("loading"); 
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [acceptConnection, setAcceptConnection] = React.useState(false);
    const [clientCoords, setClientCoords] = React.useState([50, 50]);
    const [otherUsers, setOtherUsers] = React.useState([]);
    const [audioList, setAudioList] = React.useState([]);
    const [officeConnections, setOfficeConnections] = React.useState(null)

    function makeUserObj(coords=clientCoords){
        return {
            userName: userName,
            displayName: userData.current.displayName,
            initials: userData.current.initials,
            userImage: userData.current.image,
            x : clientCoords[0],
            y : clientCoords[1],
            isTalking: false, //fix later
        };
    }
    var userList = [makeUserObj(), ...otherUsers];

    function handleData(newData){

        userList = [makeUserObj(), ...otherUsers];
        //console.log("DEBUG: userList" + JSON.stringify(userList));
        setOtherUsers(newData);
        //console.log("handleData recieved data!: " + JSON.stringify(newData));

    }

    function moveUser(newCoords){
        const localRenderData = makeUserObj(newCoords);

        userList = [localRenderData, ...otherUsers];
        officeConnections.sendUserData(localRenderData);
        setClientCoords(newCoords);
    }

    React.useEffect(()=>{
        const mountComponent = async () => {
            const response = await fetch('api/user/data');
            if(response.status == 200){
                const resBody = await response.json();
                const tokenRes = await fetch("https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=" + resBody.initials + "&radius=50");
                const imageData = {__html: await tokenRes.text()};
                //console.log(imageData)
                resBody.image = imageData;
                userData.current = resBody;
                setDataLoaded(true);
            }
            console.log("Mounting Office completed with username: " + userName)
        }
        mountComponent();


    },[])

    React.useEffect(()=>{

        if(acceptConnection){
            const connection = new Connections(userName, makeUserObj())
            setOfficeConnections(connection);

            connection.registerHandler(handleData);
            setAudioList(generateAudioList());
        }
        //return () => {officeConnections.closeConnection()};
    }, [acceptConnection])


    if(userData.current == "loading"){
        console.log("Office Loading Screen Rendered")
        return (
            <div>
                <LoadingData userImage={userData.current.image}/>
            </div>
        );

    }

    return (
        <div className="flex flex-col grow">
            <header className="bg-stone-900 flex flex-row justify-end min-h-10">
                <div className="flex grow">
                    <h1 className="font-semibold font-[rubik] border-b-2 text-teal-400 m-1 text-5xl max-h-[0.9em]">OfficeTalk</h1>
                </div>
                <NavBarButton DisText="Logout" dest="/"/>
                <NavBarButton DisText="Settings" dest="/settings" />
                <figure className="size-[50px] mx-3" id="user-1">
                        <div dangerouslySetInnerHTML={userData.current.image} />
                    </figure>
            </header>
            <main className="flex grow bg-stone-800">
                <ActiveUsers userName={userName} userList={userList}/>
                {acceptConnection ? <OfficeSpace userList={userList} moveUserFunc={moveUser} audioList={audioList}/> : <Unconnected setAcceptConnection={setAcceptConnection}/>}
            </main>
        </div>
    )
}

function LoadingData(props){
    const userImage = props.userImage;
    return (
        <div className="flex flex-col grow">
            <header className="bg-stone-900 flex flex-row justify-end min-h-10">
                <div className="flex grow">
                    <h1 className="font-semibold font-[rubik] border-b-2 text-teal-400 m-1 text-5xl max-h-[0.9em]">OfficeTalk</h1>
                </div>
                <NavBarButton DisText="Logout" dest="/"/>
                <NavBarButton DisText="Settings" dest="/settings" />
                <figure className="size-[50px] mx-3" id="user-1">
                        <div dangerouslySetInnerHTML={userImage} />
                    </figure>
            </header>
            <main className="flex grow bg-stone-800">
                <aside className="bg-stone-900/70 p-2 px-4 flex flex-col justify-top min-w-[25dvw]">
                    <ul className="rounded-md bg-stone-800 p-1 list-disc list-inside">
                        <h3 className="text-stone-500">Active Users</h3>
                        <p>Loading data...</p>
                    </ul>
                </aside>
                <div>
                    <p>Loading data...</p>
                </div>
            </main>
        </div>
    );
}

function Unconnected(props){
    const connectToOffice = props.setAcceptConnection;

    return(    
    <div id="app-window" className="relative grow flex justify-center align-center ">
        <button className="rounded-lg my-40 outline-solid outline-stone-700 content-center text-center hover:outline-teal-700 hover:bg-teal-950 w-60 h-10 bg-stone-900 mx-3 cursor-pointer" onClick={()=>{connectToOffice(true)}}>Click to connect to the Office</button>
    </div>
    );
}

function ActiveUsers(props){
    const fakeUser = new Object({initials: "YA", xPos: "50", yPos:"50", displayName:"You", userName:"testUser"});
    const userList = props.userList; //replace this with live data from WebSocket mock
    const userName = props.userName;

    function renderUserList(){
        return userList.map((userObj, index) => {
            const textColor = userObj.userName == userName ? "oklch(84.1% 0.238 128.85)" : "oklch(86.9% 0.005 56.366)";
            const dynamicStyle = {
                color: textColor,
            };
            return <li key={"userListItem-" + index} style={dynamicStyle} > {userObj.displayName}</li>
        })
    }

    return(
        <aside className="bg-stone-900/70 p-2 px-4 flex flex-col justify-top min-w-[25dvw]">
            <ul className="rounded-md bg-stone-800 p-1 list-disc list-inside">
                <h3 className="text-stone-500">Active Users</h3>
                {renderUserList()}
            </ul>
        </aside>
    );
}