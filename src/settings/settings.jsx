import React from 'react';
import { DataField, PasswordField } from './dataField';

export function Settings(props){
    // TODO: pass data into Settings and handle
    //userName = props.userName;
    const userName = "testUser"; //delete after
    const userData = JSON.parse(localStorage.getItem(userName + "_Data"));
    
    const [userPass, changeUserPass] = React.useState(userData.password);
    const [userDisplay, changeUserDisplay] = React.useState(userData.displayName);
    const [userEmail, changeUserEmail] = React.useState(userData.email);

    React.useEffect(() => {
        console.log("Data change detected. Saving data...")
        const newData = new Object({
            password : userPass,
            displayName : userDisplay,
            email : userEmail,
        });
        localStorage.setItem(userName + "_Data", JSON.stringify(newData));
    }, [userPass, userDisplay, userEmail])

    return (
        <div className="flex flex-col grow">
            <header className="bg-stone-900 flex flex-row justify-evenly min-h-10">
                <div>
                    <form>
                        <button className="rounded-lg my-2 hover:bg-teal-950 border-2 border-stone-700 min-w-30 min-h-10 bg-stone-900 cursor-pointer" type="submit" formAction="/" formMethod="get">Exit App</button>
                    </form>
                </div>
                <div>
                    <form>
                        <button className="rounded-lg my-2 hover:bg-teal-950 border-2 border-stone-700 min-w-30 min-h-10 bg-stone-900 cursor-pointer" type="submit" formAction="/app" formMethod="get">OfficeTalk</button>
                    </form>
                </div>
            </header>
            <main className="flex flex-col grow">
                <div className="flex flex-row justify-center mt-4">
                    <svg className="content-center size-[75px]" width="75" hight="75">
                            <circle stroke="#000092" strokeWidth="3" cx="37" cy="37" r="30" fill="#3F3FDF"/>
                            <text x="37" y="45" fontSize="20" textAnchor="middle" fill="white">U3</text>
                    </svg>
                    <h1 className="content-end text-2xl mb-3 font-bold"> &lt;Insert Your Username Here&gt;</h1>
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