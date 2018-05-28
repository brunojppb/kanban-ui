import React, { Component } from 'react';
import Todo from './Todo';

export default class Todolist extends Component {

  render() {

    const { title, todos } = this.props;

    return (
      <div className="todolist-wrapper">
        <div className="header-wrapper">
          <h2>{title}</h2>
        </div>
        <div className="todolist">
          { todos.map(todo => <Todo key={todo.id} todo={todo}/>) }
        </div>
      </div>
    );

  }
  
}