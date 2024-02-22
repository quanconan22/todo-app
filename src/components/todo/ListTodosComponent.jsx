import { useEffect, useState } from "react";
import { deleteTodoByIdApi, retrieveAllTodoForUserApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent(){

    const authContext = useAuth();
    const username = authContext.username;

    const [todos, setTodos] = useState([]);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    useEffect(
        () => refresTodos(),[]
    )

    function refresTodos(){
        retrieveAllTodoForUserApi(username)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoByIdApi(username,id)
        .then(
            () => {
                setMessage(`Delete of todo with ${id} success`)
                refresTodos()
            }
        )
        .catch(error => console.log(error))
    }

    function updateTodo(id){
        console.log(id)
        navigate(`/todo/${id}`);
    }
    
    function addNewTodo(){
        navigate("/todo/-1")
    }

    return(
        <div className="container">
            <h1>List Todos Component</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>decriptions</th>
                            <th>isDone</th>
                            <th>target date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString() }</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div><button className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</button></div>
        </div>
    )
}
