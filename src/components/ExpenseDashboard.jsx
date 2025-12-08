import React, { useContext, useState } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import ExpenseForm from "./ExpenseForm";
import BalanceCard from "./BalanceCard";
import TransactionList from "./TransactionList";
import Chart from "./Chart";

const ExpenseDashboard = () => {
  const { expense } = useContext(ExpenseContext);
  const [editId, setEditId] = useState(null);
  const amounts = expense.map((val) => Number(val.amount) || 0);

  const total = amounts.reduce((acc, curr) => acc + curr, 0);
  const income = amounts
    .filter((val) => val > 0)
    .reduce((acc, curr) => acc + curr, 0);
  const exp = amounts
    .filter((val) => val < 0)
    .reduce((acc, curr) => acc + curr, 0);

 return (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 sm:p-10 min-h-screen overflow-y-auto">
    {/* Left Column */}
    <div className="flex flex-col gap-5 items-center sm:items-start">
      <BalanceCard total={total} income={income} exp={exp} />
      <ExpenseForm setEditId={setEditId} editId={editId} />
    </div>

    {/* Right Column */}
    <div className="flex flex-col gap-5 items-center sm:items-start">
      <TransactionList setEditId={setEditId} editId={editId} />
      <div className="w-full h-[300px] sm:h-[400px]">
        <Chart />
      </div>
    </div>
  </div>
);

}
export default ExpenseDashboard;
