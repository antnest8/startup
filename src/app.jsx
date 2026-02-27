import React from 'react';
import './app.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Office } from './office/office';
import { Settings } from './settings/settings';


export default function App(){
    return (
        <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/app' element={<Office />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <footer className="flex justify-center mb-3 bg-stone-900">
                    <p className="italic content-center">Author: Broderick Johnson</p>
                    <a className="ml-20 underline content-center text-stone-300 hover:text-cyan-700" href="https://github.com/antnest8/startup">GitHub</a>
                    <img className="ml-2" src="/github.svg" type="image/svg+xml"/>
                </footer>
        </BrowserRouter>
    );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}