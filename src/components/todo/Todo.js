import React, { Component } from 'react';
import Constants from '../../util/Constants';

export default class Todo extends Component {

  render() {
    const { todo } = this.props;
    const { content, state } = todo;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;

    const selectOptions = [{state: 0, title: 'update progress'}, {state: STATE_TODO, title: 'Todo'}, {state: STATE_DOING, title: 'Doing'}, {state: STATE_DONE, title: 'Done'}]
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
    }

    const onChangeTodoState = (e) => {

    };

    return (
      <div className={`${cssClass} todo-wrapper`}>
        <div>
          <p>{content}</p>
        </div>
        <div style={{overflow: 'auto'}}>
          <select style={{float: 'right'}}>
            { selectOptions.map(opt => <option key={opt.state} value={opt.state}>{opt.title}</option>) }
          </select>
        </div>
      </div>
    );

  }

}