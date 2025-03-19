import Navbar from './Components/SideNav';
import react, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/AddMaintainanceCost.css";

function AddMaintenanceCost() {
    //set input values to variables
    const { regNum } = useParams();
    const [maintenance_Date, setMaintenance_Date] = useState("");
    const [truckRegNum, setTruckRegNum] = useState(regNum);
    const [maintenanceType, setMaintenanceType] = useState("");
    const [truckCost, setTruckCost] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const navigate = useNavigate();

    //Make event to happen after button is clicked
    function sendData(e) {
        e.preventDefault();
        console.log("Function called");
        //Create object to send data to backend
        const newMaintenanceCost = {
            'Truck_RegNum': truckRegNum,
            'Maintenance_Date': maintenance_Date,
            'maintenance_type': maintenanceType,
            'Cost': truckCost,
            'Description': description,
            'Status': status,
        }

        axios.post("http://Localhost:8080/Maintenance/addTruckCost", newMaintenanceCost).then(() => {
            alert("Cost added");
            navigate("/")
        }).catch((err) => {
            alert(err);
        })
    }

    // //Maintenance date validation
    // const validateMaintenanceDate = (date) => {
    //     const selectedDate = new Date(date);
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0); // Reset time to avoid comparison issues

    //     const oneMonthAgo = new Date();
    //     oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    //     if (selectedDate < oneMonthAgo) {
    //         alert("Maintenance date cannot be older than 1 month.");
    //         return false;
    //     } else if (selectedDate > today) {
    //         alert("Maintenance date cannot be in the future.");
    //         return false;
    //     }
    //     return true;
    // };

    // const handleMaintenanceDateChange = (e) => {
    //     const value = e.target.value;

    //     if (validateMaintenanceDate(value)) {
    //         setMaintenance_Date(value);
    //     }
    // };

    // //Expense validation
    // const validateExpense = (value) => {
    //     const expenseRegex = /^\d+(\.\d{1,2})?$/; // Allows only numbers with up to 2 decimal places

    //     if (!expenseRegex.test(value)) {
    //         alert("Invalid amount. Enter a valid number (e.g., 1000 or 250.50).");
    //         return false;
    //     }

    //     if (parseFloat(value) <= 0) {
    //         alert("Expense must be greater than 0.");
    //         return false;
    //     }

    //     return true;
    // };

    // const handleExpenseBlur = (e) => {
    //     const value = e.target.value.trim();

    //     if (value && !validateExpense(value)) {
    //         setTruckCost(""); // Clear input if invalid
    //     } else {
    //         setTruckCost(value);
    //     }
    // };

    // const handleExpenseChange = (e) => {
    //     setTruckCost(e.target.value);
    // };

    // //Description validation
    // const validateDescription = (value) => {
    //     const trimmedValue = value.trim();
    //     const minLength = 10;
    //     const maxLength = 500;

    //     if (trimmedValue.length < minLength) {
    //         alert(`Description must be at least ${minLength} characters.`);
    //         return false;
    //     }

    //     if (trimmedValue.length > maxLength) {
    //         alert(`Description cannot exceed ${maxLength} characters.`);
    //         return false;
    //     }

    //     return true;
    // };

    // const handleDescriptionBlur = (e) => {
    //     const value = e.target.value;

    //     if (value.trim() && !validateDescription(value)) {
    //         setDescription(""); // Clear if invalid
    //     } else {
    //         setDescription(value.trim()); // Save trimmed value
    //     }
    // };

    // const handleDescriptionChange = (e) => {
    //     setDescription(e.target.value); // Allow free typing
    // };

    const [maintenanceDateError, setMaintenanceDateError] = useState("");
    const [expenseError, setExpenseError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");

    // Maintenance Date Validation
    const validateMaintenanceDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        oneMonthAgo.setHours(0, 0, 0, 0);

        if (selectedDate < oneMonthAgo) {
            setMaintenanceDateError("Maintenance date cannot be older than 1 month.");
            return false;
        } else if (selectedDate > today) {
            setMaintenanceDateError("Maintenance date cannot be in the future.");
            return false;
        }

        setMaintenanceDateError(""); // Clear error if valid
        return true;
    };

    const handleMaintenanceDateChange = (e) => {
        const value = e.target.value;
        setMaintenance_Date(value);
        validateMaintenanceDate(value);
    };

    // Expense Validation
    const validateExpense = (value) => {
        const expenseRegex = /^\d+(\.\d{1,2})?$/;

        if (!expenseRegex.test(value)) {
            setExpenseError("Invalid amount. Enter a number (e.g., 1000 or 250.50).");
            return false;
        }

        if (parseFloat(value) <= 0) {
            setExpenseError("Expense must be greater than 0.");
            return false;
        }

        setExpenseError(""); // Clear error if valid
        return true;
    };

    const handleExpenseBlur = (e) => {
        const value = e.target.value.trim();
        if (value && !validateExpense(value)) {
            setTruckCost("");
        } else {
            setTruckCost(value);
        }
    };

    const handleExpenseChange = (e) => {
        setTruckCost(e.target.value);
    };

    // Description Validation
    const validateDescription = (value) => {
        const trimmedValue = value.trim();
        if (trimmedValue.length < 10) {
            setDescriptionError("Description must be at least 10 characters.");
            return false;
        }
        if (trimmedValue.length > 500) {
            setDescriptionError("Description cannot exceed 500 characters.");
            return false;
        }
        setDescriptionError("");
        return true;
    };

    const handleDescriptionBlur = (e) => {
        const value = e.target.value;
        if (value.trim() && !validateDescription(value)) {
            setDescription("");
        } else {
            setDescription(value.trim());
        }
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className="container">
            <div className="left-navbar">
                <Navbar />
            </div>
            <div className="right-form">
                <form className="form-layout" onSubmit={sendData}>
                    <h2 className='topic'>Add maintenance cost</h2>
                    <div className="form-group">
                        <label htmlFor="regNumber" className="form-label">Truck Number</label>
                        <input type="text" className="form-control" name="regNumber" id="regNumber" value={regNum} readOnly required />
                        <div className="form-text">Truck ID is filled</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="MaintainDate" className="form-label">Maintenance Date</label>
                        <input type="date" className="form-control1" name="MaintainDate" id="MaintainDate"
                            onChange={handleMaintenanceDateChange} required />
                        {maintenanceDateError && <div className="error-message" style={{ color: 'red' }}>{maintenanceDateError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="maintainType" className="form-label">Type</label>
                        <select className="form-control3" id="maintainType" name="maintainType"
                            onChange={(e) => setMaintenanceType(e.target.value)}>
                            <option value="" disabled selected>Maintenance Type</option>
                            <option value="Interior">Interior</option>
                            <option value="Exterior">Exterior</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost" className="form-label">Total Expenses</label>
                        <input type="text" className="form-control" name="cost" id="truckCost"
                            onChange={handleExpenseChange}
                            onBlur={handleExpenseBlur}
                            required />
                        {expenseError && <div className="error-message" style={{ color: 'red' }}>{expenseError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptCost" className="form-label">Description</label>
                        <textarea className="form-control2" name="descriptCost" id="description"
                            onChange={handleDescriptionChange}
                            onBlur={handleDescriptionBlur}
                            required />
                        {descriptionError && <div className="error-message" style={{ color: 'red' }}>{descriptionError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input type="text" className="form-control" name="status" value={status} id="status" readOnly />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    );
}


export default AddMaintenanceCost;