import React from 'react';
import {BrowserRouter, Router,Routes,Route,Navigate} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Admin from './Admin';
import AdminPosts from './AdminPosts';
import './style.css';

export default function App() {
  return (
  <div>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home /> }/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/admin-posts" element={<AdminPosts />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    </BrowserRouter>
  </div>
  );
}
