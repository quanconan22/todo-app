import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent(){
    const [username, setUsername] = useState('in28minutes');
    const [password, setPassword] = useState('');
    const [showErrorsMessage, setShowErrorsMessage] = useState(false);
    const navigate = useNavigate('');
    const authContext = useAuth();

    function handleUsernameOnchange(event){
        setUsername(event.target.value);
    }

    function handlePasswordOnchange(event){
        setPassword(event.target.value);
    }

    async function handleSubmit(){
        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`);
        }else{
            setShowErrorsMessage(true);
        }
    }

    return(
        <div className="loginComponent">
            <h1>Time to Login!</h1>
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
