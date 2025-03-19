import React, { useEffect, useState } from "react";
import axios from "axios";
import PaymentTable from "../utils/PaymentTable";

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





// import { useEffect, useState } from "react";
// import Axios from "axios";
// import PaymentTable from "./PaymentTable";

// const Payments = () => {
//     const [payments, setPayments] = useState([]);
//     const [submitted, setSubmitted] = useState(false);
//     const [isEdit, setIsEdit] = useState(false);
//     const [selectedPayment, setSelectedPayment] = useState({});

//     useEffect(() => {
//         getPayments();
//     }, []);

//     const getPayments = () => {
//         Axios.get('http://127.0.0.1:3001/api/payments')
//             .then((response) => {
//                 setPayments(response?.data?.response || []);
//             })
//             .catch(error => {
//                 console.error('Axios error : ', error);
//             });
//     };

//     const addPayment = (data) => {
//         setSubmitted(true);

//         const payload = {
//             id: data.id,
//             user_id: data.user_id,
//             payment_method: data.payment_method,
//             created_at: data.created_at,
//             amount: data.amount,
//         };

//         Axios.post('http://127.0.0.1:3001/api/createpayment', payload)
//             .then(() => {
//                 getPayments();
//                 setSubmitted(false);
//                 isEdit(false);
//             })
//             .catch(error => {
//                 console.error('Axios error : ', error);
//             });
//     };

//     const updatePayment = (data) => {
//         setSubmitted(true);

//         const payload = {
//             id: data.id,
//             user_id: data.user_id,
//             payment_method: data.payment_method,
//             created_at: data.created_at,
//             amount: data.amount,
//         };

//         Axios.post('http://127.0.0.1:3001/api/updatepayment', payload)
//             .then(() => {
//                 getPayments();
//                 setSubmitted(false);
//                 isEdit(false);
//             })
//             .catch(error => {
//                 console.error('Axios error : ', error);
//             });
//     };

//     const deletePayment = (data) => {
//         Axios.post('http://127.0.0.1:8081/api/deletepayment', data)
//             .then(() => {
//                 getPayments();
//                 setSubmitted(false);
//                 isEdit(false);
//             })
//             .catch(error => {
//                 console.error('Axios error : ', error);
//             });
//     };

//     return (
//         <PaymentTable 
//             rows={payments}
//             selectedPayment={data => {
//                 setSelectedPayment(data);
//                 setIsEdit(true);
//             }}
//             deletePayment={data => window.confirm('Are you sure you want to delete this user?') && deletePayment(data)}
//         />
//     );
// }

// export default Payments;