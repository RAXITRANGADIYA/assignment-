import {  createHashRouter } from "react-router-dom";
import Aboutus from './Aboutus.jsx';
import Contactus from './Contactus.jsx';
import HomeCompo from './HomeCompo.jsx';
import MainHeader from './CommanCompo/header.jsx';
import LoginCompo from './LoginCompo.jsx';
import APIExmapleCompo from './APIExmapleCompo.jsx';
import Weatherdata from './Weatherapp.jsx';
import LoaderCompo from './CommanCompo/LoaderCompo.jsx';
import React,{ Suspense } from "react";


const AdminCompoRoute= React.lazy(()=> import('./Admin/AdminRouter.jsx'))
const router = createHashRouter([
    {
        path: "/",
        element: <><MainHeader /><HomeCompo /></>,
    }, {
        path: "/aboutus",
        element: <><MainHeader /> <Aboutus /></>,
    }, {
        path: "/contact",
        element: <><MainHeader /> <Contactus /></>,
    }, {
        path: "/singin",
        element: <> <LoginCompo /></>,
    }, {
        path: "/api",
        element: <><MainHeader/> <APIExmapleCompo /></>,
    }, {
        path: "/weatherdata",
        element: <><MainHeader/> <Weatherdata /></>,
    },{
        path: "admin/*",
        element: <Suspense fallback={<LoaderCompo/>}><AdminCompoRoute/></Suspense>
    }

]);

export default router