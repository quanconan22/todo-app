import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent(){
    const [username, setUsername] = useState('test');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorsMessage, setShowErrorsMessage] = useState(false);
    const navigate = useNavigate('');
    const authContext = useAuth();

    function handleUsernameOnchange(event){
        setUsername(event.target.value);
    }

    function handlePasswordOnchange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(){
        if(authContext.login(username,password)){
            setShowSuccessMessage(true);
            setShowErrorsMessage(false);
            navigate(`/welcome/${username}`);
        }else{
            setShowErrorsMessage(true);
            setShowSuccessMessage(false);
        }
    }

    return(
        <div className="loginComponent">
            <h1>Time to Login!</h1>
            {showSuccessMessage && <div className='successMessage' >Authenticated Successfully</div>}
            {showErrorsMessage && <div className='errorsMessage' >Authenticated Fail</div>}
            <div className="loginForm">
                <div>
                    <label>User Name: </label>
                    <input type='text' name='username' value={username} onChange={handleUsernameOnchange}></input>
                </div>
                <div>
                    <label>Password: </label>
                    <input type='password' name='password' value={password} onChange={handlePasswordOnchange}></input>
                </div>
                <div>
                    <button name='login' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}
