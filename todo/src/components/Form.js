import React, { useState } from "react";

function Form(props) {

    //using state hooks. returns a state and a function to update the state
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name); //sends back info to the App.js
        setName(""); //clears input after submitting
    }

    function handleChange(e) { //event listener
        setName(e.target.value); 
    }

    return(
        <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name} //attaching event listener
          onChange={handleChange} //attaching event listener
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
}

export default Form;