import React, { useState } from 'react';


export function CreateTodo() {
  const [todoDescription, setTodoDescription] = useState("");
  const [todoResponsible, setTodoResponsible] = useState("");
  const [todoPriority, setTodoPriority] = useState("Medium");
  const [todoCompleted, setTodoCompleted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("Submit function called. Contents:");
    console.log(`Description: ${todoDescription}`);
    console.log(`Responsible: ${todoResponsible}`);
    console.log(`Priority: ${todoPriority}`);
    console.log(`Completed: ${todoCompleted}`);
  }

  return(
    <div style={{marginTop: 10}}>
      <h3>Create TODO</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={todoDescription.value}
            onChange={setTodoDescription}
          />
        </div>
        <div className="form-group">
          <label>Responsible</label>
          <input
            type="text"
            className="form-control"
            value={todoResponsible.value}
            onChange={setTodoResponsible}
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
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create TODO"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  )
}