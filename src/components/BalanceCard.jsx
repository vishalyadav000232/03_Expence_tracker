import React from 'react'
import { motion } from 'framer-motion'
const BalanceCard = ({total , income , exp}) => {
  
  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      
       className="bg-white shadow-lg p-5 rounded-xl w-full max-w-md text-center sm:grid">
        <h2 className="text-xl font-semibold">Your Balance</h2>
        <h1 className="text-3xl font-bold">₹ {total}</h1>

        <div className="flex justify-between mt-4">
          <div className="text-green-600">
            <p>Income</p>
            <p className="font-bold text-lg">₹ {income}</p>
          </div>
          <div className="text-red-600">
            <p>Expense</p>
            <p className="font-bold text-lg">₹ {Math.abs(exp)}</p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default BalanceCard
