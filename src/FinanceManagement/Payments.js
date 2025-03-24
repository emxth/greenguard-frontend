import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentTable from "./PaymentTable";

const API_BASE_URL = "http://localhost:8081/payment";

const Payment = () => {
    const [payments, setPayments] = useState([]);

    // Fetch payments from backend
    const fetchPayments = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/`); // GET request to backend
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };

    useEffect(() => {
        fetchPayments(); // Fetch data when component mounts
    }, []);

    return (
        <div>
            <PaymentTable rows={payments} fetchPayments={fetchPayments} />
        </div>
    );
};

export default Payment;

