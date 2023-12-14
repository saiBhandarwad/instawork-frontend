import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Login from './components/login/Login.jsx'
import { createBrowserRouter } from 'react-router-dom'
import Signup from './components/signup/Signup.jsx'
import Post from './components/post/Post.jsx'
import Home from './components/home/Home.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/works",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/post",
    element: <Post />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)