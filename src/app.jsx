import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Office } from './office/office';
import { Settings } from './settings/settings';


export default function App(){
    return (
        <div>
            <div>placeholder</div>
            <footer class="flex justify-center mb-3">
                <p class="italic content-center">Author: Broderick Johnson</p>
                <a class="ml-20 underline content-center text-stone-300 hover:text-cyan-700" href="https://github.com/antnest8/startup">GitHub</a>
                <img class="ml-2" src="../public/github.svg" type="image/svg+xml"/>
            </footer>
        </div>  
    );
}