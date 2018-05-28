import React, { Component } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import Constants from '../../util/Constants';


export default class Todolist extends Component {

  render() {

    const { todos, filterTodoState } = this.props;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;

    let title = '';
    switch(filterTodoState) {
      case STATE_TODO:
        title = 'Todo';
        break;
      case STATE_DOING:
        title = 'Doing';
        break;
      case STATE_DONE:
        title = 'Done';
        break;
    }

    return (
      <div className="todolist-wrapper">
        <div className="header-wrapper">
          <h2>{title}</h2>
        </div>
        <div className="todolist">
          <AddTodo />
          { todos.map(todo => <Todo key={todo.id} todo={todo} />) }
        </div>
      </div>
    );

  }
  
}