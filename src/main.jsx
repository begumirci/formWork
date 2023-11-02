import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import FormContent from './assets/components/FormContent.jsx'
import { formLoader } from './assets/components/FormContent.jsx'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App />
  },
  {
    path:'/ekle',
    element:<FormContent />
  },
  {
    path:'/:id/duzenle',
    element:<FormContent />,
    loader: formLoader
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)
