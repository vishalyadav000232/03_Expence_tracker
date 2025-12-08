import React, { useContext } from "react";
import { ExpenseContext } from "../Context/ExpenseContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const { expense } = useContext(ExpenseContext);

  let amounts = expense.map((val) => Number(val.amount));

  const income = amounts.filter((val) => val > 0).reduce((a, b) => a + b, 0);
  const exp = amounts.filter((val) => val < 0).reduce((a, b) => a + b, 0);

  const pieData = [
    { name: "Income", value: income },
    { name: "Expense", value: Math.abs(exp) },
  ];

  return (
    <div className="w-full h-[300px] flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            <Cell fill="#4CAF50" />
            <Cell fill="#F44336" />
            <Cell fill="4CAF222"/>
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
