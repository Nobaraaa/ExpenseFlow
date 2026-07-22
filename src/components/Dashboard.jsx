import SummaryCards from "./SummaryCards";
import TransactionForm from "./TransactionForm";
import ExpenseChart from "./ExpenseChart";
import Profile from "./Profile";
import { useRef } from "react";
import { toast } from "react-toastify";
import TransactionTable from "./TransactionTable";
import { FaUserCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../App.css";

import api from "../services/api";
import { useState, useEffect } from "react";
function Dashboard({ setIsLoggedIn }) {

    const [transactions, setTransactions] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        date: "",
        type: "Expense",
        category: "Food"
    });
    const [showProfile, setShowProfile] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [loading, setLoading] = useState(true);
    const formRef = useRef(null);
    const tableRef =useRef(null);
    const exportMenuRef = useRef(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

    //put fetch data from backend
    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await api.get("/expenses");
            setTransactions(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
    if (searchTerm || filterType !== "All") {
        document.getElementById("transaction-table")?.scrollIntoView({
            
            behavior: "smooth",
            block: "start",
        });
    }
}, [searchTerm, filterType]);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      exportMenuRef.current &&
      !exportMenuRef.current.contains(event.target)
    ) {
      setShowExportMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


    //transactionn Functions
    const income = transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce((total, transaction) => total + Number(transaction.amount), 0);
    const expense = transactions
        .filter((transactions) => transactions.type === "Expense")
        .reduce((total, transaction) => total + Number(transaction.amount), 0);
    const balance = income - expense;
    const addTransaction = async (newTransaction) => {
        try {
            if (editIndex !== null) {
                // Update existing transaction
                const updatedTransaction = { ...newTransaction, id: transactions[editIndex].id }
                await api.put(`/expenses/${updatedTransaction.id}`, updatedTransaction);
                fetchExpenses();
                toast.success("Transaction updated successfully.");
                setEditIndex(null);
            }
            else {
                // Add new transaction
                await api.post("/expenses", newTransaction);
                fetchExpenses();
                toast.success("Transaction added successfully!");
                // Refresh the transaction list after adding
            }
        } catch (error) {
            console.error(error);
        }
    };
    const deleteTransaction = async (index) => {
        if (!window.confirm("Are you sure you want to delete this transaction?")) {
            return;
        }
        try {
            await api.delete(`/expenses/${transactions[index].id}`);
            fetchExpenses();
            toast.success("Transaction deleted successfully.");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            toast.error("Failed to delete transaction. Please try again.");
        }
    };
    const editTransaction = (index) => {
        setEditIndex(index);
        setFormData(transactions[index]);

        formRef.current.scrollIntoView({ behavior: "smooth" });
    };

    //pdf save and download
    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("ExpenseFlow Report ", 20, 20);
        doc.setFontSize(12);
        doc.text(`Generated on : ${new Date().toLocaleDateString()}`, 20, 30);
        doc.text(`Total Income : ₹${income}`, 20, 45);
        doc.text(`Total Expense : ₹${expense}`, 20, 55);
        doc.text(`Current Balance : ₹${balance}`, 20, 65);
        const tableData = transactions.map((transaction) => [
            transaction.title,
            transaction.category,
            transaction.type,
            `₹${transaction.amount}`,
            new Date(transaction.date,).toLocaleDateString(),
        ]);
        autoTable(doc, {
            startY: 75,
            head: [["Title", "Category", "Type", "Amount", "Date"]],
            body: tableData,

            theme: "grid",

            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: "bold",
            },

            styles: {
                fontSize: 10,
            },
        });
        doc.save("ExpenseFlow_Report.pdf");
    };
    //save and download Excel  file

    const handleExportExcel = () => {
        const excelData = transactions.map((transaction) => ({
            Title: transaction.title,
            Category: transaction.category,
            Type: transaction.type,
            Amount: `₹${transaction.amount}`,
            Date: new Date(transaction.date).toLocaleDateString(),
        }));


        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, "ExpenseFlow_Report.xlsx");

    };

    if (showProfile) {
        return <Profile setShowProfile={setShowProfile} />
    }

    //search functionality
    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch = transaction.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            transaction.category
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            transaction.type
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


        const matchesType =
            filterType === "All" || transaction.type === filterType;

        return matchesSearch && matchesType;
    });
    if (loading) {
        return <div className="loading"><div className="spinner-wrapper"> <div className="spinner"></div><p>Please Wait..</p></div></div>;
    }

    return (
        <div className="dashboard">

            <div className="dashboard-header">
                <div>
                    <h1> Expense-Flow 🚀 </h1>
                    <p>Track your income and expenses easily.💰 </p>
                </div>
                <div className="header-actions">
                    {/*search bar*/}
                    <input
                        type="text"
                        className="search-box"
                        placeholder="🔍︎ Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="filter-dropdown"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>
                    <div className="export-container" ref={exportMenuRef}>
                        <button className="export-btn" onClick={() => setShowExportMenu(!showExportMenu)}><FiUpload /></button>
                        {showExportMenu && (
                            <div className="export-menu">

                                <button onClick={() => { handleExportPDF(); setShowExportMenu(false); }}>📄 Export PDF</button>
                                <button onClick={() => { handleExportExcel(); setShowExportMenu(false) }}>📊 Export Excel</button>
                            </div>

                        )}
                    </div>
                    <FaUserCircle className="Profile-icon" onClick={() => setShowProfile(true)} />
                    <button className="logout-btn" onClick={() => {
                        if (window.confirm("Are you sure you want to logout?")) {
                            localStorage.removeItem("isLoggedIn");
                            toast.success("Logout successful!");
                            setIsLoggedIn(false);
                        }
                    }}>
                        Logout
                    </button>
                </div>
            </div>

            <SummaryCards income={income}
                expense={expense}
                balance={balance} />

            <div className="dashboard--middle">

                <TransactionForm addTransaction={addTransaction} formData={formData} setFormData={setFormData} editIndex={editIndex} formRef={formRef} />
                <ExpenseChart income={income} expense={expense} />
            </div>
            <TransactionTable transactions={filteredTransactions} deleteTransaction={deleteTransaction} editTransaction={editTransaction}  ref ={tableRef}/>
            <footer className="footer">
                <p>© 2026 ExpenseFlow | Built with ❤️ using React & Spring Boot</p>
            </footer>
        </div>
    )

}
export default Dashboard;