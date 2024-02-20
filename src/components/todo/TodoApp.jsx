import { useState } from 'react'
import './todoApp.css'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorsComponent from './ErrorsComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'

export default function TodoApp(){
    return (
        <div className="todoApp">
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    <Route path="/" element={<LoginComponent/>}></Route>
                    <Route path="/login" element={<LoginComponent/>}></Route>
                    <Route path="/welcome/:username" element={<WelcomeComponent/>}></Route>
                    <Route path="/todos" element={<ListTodosComponent/>}></Route>
                    <Route path="/logout" element={<LogoutComponent/>}></Route>
                    <Route path="*" element={<ErrorsComponent/>}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </div>
    )
}





