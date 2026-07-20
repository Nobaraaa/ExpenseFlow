import "../App.css";

function SummaryCards({ income, expense, balance }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };
    return (
        <div className="summary-container">
            <div className="summary-card1 income-card">
                <h4>Income 💸 </h4>
                <h2>{formatCurrency(income)}</h2>
            </div>
            <div className="summary-card1 expense-card">
                <h4>Expense💲</h4>
                <h2> {formatCurrency(expense)}</h2>
            </div>
            <div className="summary-card1 balance-card">
                <h4>Balance 💰</h4>
                <h2> {formatCurrency(balance)}</h2>
            </div>

        </div>
    )

}
export default SummaryCards;