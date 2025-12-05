import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AddEmisora from './AddEmisora'
import EditEmisora from './EditEmisora'
import Layout from './components/Layout'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="agregar" element={<AddEmisora />} />
          <Route path="editar/:id" element={<EditEmisora />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
