import React, { Component } from 'react';
import Todolist from './Todolist';
import Constants from '../../util/Constants';
import Http from '../../util/Http';
import AddTodo from './AddTodo';

export default class TodoContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSaving: false,
      todos: []
    }
  }

  componentDidMount() {
    this.setState({...this.state, isLoading: true});
    Http.get('/todos')
    .then(response => {
      this.setState({...this.state, isLoading: false, todos: response.data });
    }, error => {
      this.setState({...this.state, isLoading: false});
      console.error("Could not load todos", error.response);
    });
  }

  createTodo = (content) => {
    this.setState({...this.state, isSaving: true});
    const todo = { content, state: 1 };
    Http.post('/todos', { todo })
    .then(response => {
      console.log("Todo saved.");
      let updatedTodos = [...this.state.todos, todo];
      this.setState({...this.state, isSaving: false, todos: updatedTodos});
    }, error => {
      this.setState({...this.state, isSaving: false});
      console.error("Could not save todo", error.response);
    });
  }

  updateTodo = (id, content, state) => {
    const { todos } = this.state;
    const todo = todos.find(t => t.id === id);
    const updatedTodo = {...todo, content, state};
    Http.put(`/todos/${id}`, { todo: updatedTodo })
    .then(response => {
      const index = todos.findIndex(t => t.id === id);
      const updatedTodos = todos.map(t => t.id === id ? {...updatedTodo} : t);
      this.setState({...this.state, todos: updatedTodos});
    }, error => {
      console.log("Could not update todo", error.response);
    });
  }

  deleteTodo = (id) => {
    const {todos} = this.state;
    Http.delete(`/todos/${id}`)
    .then(response => {
      const updatedTodos = todos.filter(t => t.id === id);
      this.setState({...this.state, todos: updatedTodos});
    }, error => {
      console.error('Could not delete todo', error.response);
    });
  }

  updateTodo = (id, updatedTodo) => {
    const {todos} = this.state;
    Http.put(`/todos/${id}`, { todo: updatedTodo })
    .then(response => {
      const updatedTodos = todos.map(t => t.id === id ? {...updatedTodo} : t);
      this.setState({...this.state, todos: updatedTodos});
    }, error => {
      console.error('Could not update todo', error.response);
    });
  }

  render() {

    const { todos, isLoading, isSaving } = this.state;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;

    const todos_todo = todos.filter(t => t.state === STATE_TODO);
    const todos_doing = todos.filter(t => t.state === STATE_DOING);
    const todos_done = todos.filter(t => t.state === STATE_DONE);

    if(isLoading) {
      return(
        <div className="loading-wrapper">
          <span className="loading-content">
            Loading...
          </span>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="header-wrapper text-center">
          <h1>Kanban Board</h1>
          <AddTodo isSaving={isSaving} createTodo={this.createTodo}/>
        </div>
        <div className="row">
          <Todolist todos={todos_todo} filterTodoState={STATE_TODO} updateTodo={this.updateTodo} />
          <Todolist todos={todos_doing} filterTodoState={STATE_DOING} updateTodo={this.updateTodo} />
          <Todolist todos={todos_done} filterTodoState={STATE_DONE} updateTodo={this.updateTodo} />
        </div>
      </div>
      
    );

  }
  
}