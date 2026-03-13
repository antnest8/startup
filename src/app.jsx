import React from 'react';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { AuthState } from './login/authState';
import { Office } from './office/office';
import { Settings } from './settings/settings';


export default function App(){
    
    const [userName, setUserName] = React.useState('fetching...');
    const [authState, setAuthState] = React.useState(AuthState.Pending);

    React.useEffect(()=>{
        const currentAuthState = getAuthState();  //replace with Authentication Mock
        setUserName(getUserName(currentAuthState));
        setAuthState(currentAuthState);
    }, [])

    return (
        <BrowserRouter>
                <Routes>
                    {authState === AuthState.Pending && <Route path='*' element={<NotFound />} />}
                    <Route path='/' element={<Login userName={userName} setAuthState={setAuthState} changeUserName={setUserName}/>} exact />
                    {authState === AuthState.Authenticated ? <Route path='/app' element={<Office userName={userName}/>} /> : <Route path='/app' element={<Login userName={userName} setAuthState={setAuthState} changeUserName={setUserName}/>} />}
                    {authState === AuthState.Authenticated ? <Route path='/settings' element={<Settings userName={userName}/>} /> : <Route path='/settings' element={<Login userName={userName} setAuthState={setAuthState} changeUserName={setUserName}/>} />}
                    <Route path='*' element={<Loading />} />
                </Routes>
                <footer className="flex justify-center mb-3 bg-stone-900">
                    <p className="italic content-center">Author: Broderick Johnson</p>
                    <a className="ml-20 underline content-center text-stone-300 hover:text-cyan-700" href="https://github.com/antnest8/startup">GitHub</a>
                    <img className="ml-2" src="/github.svg" type="image/svg+xml"/>
                </footer>
        </BrowserRouter>
    );
}

function getAuthState(){
    return fetch('/api/auth/check', {
        method: "GET",
    })
    .then((response) => {
        console.log(`Authcheck response status: ${response.status}`)
        if(response.status == 401){
            console.log("Not Authenticated");
            return AuthState.Authenticated
        } else {
            console.log("Authenticated")
            return AuthState.Unauthenticated
        }
    })
    .catch((err) => console.log(err))
}

function getUserName(currentAuth){
    if(currentAuth === AuthState.Authenticated){
        return fetch('/api/user/data', {
            method: "GET",
        })
        .then((response) => {
            if(response.status == 401){
                throw Error("Previous Authentication succesful but data retrival failed");
            } else {
                return response.json();
            }
        })
        .then((resBody) => {
            console.log(`Name DEBUG: ${resBody.user}`);
            return resBody.user;
        })
        .catch((err) => console.log(err))
    }else {
        console.log('Returning blank username')
        return ''
    }
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

function Loading() {
  return <main className="bg-secondary text-center">Loading Page</main>;
}