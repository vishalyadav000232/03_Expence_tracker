import { hasWarned, motion } from "framer-motion";
import React, { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";

const TransactionList = ({setEditId}) => {
  const { expense, dispatch } = useContext(ExpenseContext);

  

  return (
  <div className="flex flex-col items-center w-full p-3">
    <h3 className="text-lg font-semibold mb-2">History</h3>

    <div className="w-full max-w-md md:max-h-[30vh] mt-3 overflow-y-auto p-3">
      {expense.length === 0 && (
        <p className="text-center text-gray-500">No transactions yet</p>
      )}

      {expense.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white flex justify-between items-center p-3 rounded-lg shadow mb-2 border-l-4 sm:border-l-4"
          style={{
            borderColor: item.amount >= 0 ? "green" : "red",
          }}
        >
          {/* Transaction Info */}
          <div className="flex flex-col">
            <p className="font-medium">{item.description}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
          </div>

          {/* Amount & Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            <p
              className={`font-semibold ${
                item.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹{item.amount}
            </p>
            <button
              onClick={() => setEditId(item.id)}
              className="text-gray-500 hover:text-blue-500"
            >
              ✏️
            </button>
            <button
              onClick={() => dispatch({ type: "DELETE", payload: item.id })}
              className="text-gray-500 hover:text-red-500"
            >
              ❌
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

};

export default TransactionList;
