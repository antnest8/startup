import React from 'react';
import { NavLink } from 'react-router-dom';


export function NavBarButton(params){
    return <NavLink className="rounded-lg my-2 outline-solid outline-stone-700 content-center text-center hover:outline-teal-700 hover:bg-teal-950 min-w-30 min-h-10 bg-stone-900 mx-3 cursor-pointer" to={params.dest}>{params.DisText}</NavLink>
}