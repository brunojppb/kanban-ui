import React, { Component } from 'react';
import Constants from '../../util/Constants';

export default class Todo extends Component {

  render() {
    const { todo } = this.props;
    const { content, state } = todo;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;
    const STATE_UPDATE_PROGRESS = 0;

    const selectOptions = [{state: STATE_UPDATE_PROGRESS, title: 'update progress'}, {state: STATE_TODO, title: 'Todo'}, {state: STATE_DOING, title: 'Doing'}, {state: STATE_DONE, title: 'Done'}]
      .filter(option => option.state !== state);

    let cssClass = '';
    switch(state) {
      case STATE_TODO:
        cssClass = 'todo-state-todo';
        break;
      case STATE_DOING:
        cssClass = 'todo-state-doing';
        break;
      case STATE_DONE:
        cssClass = 'todo-state-done';
        break;
      default:
        console.error("invalid todo state. It should never happen.");
    }

    const onChangeTodoState = (e) => {
      const value = parseInt(e.target.value, 10);
      if (value === STATE_UPDATE_PROGRESS) {
        return;
      }
      console.log("Update state");
    };

    return (
      <div className={`${cssClass} todo-wrapper`}>
        <div>
          <p>{content}</p>
        </div>
        <div style={{overflow: 'auto'}}>
          <button style={{float: 'left'}} className="delete-btn">Delete</button>
          <select style={{float: 'right'}} onChange={onChangeTodoState}>
            { selectOptions.map(opt => <option key={opt.state} value={opt.state}>{opt.title}</option>) }
          </select>
        </div>
      </div>
    );

  }

}