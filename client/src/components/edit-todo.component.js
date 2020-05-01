import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function EditTodo(props) {
  const [todoDescription, setTodoDescription] = useState("");
  const [todoResponsible, setTodoResponsible] = useState("");
  const [todoPriority, setTodoPriority] = useState("");
  const [todoCompleted, setTodoCompleted] = useState(false);

  const id = props.match.params.id;
 
  useEffect(() => {
    axios.get('http://localhost:9000/getOne/' + id)
    .then(response => {
      setTodoDescription(response.data.todo_description);
      setTodoResponsible(response.data.todo_responsible);
      setTodoPriority(response.data.todo_priority);
      setTodoCompleted(response.data.todo_completed);
    })
    .catch(function(err) { console.log(err) });
  }, [])
  
  
  const onSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    
    const updatedTodo = {
      todo_description: todoDescription,
      todo_responsible: todoResponsible,
      todo_priority: todoPriority,
      todo_completed: todoCompleted
    }

    console.log("Posting")

    axios.post('http://localhost:9000/update/' + id, updatedTodo)
    .then(res => console.log(res.data))
    .then(() => props.history.push('/'))
    
  }

  return(
    <div style={{marginTop: 10}}>
      <h3>Edit</h3>
      <form onSubmit={ onSubmit }>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={todoDescription}
            onChange={(event) => setTodoDescription(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Responsible</label>
          <input
            type="text"
            className="form-control"
            value={todoResponsible}
            onChange={(event) => setTodoResponsible(event.target.value)}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Low"
              checked={todoPriority === "Low"}
              onChange={() => setTodoPriority("Low")}
            />
            <label className="form-check-label">Low</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Medium"
              checked={todoPriority === "Medium"}
              onChange={() => setTodoPriority("Medium")}
            />
            <label className="form-check-label">Medium</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="High"
              checked={todoPriority === "High"}
              onChange={() => setTodoPriority("High")}
            />
            <label className="form-check-label">High</label>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="completedOptions"
                id="completedFalse"
                value={false}
                checked={todoCompleted === false}
                onChange={() => setTodoCompleted(false)}
              />
              <label className="form-check-label">TODO</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                name="completedOptions"
                id="completedTrue"
                value={false}
                checked={todoCompleted === true}
                onChange={() => setTodoCompleted(true)}
              />
              <label className="form-check-label">Done</label>
            </div>
          </div>


        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update TODO"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  )
}