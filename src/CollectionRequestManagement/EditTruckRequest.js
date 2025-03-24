import Navbar from './components/sideNavBar';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "./styles/CreateTruckRequest.css";

function EditTruckRequest() {
    const { Trequest_ID } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for fetched data
    const [truck_RegNumber, setTruck_RegNumber] = useState("");
    const [driverId, setDriver_id] = useState("");
    const [pickUp_ID, setPickUp_ID] = useState("");
    const [truckCapacity, setTruckCapacity] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [pickupLocation, setPickupLocation] = useState("");
    const [request_Date, setRequest_Date] = useState("");
    const [errors, setErrors] = useState({});

    // Fetch truck request details
    useEffect(() => {
        axios.get(`http://localhost:8070/requestTruck/gettruckRequest/${Trequest_ID}`)
            .then((response) => {
                const data = response.data.truckRequestInfo;
                setTruck_RegNumber(data.Truck_RegNumber);
                setDriver_id(data.driver_id);
                setPickUp_ID(data.PickUp_ID);
                setRequest_Date(data.Request_Date);
                setTruckCapacity(data.TruckCapacity);
                setRequestStatus(data.RequestStatus);
                setPriority(data.Priority);
                setPickupLocation(data.PickupLocation);
                setLoading(false);
            })
            .catch(() => {
                setError("Error fetching request details.");
                setLoading(false);
            });
    }, [Trequest_ID]);

    // Validate Request Date (Must be Today or within the next 7 days)
    const validateRequestDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Remove time for comparison

        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 7); // Max 7 days from today

        if (selectedDate < today) return "Past dates are not allowed.";
        if (selectedDate > maxDate) return "Date must be within the next 7 days.";
        return "";
    };

    // Validate Truck Capacity (Must be between 1800 - 6000 Kg)
    const validateTruckCapacity = (capacity) => {
        if (capacity < 1800 || capacity > 6000) return "Truck capacity must be between 1800 - 6000 Kg.";
        return "";
    };

    // Handle Input Changes & Apply Validations
    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === "requestDate") {
            setRequest_Date(value);
            setErrors((prev) => ({ ...prev, requestDate: validateRequestDate(value) }));
        } else if (name === "truckCapacity") {
            setTruckCapacity(value);
            setErrors((prev) => ({ ...prev, truckCapacity: validateTruckCapacity(value) }));
        } else if (name === "Priority") {
            console.log(value);
            setPriority(value);
        }
    };

    // Update Truck Request
    function UpdateRequestInfo(e) {
        e.preventDefault();

        // Check if there are any validation errors before submission
        if (errors.requestDate || errors.truckCapacity || errors.priority) {
            alert("Please fix validation errors before submitting.");
            return;
        }

        const updatedTruckRequestInfo = {
            Request_Date: request_Date,
            TruckCapacity: truckCapacity,
            Priority: priority
        };

        axios.put(`http://localhost:8070/requestTruck/update/${Trequest_ID}`, updatedTruckRequestInfo)
            .then(() => {
                alert("Truck request updated successfully!");
                // Redirect if needed
            })
            .catch((error) => {
                console.error("Error updating truck request data:", error);
                alert("Failed to update truck request details.");
            });
    }

    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <div className="form-container">
                        <h2>Update Truck Request</h2>
                        <form onSubmit={UpdateRequestInfo}>
                            <label htmlFor="requestID">Request ID:</label>
                            <input type="text" id="requestID" value={Trequest_ID} required disabled />
                            <div className="hint-message">Check Request ID</div>

                            <label htmlFor="pickUpId">Pickup ID:</label>
                            <input type="text" id="pickUpId" value={pickUp_ID} required disabled />

                            <label htmlFor="requestDate">Request Date:</label>
                            <input type="date" id="requestDate" onChange={handleChange} value={request_Date} name="requestDate" required />
                            {errors.requestDate && <p className="error-message">{errors.requestDate}</p>}

                            <label htmlFor="truckCapacity">Truck Capacity (in Kg):</label>
                            <div className="input-container">
                                <input type="number" id="truckCapacity" onChange={handleChange} name="truckCapacity" value={truckCapacity} min="1800" max="6000" step="100" required />
                                <span className="unit-label">Kg</span>
                            </div>
                            {errors.truckCapacity && <p className="error-message">{errors.truckCapacity}</p>}
                            <div className="hint-message">Capacity must be between 1800 - 6000Kg</div>

                            <label htmlFor="pickupLocation">Pickup Location:</label>
                            <textarea id="pickupLocation" name="pickupLocation" value={pickupLocation} readOnly required></textarea>

                            <label htmlFor="priority">Select Priority *:</label>
                            <select id="priority" name="Priority" className="selectDiv" onChange={handleChange} value={priority} required>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>

                            <label htmlFor="status">Status:</label>
                            <input type="text" id="status" name="status" value={requestStatus} disabled />

                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTruckRequest;
