import "../App.css";

function TransactionTable({
  transactions,
  deleteTransaction,
  editTransaction
}) {
  return (
    <div className="transaction-table-container">
      <h3>Recent Transactions</h3>

      <table className="transaction-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Category</th>
            <th>💲Amount</th>
            <th>Date</th>
            <th >Actions</th>
          </tr>
        </thead>


        <tbody>

          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                <div classname="empty-state">
                  <h3>No transactions found ☹</h3>
                  <p>Start by adding your first income or expenses.</p>
                </div>
              </td>
            </tr>
          ) : (

            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.title}</td>
                <td>{transaction.type}</td>
                <td>{transaction.category}</td>
                <td>₹ {transaction.amount}</td>
                <td>{transaction.date}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editTransaction(index)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTransaction(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;