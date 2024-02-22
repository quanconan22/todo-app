import { useNavigate, useParams } from "react-router-dom"
import { createNewTodoApi, retrieveTodoByIdApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { ErrorMessage, Field, Form, Formik } from 'formik'
import moment from 'moment'

export default function TodoComponent(){

    const authContext = useAuth()
    const username = authContext.username
    const {id} = useParams()
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const navigate = useNavigate()

    useEffect(
        () => retrieveTodo(),[id]
    )

    function retrieveTodo(){
        if(id != -1){
            retrieveTodoByIdApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }

    function onSubmit(values){
        if(id == -1){
            const newTodo = {
                username: username,
                description: values.description,
                targetDate: values.targetDate.toString(),
                done: false
            }
            createNewTodoApi(username, newTodo)
            .then(response => {
                navigate("/todos");
            })
            .catch(error => console.log(error))
        }else{
            console.log(values)
            const todo = {
                id: id,
                username: username,
                description: values.description,
                targetDate: values.targetDate.toString(),
                done: false
            }
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate("/todos");
            })
            .catch(error => console.log(error))
        }
        
    }

    function validate(values){
        const errors = {
            // description: "test",
            // targetDate: "test targetDate"
        }
        if(values.description.length < 5){
            errors.description = "Enter atleast 5 characters"
        }
        if(values.targetDate == null || values.targetDate == "" ){
            errors.targetDate = "Enter a tartget date"
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <Formik 
            initialValues={{description, targetDate}} 
            enableReinitialize={true} 
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            >  
            {
                (props) => (
                    <Form>
                        <ErrorMessage
                            name="description"
                            component="div"
                            className="alert alert-warning"
                        />

                        <ErrorMessage
                            name="targetDate"
                            component="div"
                            className="alert alert-warning"
                        />
                        <fieldset className="form-group">
                            <label>
                                Description
                            </label>
                            <Field type="text" className="form-control" name="description"/>
                        </fieldset>
                        <fieldset className="form-group">
                            <label>
                                Target Date
                            </label>
                            <Field type="date" className="form-control" name="targetDate"/>
                        </fieldset>
                        <div>
                            <button className="btn btn-success m-5" type="submit">Save</button>
                        </div>
                    </Form>
                )
            }
            </Formik>
        </div>
    )
}