import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import URIs from "../config/uris";


const deleteId = (id) => {
  axios
    .post(URIs.delete + id)
    .then((response) => console.log(response));
};

const Todo = (props) => (
  <tr>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_description}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_responsible}
    </td>
    <td className={props.todo.todo_completed ? "completed" : ""}>
      {props.todo.todo_priority}
    </td>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
    <td>
      <button
        type="button"
        onClick={() => deleteId(props.todo._id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </td>
  </tr>
);

export function TodoList() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios.get(URIs.getAll).then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Todo List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(function (thisTodo, i) {
            return <Todo todo={thisTodo} key={i} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
