import React, { Component } from 'react';

export default class AddTodo extends Component {

  render() {

    const { createTodo } = this.props;

    const onKeyPress = (e) => {
      switch(e.key) {
        case 'Enter':
          console.log("Enter key", e.target.value);
          createTodo(e.target.value);
          this.textInput.value = '';
          break;
        default:
          console.log("Not enter", e.key);
          break;
      }
    }

    return(
      <div className="add-todo-wrapper">
        <input type="text" 
                className="add-todo-input" 
                placeholder="enter your todo here" 
                ref={el => this.textInput = el}
                onKeyPress={onKeyPress} />
      </div>
    );
  }

}