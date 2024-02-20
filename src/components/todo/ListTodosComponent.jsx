export default function ListTodosComponent(){

    const currentDate = new Date();
    const todos = [
        {id: 1, description: "test" , isDone: false, targetDate: currentDate},
        {id: 2, description: "test2", isDone: true, targetDate: currentDate},
    ]

    return(
        <div className="container">
            <h1>List Todos Component</h1>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <td>id</td>
                            <td>decriptions</td>
                            <td>isDone</td>
                            <td>target date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id }</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.isDone.toString() }</td>
                                        <td>{todo.targetDate.toDateString()}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
