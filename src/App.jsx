import { useState } from 'react'
// import ExpenseUI from './components/ExpenseUi'
import './App.css'
// import ExpenseForm from './components/ExpenseForm'
import ExpenseDashboard from './components/ExpenseDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ExpenseUI /> */}
      <ExpenseDashboard />
    </>
  )
}

export default App
