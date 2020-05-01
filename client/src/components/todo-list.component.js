import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => (
  <tr>
    <td>{ props.todo.todo_description }</td>
    <td>{ props.todo.todo_responsible }</td>
    <td>{ props.todo.todo_priority }</td>
    <td>
      <Link to={"/update/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
)



export function TodoList() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:9000/getAll')
    .then(response => {
      setTodos(response.data)
    })
  }, []);

  const tableBody = () => {
    return (
      todos.map(function(thisTodo, i) {
        return <Todo todo={thisTodo} key={i}/>
      })
    )
  }

  return (
    <div>
      <h3>Todo List</h3>
      <table
        className="table table-striped" style={{ marginTop: 20 }}
      >
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { todos.map(function(thisTodo, i) {
            return <Todo todo={thisTodo} key={i}/>
          }) }
        </tbody>
      </table>
    </div>
  )
}