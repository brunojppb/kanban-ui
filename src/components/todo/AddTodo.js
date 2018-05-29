import React, { Component } from 'react';
import Http from '../../util/Http';

export default class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSaving: false
    };
  }

  createTodo = (content) => {
    const {onCreateTodo} = this.props;
    this.setState({...this.state, isSaving: true});
    const todo = { content, state: 1 };
    Http.post('/todos', { todo })
    .then(response => {
      console.log("Todo saved.");
      this.textInput.value = '';
      onCreateTodo(response.data);
      this.setState({...this.state, isSaving: false});
    }, error => {
      this.setState({...this.state, isSaving: false});
      console.error("Could not save todo", error.response);
    });
  }

  onKeyPress = (e) => {
    switch(e.key) {
      case 'Enter':
        this.createTodo(e.target.value);
        break;
      default: break;
    }
  }

  render() {
    const { isSaving } = this.state;
    return(
      <div className="add-todo-wrapper">
        <input type="text" 
                className="add-todo-input" 
                placeholder="Add a new task" 
                disabled={isSaving}
                ref={el => this.textInput = el}
                onKeyPress={this.onKeyPress} />
      </div>
    );
  }

}