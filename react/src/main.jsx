import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Navbar from './navbar.jsx'
import FirstTry from './FirstTry.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    {/* <App /> */}
    <FirstTry />
  </React.StrictMode>,
)
