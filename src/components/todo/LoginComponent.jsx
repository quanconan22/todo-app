import { useNavigate } from "react-router-dom";
import { useState } from "react";
export default function LoginComponent(){
    const [username, setUsername] = useState('test');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorsMessage, setShowErrorsMessage] = useState(false);
    const navigate = useNavigate('');

    function handleUsernameOnchange(event){
        setUsername(event.target.value);
    }

    function handlePasswordOnchange(event){
        setPassword(event.target.value);
    }

    function handleSubmit(){
        if(username=='test' && password == '123'){
            setShowSuccessMessage(true);
            navigate(`/welcome/${username}`);
        }else{
            setShowErrorsMessage(true);
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
