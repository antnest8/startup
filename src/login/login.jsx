import React from 'react';

export function Login(){
    return (
        <main class="grow flex flex-col justify-evenly">
        <div class="flex justify-center">
            <h1 class="font-semibold border-b-2 text-teal-400 text-5xl">OfficeTalk</h1>
        </div>
            <div id="input-center-box" class="flex justify-center min-h-80">
            <section class="flex bg-stone-800 rounded-md justify-evenly w-[700px] max-w-[700px]" id="input-form-section">
                <form class="flex flex-col grow mx-4" action="app" method="get" id="signup-form">
                    <h2 class="text-2xl flex justify-center my-3">Sign-up</h2>
                    <div class="flex flex-col my-2">
                        <label class="text-xs" for="signup-email">Email:</label>
                        <input class="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-email" type="email" />
                    </div>
                    <div class="flex flex-col my-2">
                        <label class="text-xs" for="signup-name">Display Name:</label>
                        <input class="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-name" type="text" />
                    </div>
                    <div class="flex flex-col my-2">
                        <label class="text-xs" for="signup-password">Password:</label>
                        <input class="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-password" type="password" />
                    </div>
                    <div class="flex justify-center">
                        <button class="rounded-full hover:bg-teal-800 border-2 border-teal-900 min-w-30 min-h-10 bg-teal-700 cursor-pointer" id="signup-submit" type="submit">Submit</button> 
                    </div>
                </form>
                <div class="size-[4px] self-center rounded-full h-9/10 bg-stone-500"></div>
                <form class="flex flex-col grow mx-4" action="app" method="get" id="login-form">
                    <h2 class="text-2xl flex justify-center my-3">Login</h2>
                    <div class="flex flex-col my-3">
                        <label class="text-xs" for="login-name">Display Name:</label>
                        <input class="h-8 focus-visible:outline-3 outline-stone-600 border-1 border-stone-700 border-solid bg-stone-900 rounded-lg" id="login-name" type="text" />
                    </div>
                    <div class="flex flex-col my-3">
                        <label class="text-xs" for="login-password">Password:</label>
                        <input class="h-8 border-1 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="login-password" type="password" />
                    </div>
                    <div class="flex justify-center">
                        <button class="rounded-full hover:bg-teal-800 border-2 border-teal-900 min-w-30 min-h-10 bg-teal-700 cursor-pointer" id="login-submit" type="submit">Submit</button> 
                    </div>
                </form>
            </section>
        </div>
    </main>
    )
}