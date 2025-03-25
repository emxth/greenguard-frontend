import Navbar from './Components/SideNav';
import { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./styles/AddFuel.css";

function AddFuelCost() {
    const { regNum } = useParams(); // Get RegNumber from URL
    //set input values to variables
    // const [regNumber, setRegNum] = useState(regNum);
    const [regNumber] = useState(regNum);
    const [fuelDate, setFuelDate] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [fuelCost, setFuelCost] = useState("");
    const [litres, setLitres] = useState("");
    // const [Status, setStatus] = useState("Pending");
    const [Status] = useState("Pending");

    const navigate = useNavigate();

    //Make event to happen after button is clicked
    function sendData(e) {
        e.preventDefault();
        console.log("Function called");

        //Create object to send data to backend
        const newFuelCost = {
            'Truck_RegNum': regNumber,
            'Fuel_Date': fuelDate,
            'FuelType': fuelType,
            'FuelCost': fuelCost,
            'Litres': litres,
            'Status': Status,
        }
        console.log(newFuelCost);

        axios.post("http://localhost:8080/FuelCost/addFuelCost", newFuelCost).then(() => {
            alert("Fuel Cost added");
            navigate("/")
        }).catch((err) => {
            alert(err);
        })
    }

    const [fuelDateError, setFuelDateError] = useState("");
    const [fuelCostError, setFuelCostError] = useState("");
    const [litresError, setLitresError] = useState("");

    // Validate Fuel Date
    const validateFuelDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        oneMonthAgo.setHours(0, 0, 0, 0); // Reset time for accurate comparison

        if (selectedDate < oneMonthAgo) {
            setFuelDateError("Fuel date cannot be older than 1 month.");
            return false;
        }

        if (selectedDate.getTime() > today.getTime()) {
            setFuelDateError("Fuel date cannot be in the future.");
            return false;
        }

        setFuelDateError(""); // Clear error if valid
        return true;
    };

    const handleFuelDateChange = (e) => {
        const value = e.target.value;
        setFuelDate(value);

        validateFuelDate(value); // Validate while user types
    };

    // Validate Fuel Cost
    const validateFuelCost = (value) => {
        const fuelCostRegex = /^\d+(\.\d{1,2})?$/;

        if (!fuelCostRegex.test(value)) {
            setFuelCostError("Enter a valid number with up to 2 decimal places (e.g., 1000, 250.50).");
            return false;
        }

        if (parseFloat(value) <= 0) {
            setFuelCostError("Fuel cost must be greater than 0.");
            return false;
        }

        setFuelCostError(""); // No error
        return true;
    };

    const handleFuelCostChange = (e) => {
        const value = e.target.value;

        if (!/^\d*\.?\d{0,2}$/.test(value)) return;

        setFuelCost(value);
        validateFuelCost(value);
    };

    const handleFuelCostBlur = (e) => {
        const value = e.target.value.trim();
        if (value) validateFuelCost(value);
    };

    // Validate Litres
    const validateLitres = (value) => {
        const litresRegex = /^\d+(\.\d{1,2})?$/;

        if (!litresRegex.test(value)) {
            setLitresError("Enter a valid number with up to 2 decimal places (e.g., 50, 120.5, 75.25).");
            return false;
        }

        if (parseFloat(value) <= 0) {
            setLitresError("Litres must be greater than 0.");
            return false;
        }

        setLitresError(""); // No error
        return true;
    };

    const handleLitresChange = (e) => {
        const value = e.target.value;

        if (!/^\d*\.?\d{0,2}$/.test(value)) return;

        setLitres(value);
        validateLitres(value);
    };

    const handleLitresBlur = (e) => {
        const value = e.target.value.trim();
        if (value) validateLitres(value);
    };

    return (
        <div className="container">
            <div className="left-navbar">
                <Navbar />
            </div>
            <form className="fuel-form" onSubmit={sendData}>
                <h2 className='topicFuel'>Add Fuel Cost</h2>
                <div className="fuel-form-group">
                    <label htmlFor="regNumber" className="fuel-form-label">Truck Number</label>
                    <input type="text" className="fuel-form-control" name="regNumber" id="regNumber" value={regNum} readOnly required />
                    <div className="fuel-form-text">Truck ID is filled</div>
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="FuelDate" className="fuel-form-label">Fuel Date</label>
                    <input type="date" className="fuel-form-control" name="FuelDate" id="fuelDate"
                        onChange={handleFuelDateChange} required />
                    {fuelDateError && <div className="error-message">{fuelDateError}</div>}
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="FuelType" className="fuel-form-label">Fuel Type</label>
                    <select className="fuel-form-control" id="fuelType" name="FuelType"
                        onChange={(e) => setFuelType(e.target.value)}>
                        <option value="" disabled selected>Select Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="cost" className="fuel-form-label">Fuel Cost</label>
                    <input type="text" className="fuel-form-control" name="cost" id="fuelCost"
                        onChange={handleFuelCostChange} onBlur={handleFuelCostBlur} required />
                    {fuelCostError && <div className="error-message">{fuelCostError}</div>}
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="fuelLitres" className="fuel-form-label">Litres</label>
                    <input type="text" className="fuel-form-control" name="fuelLitres" id="FuelLitres"
                        onChange={handleLitresChange} onBlur={handleLitresBlur} required />
                    {litresError && <div className="error-message">{litresError}</div>}
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="status" className="fuel-form-label">Status</label>
                    <input type="text" className="fuel-form-control" name="status" value={Status} id="status" readOnly />
                </div>
                <div className="fuel-button-group">
                    <button type="submit" className="fuel-btn fuel-btn-primary">Submit</button>
                    <button type="button" className="fuel-btn fuel-btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddFuelCost;