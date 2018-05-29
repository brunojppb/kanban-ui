import React, { Component } from 'react';
import Todo from './Todo';
import Constants from '../../util/Constants';


export default class Todolist extends Component {

  render() {

    const { todos, filterTodoState, callbacks } = this.props;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;

    let title = '';
    switch (filterTodoState) {
      case STATE_TODO:
        title = 'Todo';
        break;
      case STATE_DOING:
        title = 'Doing';
        break;
      case STATE_DONE:
        title = 'Done';
        break;
      default:
        console.error("Invalid state. It should never happen.");
    }

    return (
      <div className="col-1-3">
        <div className="todolist-wrapper">
          <div className="header-wrapper">
            <h2>{title}</h2>
          </div>
          <div className="todolist">
            {todos.map(todo => <Todo key={todo.id} todo={todo} callbacks={callbacks} />)}
          </div>
        </div>
      </div>
    );

  }

}