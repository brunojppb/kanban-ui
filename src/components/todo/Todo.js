import React, { Component } from 'react';
import Constants from '../../util/Constants';
import Http from '../../util/Http';

class TodoWrapper extends Component {

  render() {
    const { todoState } = this.props;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;

    let cssClass = '';
    switch (todoState) {
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

    return (
      <div className={`${cssClass} todo-wrapper`}>
        {this.props.children}
      </div>
    );

  }

}

export default class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  updateTodo = (content, state) => {
    const { id } = this.props.todo
    const { onUpdateTodo } = this.props.callbacks;
    const updatedTodo = {id, content, state};
    Http.put(`/todos/${id}`, { todo: updatedTodo })
    .then(response => {
      console.log("todo updated");
      this.setState({...this.state, isEditing: false});
      onUpdateTodo(updatedTodo)
    }, error => {
      console.error('Could not update todo', error.response);
    });
  }

  toggleEditing = () => {
    this.setState({ ...this.state, isEditing: !this.state.isEditing });
  }

  render() {
    const { todo, callbacks } = this.props;
    const { isEditing } = this.state;

    const content = isEditing
      ? <EditTodo todo={todo} toggleEditing={this.toggleEditing} callbacks={callbacks} updateTodo={this.updateTodo} />
      : <ShowTodo todo={todo} toggleEditing={this.toggleEditing} callbacks={callbacks} updateTodo={this.updateTodo} />;

    return (
      <TodoWrapper todoState={todo.state}>
        {content}
      </TodoWrapper>
    );

  }

}

class ShowTodo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDeleting: false
    };
  }

  deleteTodo = () => {
    const { todo } = this.props;
    this.setState({ ...this.state, isDeleting: true });
    const { onDeleteTodo } = this.props.callbacks;
    Http.delete(`/todos/${todo.id}`)
      .then(response => {
        onDeleteTodo(todo.id);
      }, error => {
        this.setState({ ...this.state, isDeleting: false });
        console.error('Could not delete todo', error.response);
      });
  }

  onChangeTodoState = (e) => {
    const newState = parseInt(e.target.value, 10);
    if (newState === Constants.todoState.STATE_UPDATE_PROGRESS) {
      return;
    }
    const {todo, updateTodo} = this.props;
    updateTodo(todo.content, newState);
  };

  render() {
    const { isDeleting } = this.state;
    const { state, content } = this.props.todo;
    const { toggleEditing } = this.props;
    const { STATE_TODO, STATE_DOING, STATE_DONE } = Constants.todoState;
    const STATE_UPDATE_PROGRESS = 0;

    const selectOptions = [{ state: STATE_UPDATE_PROGRESS, title: 'update progress' }, { state: STATE_TODO, title: 'Todo' }, { state: STATE_DOING, title: 'Doing' }, { state: STATE_DONE, title: 'Done' }]
      .filter(option => option.state !== state);

    return (
      <div>
        <div>
          <p onClick={toggleEditing}>{content}</p>
        </div>
        <div style={{ overflow: 'auto' }}>
          <button style={{ float: 'left' }} className="delete-btn" onClick={this.deleteTodo} disabled={isDeleting}>Delete</button>
          <select style={{ float: 'right' }} onChange={this.onChangeTodoState}>
            {selectOptions.map(opt => <option key={opt.state} value={opt.state}>{opt.title}</option>)}
          </select>
        </div>
      </div>
    );
  }

}

class EditTodo extends Component {

  onKeyPress = (e) => {
    switch(e.key) {
      case 'Enter':
        const { todo } = this.props;
        if (todo.content !== this.inputText.value) {
          const { updateTodo } = this.props;
          updateTodo(this.inputText.value, todo.state);
        } else { // no changes. just reset editing state;
          this.props.toggleEditing();
        }
        break;
      default: break;
    }
  }

  onChangeValue = (e) => {
    this.setState({...this.state, didChange: true});
  }

  render() {
    const { content } = this.props.todo;
    const { toggleEditing } = this.props;
    return (
      <div>
        <input type="text"
          ref={el => this.inputText = el}
          defaultValue={content}
          className="edit-todo-input"
          onKeyPress={this.onKeyPress} />
        <button onClick={toggleEditing} className="cancel-btn" style={{ marginTop: '10px' }}>Cancel</button>
      </div>
    );
  }

}