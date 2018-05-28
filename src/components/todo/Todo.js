import React, { Component } from 'react';

export default class Todo extends Component {

  render() {
    const { content, state } = this.state.todo;
    return (
      <div className="todo">
        <div className="todo-content">
          <p>{content}</p>
        </div>
      </div>
    );

  }

}