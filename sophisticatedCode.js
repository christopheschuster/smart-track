/*
Filename: sophisticatedCode.js

Description:
This code is a sophisticated implementation of a web-based task management application. It includes various components such as user authentication, task creation, task assignment, task completion, and task tracking. The code follows best practices in terms of code organization, modularity, and error handling. It also utilizes modern JavaScript features and libraries for a professional and creative implementation.

Author: [Your Name]
Date: [Current Date]
*/

// Library Imports
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

// Custom CSS Styles
import './styles/App.css';

// Components Imports
import LoginForm from './components/LoginForm';
import TaskCreateForm from './components/TaskCreateForm';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';

// API Base URL
const API_BASE_URL = 'https://api.example.com/';

// Global State
const state = {
  isAuthenticated: false,
  user: null,
  tasks: [],
  loading: true,
  error: null,
};

// Utility Functions
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Authentication
const authenticateUser = (username, password) => {
  axios
    .post(`${API_BASE_URL}/auth/login`, { username, password })
    .then((response) => {
      const { token, user } = response.data;
      state.isAuthenticated = true;
      state.user = user;
      setAuthToken(token);
      loadTasks();
    })
    .catch((error) => {
      state.error = error.response.data.message;
      console.log('Authentication Error:', error);
    });
};

// Task Actions
const loadTasks = () => {
  axios
    .get(`${API_BASE_URL}/tasks`)
    .then((response) => {
      state.tasks = response.data;
      state.loading = false;
    })
    .catch((error) => {
      state.error = error.response.data.message;
      state.loading = false;
      console.log('Load Tasks Error:', error);
    });
};

const createTask = (task) => {
  axios
    .post(`${API_BASE_URL}/tasks`, task)
    .then((response) => {
      state.tasks.push(response.data);
      state.error = null;
    })
    .catch((error) => {
      state.error = error.response.data.message;
      console.log('Create Task Error:', error);
    });
};

const assignTask = (taskId, assignee) => {
  axios
    .post(`${API_BASE_URL}/tasks/${taskId}/assign`, { assignee })
    .then((response) => {
      const task = state.tasks.find((task) => task.id === response.data.id);
      task.assignee = response.data.assignee;
      state.error = null;
    })
    .catch((error) => {
      state.error = error.response.data.message;
      console.log('Assign Task Error:', error);
    });
};

const completeTask = (taskId) => {
  axios
    .put(`${API_BASE_URL}/tasks/${taskId}/complete`)
    .then((response) => {
      const task = state.tasks.find((task) => task.id === response.data.id);
      task.completed = response.data.completed;
      state.error = null;
    })
    .catch((error) => {
      state.error = error.response.data.message;
      console.log('Complete Task Error:', error);
    });
};

// React App Component
const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="app-navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              {state.isAuthenticated ? (
                <span>Welcome, {state.user.name}!</span>
              ) : (
                <Redirect to="/login" />
              )}
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <LoginForm authenticateUser={authenticateUser} />
          </Route>
          <Route path="/tasks/create">
            <TaskCreateForm createTask={createTask} />
          </Route>
          <Route path="/tasks/:id">
            <TaskDetails tasks={state.tasks} />
          </Route>
          <Route path="/tasks">
            {state.isAuthenticated ? (
              <TaskList tasks={state.tasks} assignTask={assignTask} completeTask={completeTask} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/">
            <Redirect to="/tasks" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

// Render the React App
ReactDOM.render(<App />, document.getElementById('root'));
