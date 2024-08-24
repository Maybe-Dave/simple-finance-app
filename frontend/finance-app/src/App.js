import React, { useState, useEffect } from "react";
import api from "./api";  // Importing the Axios instance for API requests

const App = () => {
  // State to manage the list of transactions
  const [transactions, setTransactions] = useState([]);
  
  // State to manage the form data
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    is_income: false,
    date: "",
  });

  // State to manage the ID of the transaction being edited
  const [editingTransactionId, setEditingTransactionId] = useState(null);

  // Function to fetch all transactions from the backend
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/transactions/");
      setTransactions(response.data);
      console.log("Transactions fetched:", response.data);  // Logging fetched transactions
    } catch (error) {
      console.error("Error fetching transactions:", error);  // Logging errors during fetch
    }
  };

  // useEffect to fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to handle changes in form input fields
  const handleInputChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
    console.log(`Form data updated: ${event.target.name} = ${value}`);  // Logging form input changes
  };

  // Function to handle form submission (create or update a transaction)
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingTransactionId) {
        // Update transaction if editingTransactionId is set
        await api.put(`/transactions/${editingTransactionId}`, formData);
        console.log("Transaction updated:", formData);  // Logging updated transaction data
      } else {
        // Create a new transaction if editingTransactionId is not set
        await api.post("/transactions/", formData);
        console.log("Transaction created:", formData);  // Logging created transaction data
      }

      fetchTransactions();  // Refresh the list of transactions
      setFormData({
        amount: "",
        category: "",
        description: "",
        is_income: false,
        date: "",
      });  // Reset form data
      setEditingTransactionId(null);  // Reset editing transaction ID
    } catch (error) {
      console.error("Error submitting form:", error);  // Logging errors during form submission
    }
  };

  // Function to handle the edit button click
  const handleEditClick = (transaction) => {
    setFormData({
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      is_income: transaction.is_income,
      date: transaction.date,
    });
    setEditingTransactionId(transaction.id);
    console.log("Editing transaction:", transaction);  // Logging transaction to be edited
  };

  // Function to handle the delete button click
  const handleDeleteClick = async (transactionId) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
      fetchTransactions();  // Refresh the list of transactions
      console.log(`Transaction with ID ${transactionId} deleted`);  // Logging deleted transaction ID
    } catch (error) {
      console.error(`Error deleting transaction with ID ${transactionId}:`, error);  // Logging errors during deletion
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Finance App
          </a>
        </div>
      </nav>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              className="form-control"
              id="amount"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              name="category"
              onChange={handleInputChange}
              value={formData.category}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="is_income" className="form-label">
              Income?
            </label>
            <input
              type="checkbox"
              id="is_income"
              name="is_income"
              onChange={handleInputChange}
              checked={formData.is_income}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="text"
              className="form-control"
              id="date"
              name="date"
              onChange={handleInputChange}
              value={formData.date}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingTransactionId ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>

        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? "Yes" : "No"}</td>
                <td>{transaction.date}</td>
                <td>
                  <button onClick={() => handleEditClick(transaction)}>Edit</button>
                  <button onClick={() => handleDeleteClick(transaction.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
