import Navbar from './components/sideNavBar';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles/CreateTruckRequest.css";

function CreateTruckRequests() {
    const { pickID } = useParams();
    const navigate = useNavigate();

    // State for fetched data
    const [pickupDate, setPickupDate] = useState("");
    const [capacity, setCapacity] = useState("");
    const [pickupLoc, setPickupLoc] = useState("");

    // State for user inputs
    const [requestID, setRequestID] = useState("");
    const [truck_RegNumber, setTruck_RegNumber] = useState("");
    const [driver_id, setDriver_id] = useState("");
    const [RequestStatus, setRequestStatus] = useState("Pending");
    const [priority, setPriority] = useState("");


    // Error states
    const [dateError, setDateError] = useState("");
    const [capacityError, setCapacityError] = useState("");
    const [pickupLocError, setPickupLocError] = useState("");
    const [errors, setErrors] = useState({});
    const [priorityError, setPriorityError] = useState("");


    // Fetch the latest pickup ID when the component loads
    useEffect(() => {
        axios.get("http://Localhost:8070/requestTruck/latestRequestID")
            .then(response => {
                setRequestID(response.data.newRequestID); // Store formatted ID (R01, R02)
            })
            .catch(error => {
                console.error("Error fetching latest Pickup ID:", error);
            });
    }, []);

    // Fetch request details
    useEffect(() => {
        axios.get(`http://localhost:8070/pickupRequests/getPickupInfo/${pickID}`)
            .then((response) => {
                const data = response.data.pickUpInfo;
                setPickupDate(data.PickupDate);
                setCapacity(data.Capacity);
                setPickupLoc(data.PickupLocation);
            })
            .catch(() => {
                setErrors((prev) => ({ ...prev, pickup: "Error fetching pickup details." }));
            });
    }, [pickID]);

    

    // Validate date (must be within the last 3 days)
    const validateDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        if (selectedDate > today) {
            setDateError("Date cannot be in the future.");
            return false;
        } else if (selectedDate < threeDaysAgo) {
            setDateError("Date must be within the last 3 days.");
            return false;
        } else {
            setDateError("");
            return true;
        }
    };

    // Validate address (minimum 10 characters)
    const validateAddress = (address) => {
        if (address.length < 10) {
            setPickupLocError("Pickup location must be at least 10 characters.");
            return false;
        } else {
            setPickupLocError("");
            return true;
        }
    };

    // Handle form submission
    function sendData(e) {
        e.preventDefault();

        if (!validateDate(pickupDate) || !validateAddress(pickupLoc)) return;

        const newTruckRequest = {
            RequestID: requestID,
            Truck_RegNumber: truck_RegNumber,
            driver_id: driver_id,
            Request_Date: pickupDate,
            TruckCapacity: capacity,
            PickupLocation: pickupLoc,
            Priority: priority,
            RequestStatus: RequestStatus
        };

        axios.post("http://localhost:8070/requestTruck/addtruckRequest", newTruckRequest)
            .then(() => {
                alert("Truck request Created");
                navigate("/");
            })
            .catch((err) => {
                alert(err);
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
                        <h2>Create Truck Request</h2>
                        <form onSubmit={sendData}>
                            <label htmlFor="requestID">Request ID:</label>
                            <input type="text" id="requestID" value={requestID || ""} required readOnly />
                            <div className="hint-message">Check Request ID</div>

                            <label htmlFor="requestDate">Request Date:</label>
                            <input type="date" id="requestDate" name="requestDate" value={pickupDate}
                                onChange={(e) => {
                                    setPickupDate(e.target.value);
                                    validateDate(e.target.value);
                                }} required />
                            {dateError && <div className="error-message">{dateError}</div>}

                            <label htmlFor="truckCapacity">Truck Capacity (in Kg):</label>
                            <div className="input-container">
                                <input type="number" id="truckCapacity" name="truckCapacity" value={capacity} min="1000" max="6000"
                                    onChange={(e) => setCapacity(e.target.value)} required />
                                <span className="unit-label">Kg</span>
                            </div>
                            <div className="hint-message">Capacity must be 1000 - 6000Kg</div>

                            <label htmlFor="pickupLocation">Pickup Location:</label>
                            <textarea id="pickupLocation" name="pickupLocation" value={pickupLoc}
                                onChange={(e) => {
                                    setPickupLoc(e.target.value);
                                    validateAddress(e.target.value);
                                }} required></textarea>
                            {pickupLocError && <div className="error-message">{pickupLocError}</div>}

                            <label htmlFor="priority">Select Priority *:</label>
                            <select id="priority" className="selectDiv" onChange={(e) => {
                                setPriority(e.target.value); // Clear error when user selects
                            }} required>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            {priorityError && <div className="error-message">{priorityError}</div>}
                            <label htmlFor="status">Status:</label>
                            <input type="text" id="status" value={RequestStatus} name="status" readOnly />

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTruckRequests;
