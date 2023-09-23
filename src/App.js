import "./App.css";
import React, { useState, useEffect } from "react";

const getLocalStorage=()=>{
  let tasks=localStorage.getItem("tasks");
  if(tasks){
    return (tasks=JSON.parse(localStorage.getItem("tasks")))
  }
  else{
    return []
  }
}

function App() {
  const [tasks, setTasks] = useState(getLocalStorage());
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: editedTaskTitle } : task
      )
    );
    setEditedTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div className="todo-container">
      <h1>
        <span className="second-title">Todo List App</span>
      </h1>
      <form onSubmit={addTask}>
        <input
          className="add-task"
          type="text"
          placeholder="Add new task ..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-button">
          Add
        </button>
      </form>

      {tasks.map((task) => (
        <div className="todo" key={task.id}>
          <div className="todo-text">
            <input
              className="checkbox"
              type="checkbox"
              id={`isCompleted${task.id}`}
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
          </div>
          {editedTask === task.id ? (
            <input
              type="text"
              value={editedTaskTitle}
              onChange={(e) => setEditedTaskTitle(e.target.value)}
              onBlur={() => editTask(task.id)}
            />
          ) : (
            <div>{task.title}</div>
          )}

          <div className="todo-actions">
            {editedTask === task.id ? (
              <button className="submit-edits" onClick={() => setEditedTask(null)}>
                Done
              </button>
            ) : (
              <button className="submit-edits" onClick={() => setEditedTask(task.id)}>
                Edit
              </button>
            )}
            <button className="submit-edits" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
