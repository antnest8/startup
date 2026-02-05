import React from 'react';

export function Settings(){
    return (
        <div class="flex flex-col grow">
            <header class="bg-stone-900 flex flex-row justify-evenly min-h-10">
                <div>
                    <form>
                        <button class="rounded-lg my-2 hover:bg-teal-950 border-2 border-stone-700 min-w-30 min-h-10 bg-stone-900 cursor-pointer" type="submit" formaction="/" formmethod="get">Exit App</button>
                    </form>
                </div>
                <div>
                    <form>
                        <button class="rounded-lg my-2 hover:bg-teal-950 border-2 border-stone-700 min-w-30 min-h-10 bg-stone-900 cursor-pointer" type="submit" formaction="/app" formmethod="get">OfficeTalk</button>
                    </form>
                </div>
            </header>
            <main class="flex flex-col grow">
                <div class="flex flex-row justify-center mt-4">
                    <svg class="content-center size-[75px]" width="75" hight="75">
                            <circle stroke="#000092" stroke-width="3" cx="37" cy="37" r="30" fill="#3F3FDF"/>
                            <text x="37" y="45" font-size="20" text-anchor="middle" fill="white">U3</text>
                    </svg>
                    <h1 class="content-end text-2xl mb-3 font-bold"> &lt;Insert Your Username Here&gt;</h1>
                </div>
                <div class="flex flex-row justify-center grow">
                    <div class="flex flex-col p-8 px-12 bg-stone-800 rounded-md grow max-w-[70dvw] max-h-[90dvw] mb-6 mt-2">
                        <div class="profile-field">
                            <div>
                                <h3 id="user-email">Email: </h3>
                                <p class="info-field" id="user-email-output">youremail@example.com</p>
                            </div>
                            <div class="flex justify-end">
                                <button class="flex justify-end text-xs text-stone-400 hover:text-cyan-800" id="change-email-button" type="button">Change account email</button>
                            </div>
                        </div>
                        <div class="profile-field">
                            <div>
                                <h3 id="user-email">Display name:</h3>
                                <p class="info-field" id="user-name-output">youremail@example.com</p>
                            </div>
                            <div class="flex justify-end">
                                <button class="text-xs text-stone-400 hover:text-cyan-800" id="change-name-button" type="button">Change display name</button>
                            </div>
                        </div>
                        <div class="profile-field">
                            <label for="user-password">Password: </label>
                            <div class="flex">
                                <input class="password-display" type="password" disabled="true" id="user-password" value="password123"/> 
                                <button id="password-visibility-toggle">🙈/🙉</button>
                            </div>
                            <div class="flex justify-end">
                                <button class="flex justify-end text-xs text-stone-400 hover:text-cyan-800" id="change-password-button" type="button">Change password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}