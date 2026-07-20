import "../App.css";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

function ExpenseChart({ income, expense }) {

  const data = [
    {
      name: "Income",
      amount: income
    },
    {
      name: "Expense",
      amount: expense
    },
  ];
  return (
    <div className="chart-container">
      <h3>Income Vs Expense</h3>
      {income === 0 && expense === 0 ? (
        <div className="empty-chart">
          <p>📊 No transactions yet</p>
          <span>Add income or expense to see your chart</span>
        </div>
      ) : (

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              <Cell fill="#10b981" />

              <Cell fill="#ef4444" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )

}
export default ExpenseChart;