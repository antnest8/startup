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
    const [callKey, setCallKey] = React.useState(0);

    React.useEffect(()=>{
        const fetchData = async ()=>{
            const currentAuthState = await getAuthState();
            //console.log(`DEBUG Auth: ${currentAuthState.name}`)
            const name = await getUserName(currentAuthState);
            console.log("Username Found! : " + name);
            setUserName(name);
            setAuthState(currentAuthState);
        }
        fetchData();
    }, [])

    if(authState === AuthState.Pending){
        return <Loading />;
    }

    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login userName={userName} setAuthState={setAuthState} changeUserName={setUserName}/>} exact />
                    <Route path='/app' element={authState === AuthState.Unauthenticated ? <Login userName={userName} setAuthState={setAuthState} changeUserName={setUserName}/> : <Office userName={userName} key={callKey} setKey={setCallKey}/>} />
                    <Route path='/settings' element={authState === AuthState.Unauthenticated ? <Login userName={userName} setAuthState={setAuthState} changeUserName={setUserName}/> : <Settings userName={userName}/>} />
                    <Route path='*' element={<NotFound/>} />
                </Routes>
                <footer className="flex justify-center mb-3 bg-stone-900">
                    <p className="italic content-center">Author: Broderick Johnson</p>
                    <a className="ml-20 underline content-center text-stone-300 hover:text-cyan-700" href="https://github.com/antnest8/startup">GitHub</a>
                    <img className="ml-2" src="/github.svg" type="image/svg+xml"/>
                </footer>
        </BrowserRouter>
    );
}

async function getAuthState(){
    const response = await fetch('/api/auth/check', {
        method: "GET",
    })

    //console.log(`Authcheck response status: ${response.status}`)
    if(response.status == 401){
        console.log("Not Authenticated");
        return AuthState.Unauthenticated
    } else if (response.status == 200){
        console.log("Authenticated")
        return AuthState.Authenticated
    } else {
        console.log(`ERROR during authentication: ${response.body.msg}`);
    }
    

}

async function getUserName(currentAuth){
    if(currentAuth === AuthState.Authenticated){
        const response = await fetch('/api/user/data', {
            method: "GET",
        })

        try{
            if(response.status == 401){
                throw Error("Previous Authentication succesful but data retrival failed");
            } else {
                const resBody = await response.json();
                //console.log(`DEBUG Username GET request response: ${resBody}`);
                return resBody.user;
            }
        }
        catch(e){
            console.log(e)
        }
    }else {
        console.log('Returning blank username')
        return ''
    }
}

function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

function Loading() {
    console.log("Loading Screen Rendered!")
    return <main className="bg-secondary text-center">Loading Page</main>;
}