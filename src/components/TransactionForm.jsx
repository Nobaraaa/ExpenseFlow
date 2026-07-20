import "../App.css";




function TransactionForm({ addTransaction, formData, setFormData, formRef, editIndex }) {
    {



        function handleSubmit() {
            //title validation
            if (formData.title.trim() === "") {
                alert("Please enter a title.");
                return;
            }
            //amount validation
            if (formData.amount === "") {
                alert("Please enter an amount.");
                return;
            }
            //enter a valid number for amount
            if (Number(formData.amount) <= 0) {
                alert("Amount must be greater than 0.");
                return;
            }

            // Date validation
            if (formData.date.trim() === "") {
                alert("Please enter a date.");
                return;
            }

            const newTransaction = {
                title: formData.title,
                amount: Number(formData.amount),
                type: formData.type,
                category: formData.category,
                date: formData.date
            };

            addTransaction(newTransaction);


            setFormData({
                title: "",
                amount: "",
                date: "",
                type: "Expense",
                category: "Food"
            });
        }

        return (
            <div className="form-container" ref={formRef}>
                <div className="Transaction-card">
                    <h3>{editIndex !== null ? "Edit a Record" : "Add a Record"}</h3>
                    <input className="t1" type="text " placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    <input className="t1" type="text " placeholder="Amount" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
                    <input className="t1" type="date" placeholder="Date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    <select className="t1" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>

                        <option value={"Expense"}>Expense</option>
                        <option value={"Income"}>Income</option>
                    </select>
                    <select className="t1" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value={"Food"}>Food</option>
                        <option value={"Transportation"}>Transportation</option>
                        <option value={"Entertainment"}>Entertainment</option>

                        <option value="Travel">Travel</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Bills">Bills</option>
                        <option value="Salary">Salary</option>
                        <option value="Other">Other</option>
                    </select>

                    <button className="btn" onClick={handleSubmit} >{editIndex !== null ? "Update" : "Save"}</button>

                </div>
            </div>
        )
    }
}
export default TransactionForm;