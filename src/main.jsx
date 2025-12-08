import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ExpenseProvider} from "./Context/ExpenseContext.jsx"
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ExpenseProvider>

      <App />
  </ExpenseProvider>
 
)
