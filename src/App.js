import React, { useState } from 'react';
import './App.css';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// FUNCTION FOR CARDS

function Todo({ task, index, markTask, removeTask }) {
  return (
    <div className="tasks">
      <span style={{ textDecoration: task.isDone ? "line-through" : "" }}>{ task.text }</span>
      <div>
        <Button variant="outline-success" onClick={() => markTask(index)}>Done</Button>{' '}
        <Button variant="outline-danger" onClick={() => removeTask(index)}>Remove</Button>
      </div>
    </div>
  );
}

// FUNCTION FOR FORM

function FormTodo({ addTask }) {
  const [input, setInput] = useState("");
// store the todo's in localStorage and retrieve them when the page loads. Coming soon.
  const handleSubmit = event => {
    event.preventDefault();
    if (!input) 
      return;
      addTask(input);
      setInput("");
  };

  return (
    <Form onSubmit={handleSubmit}>
    <Form.Label><h4>Add Task</h4></Form.Label>
    <Form.Control type="text" className="input" value={input} onChange={event => setInput(event.target.value)} placeholder="Add new task" />
    <Button variant="primary mt-2 mb-2 pb-1" type="submit">Submit</Button>
    </Form>
  );
}

// TASK CREATION AND LIST UPDATES

function App() {
  const [task, setTask] = useState([
    {
      text: "This is an example task",
      isDone: false
    }
  ]);

  const addTask = text => {
    const newTask = [...task, { text }];
    setTask(newTask);
  };

  const markTask = index => {
    const newTask = [...task];
    newTask[index].isDone = true;
    setTask(newTask);
  };

  const removeTask = index => {
    const newTask = [...task];
    newTask.splice(index, 1);
    setTask(newTask);
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">My ToDoList</h1>
        <FormTodo addTask={addTask} />
        <div>
          <h4 className="task-list pt-3">Tasks to do</h4>
          {task.map((task, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                task={task}
                markTask={markTask}
                removeTask={removeTask}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;