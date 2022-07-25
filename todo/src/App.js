import React, { useState } from "react";
import { nanoid } from "nanoid";
//importing components
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) { 

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState("All");

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function toggleTaskCompleted(id) {
    // this const maps over the original tasks array
    const updatedTasks = tasks.map(task => {
      //if the tasks id matches the id provided for this func
      //then use spread syntax to create new object and toggle
      //the completed property of the object before returning it
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      //if it doesnt match, it returns the original object
      return task;
    })
    //call setTasks with new array to update state
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function addTask(name) {//this is a callback props function
    //i use it when i need data from a child component
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]); //spread syntax (copy exist. array)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  )); //iterating through the DATA from index.js (DATA passed by props)
  // key is a special prop that helps react to render.
  // key is always necessary when rendering with iteration

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  return (
    <div className="todoapp stack-large">
      <h1>Facility</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
      {filterList}  
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;