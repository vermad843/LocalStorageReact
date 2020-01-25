import React, { Component } from "react";


class App extends Component {
  constructor() {
    super();
    this.state = {
      heading: "Todos",
      newTodo: "",
      todos: [
        {
          title: "Learn React",
          done: false
        },
        {
          title: "Learn Vue",
          done: false
        }
      ],
      rememberMe: false
    };
    this.formSubmitted = this.formSubmitted.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount = () => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const newTodo = rememberMe ? localStorage.getItem("newTodo") : "";
    this.setState({ newTodo, rememberMe });
  };

  formSubmitted(e) {
    e.preventDefault();
    const { newTodo, rememberMe } = this.state;
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("newTodo", rememberMe ? newTodo : "");
    this.setState({
      newTodo: "",
      todos: [
        ...this.state.todos,
        {
          title: this.state.newTodo,
          done: false
        }
      ]
    });
  }

  handleChange = event => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;

    this.setState({ [input.name]: value });
  };

  toggleTodoDone(event, index) {
    const todos = [...this.state.todos];
    todos[index] = { ...todos[index] };
    todos[index].done = event.target.checked;
    this.setState({
      todos
    });
  }

  removeTodo(index) {
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos
    });
  }

  allDone() {
    const todos = this.state.todos.map(todo => {
      return {
        title: todo.title,
        done: true
      };
    });
    this.setState({
      todos
    });
  }

  render() {
    const { heading, todos, newTodo, rememberMe } = this.state;
    return (
      <div>
        <h1>{heading}</h1>
        <form onSubmit={this.formSubmitted}>
          <label htmlFor="newTodo">NewTodo</label>
          <label>
            <input
              onChange={this.handleChange}
              name="newTodo"
              id="newTodo"
              value={newTodo}
            />
          </label>
          <label>
            <input
              name="rememberMe"
              checked={rememberMe}
              onChange={this.handleChange}
              type="checkbox"
              value={rememberMe}
            />
            Remember me
          </label>
          <button type="submit">Add Todo</button>
        </form>
        <button onClick={() => this.allDone()}>All Done</button>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li key={index}>
                <input
                  onChange={event => this.toggleTodoDone(event, index)}
                  type="checkbox"
                  checked={todo.done}
                />
                <span
                  style={{
                    textDecoration: todo.done ? "line-through" : "inherit"
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => this.removeTodo(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
