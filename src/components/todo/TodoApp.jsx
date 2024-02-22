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
import TodoComponent from './TodoComponent'
import AuthProvider, { useAuth } from './security/AuthContext'

function AuthenticatedRoute({children}){
    const authContext = useAuth();
    if(authContext.isAuthenticated){
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
                        <Route path="/" element={<LoginComponent/>}/>
                        <Route path="/login" element={<LoginComponent/>}/>
                        <Route path="/welcome/:username" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>   
                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        }/>   

                        <Route path="/todo/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }/>      
                        
                        <Route path="/logout" element={<LogoutComponent/>}/>
                        <Route path="*" element={<ErrorsComponent/>}/>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}





