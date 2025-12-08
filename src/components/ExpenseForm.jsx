import React, { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExpenseContext } from "../Context/ExpenseContext";

const ExpenseForm = ({ editId, setEditId }) => {
  const { expense, dispatch } = useContext(ExpenseContext);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [fields, setFields] = useState(false);

  // Populate form when editId changes
  useEffect(() => {
    if (editId) {
      const item = expense.find((t) => t.id === editId);
      if (item) {
        setDescription(item.description);
        setAmount(item.amount);
        setCategory(item.category);
      }
    } else {
      setDescription("");
      setAmount("");
      setCategory("");
    }
  }, [editId, expense]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!description || !amount || !category) {
        setFields(true);
        return;
      } else {
        setFields(false);
      }

      if (editId) {
        dispatch({
          type: "UPDATE",
          payload: {
            id: editId,
            description,
            amount: Number(amount),
            category,
          },
        });
        setEditId(null);
      } else {
        dispatch({
          type: "ADD",
          payload: {
            id: Date.now(),
            description,
            category,
            amount:
              category === "Expense"
                ? -Math.abs(Number(amount))
                : Math.abs(Number(amount)),
          },
        });
      }

      setDescription("");
      setAmount("");
      setCategory("");
    },
    [description, amount, category, editId, dispatch, setEditId]
  );

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl space-y-4 sm:grid"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        💰 Add Transaction
      </h2>

      <input
        type="text"
        placeholder="Enter Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <input
        type="number"
        placeholder="Enter Amount..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
      />

      <div className="flex gap-6 items-center">
        <h3 className="text-gray-700 font-medium mb-2">Select Category:</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="category"
            value="Income"
            checked={category === "Income"}
            onChange={(e) => setCategory(e.target.value)}
            className="w-4 h-4"
          />
          <span className="text-green-600 font-semibold">Income</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="category"
            value="Expense"
            checked={category === "Expense"}
            onChange={(e) => setCategory(e.target.value)}
            className="w-4 h-4"
          />
          <span className="text-red-600 font-semibold">Expense</span>
        </label>
      </div>

      {fields && (
        <div className="text-center">
          <span className="text-red-500">All fields are required ⚠️</span>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-3 rounded-lg font-semibold text-lg shadow-md hover:opacity-90 transition"
      >
        ➕ Add Transaction
      </motion.button>
    </motion.form>
  );
};

export default ExpenseForm;
