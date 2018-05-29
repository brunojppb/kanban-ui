import axios from 'axios';

const Http = axios.create({
  baseURL: 'https://kanban-api-rails.herokuapp.com',
  headers: { 'Access-Control-Allow-Origin': '*' }
});

export default Http;