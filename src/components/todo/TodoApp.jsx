import { useState } from 'react'
import './todoApp.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import '/node_modules/bootstrap/dist/css/bootstrap.min.css'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'
import ListTodosComponent from './ListTodosComponent'
import ErrorsComponent from './ErrorsComponent'
import WelcomeComponent from './WelcomeComponent'
import LoginComponent from './LoginComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

function AuthenticatedRoute({children}){
    const authContext = useAuth();
    if(authContext.isAuhtenticated){
        return children;
    }
    return <Navigate to="/"/>
}

export default function TodoApp(){
    return (
        <div className="todoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={<LoginComponent/>}></Route>
                        <Route path="/login" element={<LoginComponent/>}></Route>
                        <Route path="/welcome/:username" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        
                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }>        
                        </Route>
                        <Route path="/logout" element={<ListTodosComponent/>}></Route>
                        <Route path="*" element={<ErrorsComponent/>}></Route>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}





