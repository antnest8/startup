import React from 'react';

export function Login(){
    return (
        <main className="grow flex flex-col justify-evenly">
        <div className="flex justify-center">
            <h1 className="font-semibold border-b-2 text-teal-400 text-5xl">OfficeTalk</h1>
        </div>
            <div id="input-center-box" className="flex justify-center min-h-80">
            <section className="flex bg-stone-800 rounded-md justify-evenly w-[700px] max-w-[700px]" id="input-form-section">
                <form className="flex flex-col grow mx-4" action="app" method="get" id="signup-form">
                    <h2 className="text-2xl flex justify-center my-3">Sign-up</h2>
                    <div className="flex flex-col my-2">
                        <label className="text-xs" htmlFor="signup-email">Email:</label>
                        <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-email" type="email" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label className="text-xs" htmlFor="signup-name">Display Name:</label>
                        <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-name" type="text" />
                    </div>
                    <div className="flex flex-col my-2">
                        <label className="text-xs" htmlFor="signup-password">Password:</label>
                        <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-password" type="password" />
                    </div>
                    <div className="flex justify-center">
                        <button className="rounded-full hover:bg-teal-800 border-2 border-teal-900 min-w-30 min-h-10 bg-teal-700 cursor-pointer" id="signup-submit" type="submit">Submit</button> 
                    </div>
                </form>
                <div className="size-[4px] self-center rounded-full h-9/10 bg-stone-500"></div>
                <form className="flex flex-col grow mx-4" action="app" method="get" id="login-form">
                    <h2 className="text-2xl flex justify-center my-3">Login</h2>
                    <div className="flex flex-col my-3">
                        <label className="text-xs" htmlFor="login-name">Display Name:</label>
                        <input className="h-8 focus-visible:outline-3 outline-stone-600 border-1 border-stone-700 border-solid bg-stone-900 rounded-lg" id="login-name" type="text" />
                    </div>
                    <div className="flex flex-col my-3">
                        <label className="text-xs" htmlFor="login-password">Password:</label>
                        <input className="h-8 border-1 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="login-password" type="password" />
                    </div>
                    <div className="flex justify-center">
                        <button className="rounded-full hover:bg-teal-800 border-2 border-teal-900 min-w-30 min-h-10 bg-teal-700 cursor-pointer" id="login-submit" type="submit">Submit</button> 
                    </div>
                </form>
            </section>
        </div>
    </main>
    )
}