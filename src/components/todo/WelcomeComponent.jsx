import {Link, useParams} from 'react-router-dom'
import { retrieveHelloWorldBean, retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useState } from 'react';
export default function WelcomeComponent(){

    const {username} = useParams();
    const [messageResponse, setMessageResponse] = useState('');

    function callApiHelloWorld(){
        // retrieveHelloWorldBean()
        //     .then((response)=> successResponse(response))
        //     .catch((response) => errorResponse(response))
        //     .finally(()=> console.log('cleanup'));

        retrieveHelloWorldPathVariable("test")
            .then((response)=> successResponse(response))
            .catch((response) => errorResponse(response))
            .finally(()=> console.log('cleanup'));
    }

    function successResponse(response){
        setMessageResponse(response.data.message);
        console.log(response);
    }

    function errorResponse(response){
        console.log(response);
    }

    return(
        <div className="welcomeComponent">
            <h1>Welcome {username} </h1>
            <div>
                Manage your todos - <Link to='/todos'>Go here</Link>
            </div>
            <div>
                <button className='btn btn-success m-5' onClick={callApiHelloWorld}>Call API</button>
            </div>
            <div>
                {messageResponse}
            </div>
        </div>
    )
}