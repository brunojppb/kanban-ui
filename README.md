# Kanban UI

A kanban board created with React.js.

![kanban board in action](https://media.giphy.com/media/MmOyryfBqRgv2Wg99C/giphy.gif)

Requirements:

- It should preferably be built with plain React.js, but you can use any JS framework, or none at all, Vanilla JS is just fine
- You can use any http request library for API communication
- It should have a kanban board with 3 lists: **Todo**, **Doing** and **Done**
- It should be possible to insert new tasks
- It should be possible to delete current tasks
- It should be possible to edit current tasks
- It should be possible to move tasks between lists
- It should not include any CSS framework
- The layout should be responsive to some degree, at least for mobile devices

You can check a live version of this Kanban board [HERE](https://bpaulino.com/kanban-ui). You can also take a look at the code, but if you copy, we will know 🙂

## Backend API

The API is ready and available here: https://kanban-api-rails.herokuapp.com/todos

### Endpoints:

- GET `/todos` - List all tasks in the database.

Response:
```json
[
  {
    "id": 1,
    "content": "this is the content",
    "state": 1,
    "created_at": "2018-05-29T09:12:57.752Z",
    "updated_at": "2018-05-29T09:12:57.752Z"
  },
  {
    "id": 2,
    "content": "this is the content 2",
    "state": 2,
    "created_at": "2018-05-29T09:12:57.752Z",
    "updated_at": "2018-05-29T09:12:57.752Z"
  },
]
```

- POST `/todos` - Create a new task.

Request:
```js
{
  todo: {
    content: "this is the new content",
    state: 1 // State can only possibly be: 1 - Todo, 2 - Doing, 3 - Done
  }
}
```

Response:
```js
{
  "id": 1,
  "content": "this is the new content",
  "state": 1,
  "created_at": "2018-05-29T09:12:57.752Z",
  "updated_at": "2018-05-29T09:12:57.752Z"
}
```

- PUT `/todos/{id}` - Update an existing task.

Request:
```js
{
  todo: {
    content: "this is the updated content",
    state: 3 // State can only possibly be: 1 - Todo, 2 - Doing, 3 - Done
  }
}
```

Response:
```js
{
  "id": 1,
  "content": "this is the new content",
  "state": 1,
  "created_at": "2018-05-29T09:12:57.752Z",
  "updated_at": "2018-05-29T09:12:57.752Z"
}
```

- DELETE `/todos/{id}` - Delete existing task

Response: `Empty response`
