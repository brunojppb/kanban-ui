import React, { Component } from 'react';
import Todolist from './Todolist';
import Constants from '../../util/Constants';

export default class TodoContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      todos: []
    }
  }

  componentDidMount() {

  }

  render() {

    const { todos, isLoading } = this.state;

    const todos_todo = todos.filter(t => t.state === Constants.STATE_TODO);
    const todos_doing = todos.filter(t => t.state === Constants.STATE_DOING);
    const todos_done = todos.filter(t => t.state === Constants.STATE_DONE);

    if(isLoading) {
      return <span>Loading...</span>
    }

    return (
      <div className="container">
        <div className="header-wrapper">
          <h1>Kanban Board</h1>
        </div>
        <div>
          <Todolist todos={todos_todo} title="Todo" />
          <Todolist todos={todos_doing} title="Doing" />
          <Todolist todos={todos_done} title="Done" />
        </div>
      </div>
      
    );

  }
  
}