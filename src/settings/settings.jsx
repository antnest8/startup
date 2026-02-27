import React from 'react';
import { DataField, PasswordField } from './dataField';
import { generateInitials } from './settingsUtils.js'
import { NavBarButton } from '../nav/barButtons.jsx';

export function Settings(props){
    // TODO: pass data into Settings and handle
    const userName = props.userName;
    const userData = JSON.parse(localStorage.getItem(userName + "_Data"));

    const [userPass, changeUserPass] = React.useState(userData.password);
    const [userDisplay, changeUserDisplay] = React.useState(userData.displayName);
    const [userEmail, changeUserEmail] = React.useState(userData.email);
    const [userInitials, changeUserInitials] = React.useState(userData.initials);

    function saveData(){
        console.log("Data change detected. Saving data...")
        const newData = new Object({
            password : userPass,
            displayName : userDisplay,
            email : userEmail,
            initials : userInitials,
        });
        localStorage.setItem(userName + "_Data", JSON.stringify(newData));
    }

    React.useEffect(() => {
        saveData();
    }, [userPass, userEmail])

    React.useEffect(() => {
        changeUserInitials(generateInitials(userDisplay));
        saveData()
    }, [userDisplay]);

    return (
        <div className="flex flex-col grow">
            <header className="bg-stone-900 flex flex-row justify-evenly min-h-10">
                    <NavBarButton DisText="OfficeTalk" dest="/app"/>
                    <NavBarButton DisText="Logout" dest="/"/>
            </header>
            <main className="flex flex-col grow">
                <div className="flex flex-row justify-center mt-4">
                    <svg className="content-center size-[75px]" width="75" hight="75">
                            <circle stroke="#000092" strokeWidth="3" cx="37" cy="37" r="30" fill="#3F3FDF"/>
                            <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">{userInitials}</text>
                    </svg>
                    <h1 className="content-end text-2xl mb-3 font-bold"> {userName}</h1>
                </div>
                <div className="flex flex-row justify-center grow">
                    <div className="flex flex-col p-8 px-12 bg-stone-800 rounded-md grow max-w-[70dvw] max-h-[90dvw] mb-6 mt-2">
                        <DataField purpose="display name" fieldData={userDisplay} changeFunction={changeUserDisplay}/>
                        <DataField purpose="email" fieldData={userEmail} changeFunction={changeUserEmail}/>
                        <PasswordField purpose="password" fieldData={userPass} changeFunction={changeUserPass}/>
                    </div>
                </div>
            </main>
        </div>
    )
}