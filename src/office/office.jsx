import React from 'react';

export function Office(){
    return (
        <div class="flex flex-col grow">
            <header class="bg-stone-600 flex flex-row justify-end min-h-10">
                <div class="flex grow">
                    <h1 class="font-semibold font-[rubik] border-b-2 text-teal-400 m-1 text-5xl max-h-[0.9em]">OfficeTalk</h1>
                </div>
                <div>
                    <form>
                        <button class="rounded-lg my-2 hover:outline-solid outline-teal-700 hover:bg-teal-950 min-w-30 min-h-10 bg-stone-800 mx-3 cursor-pointer" type="submit" formaction="/" formmethod="get">Exit App</button>
                    </form>
                </div>
                <div>
                    <form>
                        <button class="rounded-lg my-2 hover:outline-solid outline-teal-700 hover:bg-teal-950 min-w-30 min-h-10 bg-stone-800 mx-3 cursor-pointer" type="submit" formaction="/settings" formmethod="get">Settings</button>
                    </form>
                </div>
                <figure class="size-[50px] mx-3" id="user-1">
                        <svg class="profile-token" width="50" height="50">
                            <circle stroke="#009200" stroke-width="3" cx="25" cy="25" r="23" fill="#00BF00" />
                            <text x="25" y="30" font-size="20" text-anchor="middle" fill="white">You</text>
                        </svg>
                    </figure>
            </header>
            <main class="flex grow bg-stone-700">
                <aside class="bg-stone-600/70 p-2 px-4 flex flex-col justify-top min-w-[25dvw]">
                    <ul class="rounded-md bg-stone-800 p-1 list-disc list-inside">
                        <h3 class="text-stone-500">Active Users</h3>
                        <li class="text-lime-400">You</li>
                        <li class="text-stone-300">User 2</li>
                        <li class="text-stone-300">User 3</li>
                    </ul>
                </aside>
                <div class="application-window">
                    <figure class="absolute top-3/5 left-30/100 size-[75px]" id="user-1">
                        <svg width="75" height="75">
                            <circle stroke="#599259" stroke-width="3" cx="37" cy="37" r="30" fill="#8FBF8F" />
                            <text x="37" y="45" font-size="20" text-anchor="middle" fill="white">You</text>
                        </svg>
                        <img class="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
                    </figure>
                    <figure class="size-[75px] absolute top-1/3 left-3/5" id="user-2">
                        <svg width="75" height="75">
                            <circle stroke="#925959" stroke-width="3" cx="37" cy="37" r="30" fill="#BF8F8F" />
                            <text x="37" y="45" font-size="20" text-anchor="middle" fill="white">U2</text>
                        </svg>
                        <audio src="https://radioteca.net/media/uploads/audios/%25Y_%25m/never gonna give you up - astley rick top 20.mp3"></audio>
                        <img class="size-[20px] absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
                    </figure>
                    
                    <figure class="absolute size-[75px] top-18/100 left-40/100" id="user-3">
                        <svg width="75" height="75">
                            <circle stroke="#595992" stroke-width="3" cx="37" cy="37" r="30" fill="#6F6FDF" />
                            <text x="37" y="45" font-size="20" text-anchor="middle" fill="white">U3</text>
                        </svg>
                        <img class="size-[20px] hidden absolute bottom-0 right-0" type="image/svg+xml" src="./microphone-svgrepo-com.svg" />
                    </figure>
                    
                </div>
            </main>
        </div>
    )
}