import React from 'react';
import { AuthState } from './authState';
import { generateInitials } from '../settings/settingsUtils';
import { useNavigate, useLocation } from 'react-router-dom';

export function Login(props){

    const userName = props.userName;
    const setUserName = props.changeUserName;
    const setAuthState = props.setAuthState;

    React.useEffect(() => {
        logoutUser(setAuthState);
    },[])

    return (
        <main className="grow flex flex-col justify-evenly">
        <div className="flex justify-center">
            <h1 className="font-semibold border-b-2 text-teal-400 text-5xl">OfficeTalk</h1>
        </div >
            <div id="input-center-box" className="flex justify-center min-h-80">
            <LoginForm changeUserName={setUserName} setAuthState={setAuthState}/>
        </div>
    </main>
    )
}


function LoginForm(props){

    const setUserName = props.changeUserName;
    const setAuthState = props.setAuthState;
    const [signupErrorMessage, setSignupErrorMessage] = React.useState(null);
    const [loginErrorMessage, setLoginErrorMessage] = React.useState(null);
    const location = useLocation();
    const nav = useNavigate();

    async function attemptLogin(){
        const password = document.getElementById("login-password").value;
        const user = document.getElementById("login-user").value;

        if(user && password){
            const response = await fetch('api/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    "user": user,
                    "password": password,
                }),
                headers:{
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })

            if(response.status == 200){

                //console.log(`DEBUG location: ${location.pathname}`);
                if(location.pathname == "/"){
                    nav("/app");
                }
                setUserName(user);
                setAuthState(AuthState.Authenticated);
                console.log("Login Succesfull!")
            }
            else{
                setLoginErrorMessage('No account under ' + user + ' found.')
            }
        }
        else{
            setLoginErrorMessage('A required field is missing.')
        }
    }

    async function attemptSignUp(){
        const password = document.getElementById("signup-password").value;
        const user = document.getElementById("signup-user").value;
        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;

        if(user && password && name && email){
            const newData = new Object({
                "user" : user,
                "password" : password,
                "displayName" : name,
                "email" : email,
                "initials" : generateInitials(name)
            });

            const response = await fetch('api/auth/register', {
                method: 'POST',
                body: JSON.stringify(newData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if(response.status == 201){
                if(location.pathname == "/"){
                    nav("/app");
                }
                setUserName(user);
                setAuthState(AuthState.Authenticated);

            } else if (response.status == 409){
                setSignupErrorMessage(user + ' is already taken')
            }
            else{
                setSignupErrorMessage("Internal Server Error")
                console.log(`Server Error: ${JSON.stringify(response.type)}`)
                console.log(`Server Error: ${JSON.stringify(await response.json())}`)
            }

        }
        else{
            setSignupErrorMessage('A required field is missing.')
        }
    }

    return(
        <section className="flex bg-stone-800 rounded-md justify-evenly w-[700px] max-w-[700px]" id="input-form-section">
            <div className="flex flex-col grow mx-4 mb-2" id="signup-form">
                <h2 className="text-2xl flex justify-center my-3">Sign-up</h2>
                <div className="flex flex-col my-2">
                    <label className="text-xs" htmlFor="signup-email">Email:</label>
                    <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-email" type="email" />
                </div>
                <div className="flex flex-col my-2">
                    <label className="text-xs" htmlFor="signup-user">Username:</label>
                    <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-user" type="text" />
                </div>
                <div className="flex flex-col my-2">
                    <label className="text-xs" htmlFor="signup-name">Display Name:</label>
                    <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-name" type="text" />
                </div>
                <div className="flex flex-col my-2">
                    <label className="text-xs" htmlFor="signup-password">Password:</label>
                    <input className="border-1 h-8 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="signup-password" type="password" />
                </div>
                {signupErrorMessage != null && <p className="text-red-500 text-xs">{signupErrorMessage}</p>}
                <div className="flex justify-center">
                    <button className="rounded-full hover:bg-teal-800 border-2 border-teal-900 min-w-30 min-h-10 bg-teal-700 cursor-pointer" id="signup-submit" onClick={attemptSignUp}>Submit</button> 
                </div>
            </div>
            <div className="size-[4px] self-center rounded-full h-9/10 bg-stone-500"></div>
            <div className="flex flex-col grow mx-4 mb-2" id="login-form">
                <h2 className="text-2xl flex justify-center my-3">Login</h2>
                <div className="flex flex-col my-3">
                    <label className="text-xs" htmlFor="login-user">Username:</label>
                    <input className="h-8 focus-visible:outline-3 outline-stone-600 border-1 border-stone-700 border-solid bg-stone-900 rounded-lg" id="login-user" type="text" />
                </div>
                <div className="flex flex-col my-3">
                    <label className="text-xs" htmlFor="login-password">Password:</label>
                    <input className="h-8 border-1 focus-visible:outline-3 outline-stone-600 border-stone-700 border-solid bg-stone-900 rounded-lg" id="login-password" type="password" />
                </div>
                {loginErrorMessage != null && <p className="text-red-500 text-xs">{loginErrorMessage}</p>}
                <div className="flex justify-center">
                    <button className="rounded-full hover:bg-teal-800 border-2 border-teal-900 min-w-30 min-h-10 bg-teal-700 cursor-pointer" id="login-submit" onClick={attemptLogin}>Submit</button> 
                </div>
            </div>
        </section>
    );
}

function logoutUser(setAuthState){
    fetch('/api/auth/login', {
        method: 'DELETE',
    }).then((response) => {
        console.log(`logout DEBUG: ${response.status}`)
    })
    setAuthState(AuthState.Unauthenticated);
}