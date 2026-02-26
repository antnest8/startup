import React from 'react';
import { DataField } from 'dataField.jsx'

export function Settings(props){
    userName = props.userName;
    userData = localStorage.getItem(userName + "_data");
    userPass = userData.password;
    userDisplay = userData.displayName;
    userEmail = userData.email;

    return (
        <div className="flex flex-col grow">
            <header className="bg-stone-900 flex flex-row justify-evenly min-h-10">
                <div>
                    <form>
                        <button className="rounded-lg my-2 hover:bg-teal-950 border-2 border-stone-700 min-w-30 min-h-10 bg-stone-900 cursor-pointer" type="submit" formaction="/" formmethod="get">Exit App</button>
                    </form>
                </div>
                <div>
                    <form>
                        <button className="rounded-lg my-2 hover:bg-teal-950 border-2 border-stone-700 min-w-30 min-h-10 bg-stone-900 cursor-pointer" type="submit" formaction="/app" formmethod="get">OfficeTalk</button>
                    </form>
                </div>
            </header>
            <main className="flex flex-col grow">
                <div className="flex flex-row justify-center mt-4">
                    <svg className="content-center size-[75px]" width="75" hight="75">
                            <circle stroke="#000092" stroke-width="3" cx="37" cy="37" r="30" fill="#3F3FDF"/>
                            <text x="37" y="45" font-size="20" text-anchor="middle" fill="white">U3</text>
                    </svg>
                    <h1 className="content-end text-2xl mb-3 font-bold"> &lt;Insert Your Username Here&gt;</h1>
                </div>
                <div className="flex flex-row justify-center grow">
                    <div className="flex flex-col p-8 px-12 bg-stone-800 rounded-md grow max-w-[70dvw] max-h-[90dvw] mb-6 mt-2">
                        <DataField purpose="display name" fieldData={userDisplay}/>
                        <DataField purpose="email" fieldData={userEmail}/>
                        <div className="flex justify-center">
                            <div className="flex flex-col mt-[1em] max-w-120 grow relative left-10">
                                <label for="user-password">Password: </label>
                                <div className="flex">
                                    <input className=" bg-stone-900 outline-2 outline-solid outline-stone-700 rounded-full text-stone-300 pl-2 grow" type="password" disabled="true" id="user-password" value="password123"/> 
                                    <button className="bg-stone-500 border-stone-600 max-w-[8em] min-w-[5em] rounded-md border-solid border-2 min-h-[2em] text-sm ml-[10px] hover:bg-stone-700" id="password-visibility-toggle">🙈/🙉</button>
                                </div>
                                <div className="flex justify-end">
                                    <button className="flex relative right-20 justify-end text-xs text-stone-400 hover:text-cyan-800" id="change-password-button" type="button">Change password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}