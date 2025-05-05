// import Navbar from './components/sideNavBar';
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./styles/CreateTruckRequest.css";

// function CreateTruckRequests() {
//     const { pickID } = useParams();
//     const navigate = useNavigate();

//     // State for fetched data
//     const [pickupDate, setPickupDate] = useState("");
//     const [capacity, setCapacity] = useState("");
//     const [pickupLoc, setPickupLoc] = useState("");
//     const [wastetype, setWastetype] = useState("");

//     // State for user inputs
//     const [requestID, setRequestID] = useState("");
//     const [truck_RegNumber, setTruck_RegNumber] = useState("");
//     const [driver_id, setDriver_id] = useState("");
//     const [RequestStatus, setRequestStatus] = useState("Requested");
//     const [priority, setPriority] = useState("High");
//     const [pickUpID, setPickUp_ID] = useState(pickID);

//     // Error states
//     const [dateError, setDateError] = useState("");
//     const [capacityError, setCapacityError] = useState("");

//     // Fetch latest request ID
//     useEffect(() => {
//         axios.get("http://Localhost:8070/requestTruck/latestRequestID")
//             .then(response => {
//                 setRequestID(response.data.newRequestID);
//             })
//             .catch(error => {
//                 console.error("Error fetching latest Request ID:", error);
//             });
//     }, []);

//     // Fetch pickup request details
//     useEffect(() => {
//         axios.get(`http://localhost:8070/pickupRequests/getPickupInfo/${pickID}`)
//             .then((response) => {
//                 const data = response.data.pickUpInfo;
//                 setPickupDate(data.PickupDate);
//                 setCapacity(data.Capacity);
//                 setPickupLoc(data.PickupLocation);
//                 setWastetype(data.wasteType);
//             })
//             .catch(() => {
//                 console.error("Error fetching pickup details.");
//             });
//     }, [pickID]);

//     // Function to get today's date in YYYY-MM-DD format
//     function getTodayDate() {
//         const today = new Date();
//         return today.toISOString().split("T")[0];
//     }

//     // Function to get max allowed date (7 days from today)
//     function getMaxDate() {
//         const maxDate = new Date();
//         maxDate.setDate(maxDate.getDate() + 7);
//         return maxDate.toISOString().split("T")[0];
//     }

//     // Validate Request Date
//     const validateDate = (selectedDate) => {
//         const today = new Date(getTodayDate());
//         const maxDate = new Date(getMaxDate());
//         const chosenDate = new Date(selectedDate);

//         if (chosenDate < today || chosenDate > maxDate) {
//             setDateError("Date must be today or within the next 7 days.");
//         } else {
//             setDateError(""); // Clear error if valid
//         }
//     };

//     // Validate Truck Capacity (must be between 1800 and 6000)
//     const validateCapacity = (value) => {
//         const capacity = Number(value);
//         if (capacity < 1800) {
//             setCapacityError("Capacity cannot be less than 1800 Kg.");
//         } else if (capacity > 6000) {
//             setCapacityError("Capacity cannot exceed 6000 Kg.");
//         } else {
//             setCapacityError(""); // Clear error if valid
//         }
//     };

//     function sendData(e) {
//         e.preventDefault();
    
//         if (dateError || capacityError) {
//             alert("Please fix the validation errors before submitting.");
//             return;
//         }
    
//         const newTruckRequest = {
//             RequestID: requestID,
//             Truck_RegNumber: truck_RegNumber,
//             PickUp_ID: pickUpID,
//             driver_id: driver_id,
//             Request_Date: pickupDate,
//             TruckCapacity: capacity,
//             PickupLocation: pickupLoc,
//             Priority: priority,
//             RequestStatus: "Requested" // Truck request status
//         };
    
//         // First: Create truck request
//         axios.post("http://localhost:8070/requestTruck/addtruckRequest", newTruckRequest)
//             .then(() => {
//                 // Second: Update status in pickupRequests table
//                 axios.put(`http://localhost:8070/pickupRequests/updatePickupRequest/${pickUpID}`, {
//                     Status: "Requested"
//                 })
//                 .then(() => {
//                     alert("Truck request created and pickup status updated.");
//                     navigate("/");
//                 })
//                 .catch((err) => {
//                     alert("Truck created, but failed to update pickup status.");
//                     console.error(err);
//                 });
//             })
//             .catch((err) => {
//                 alert("Error creating truck request.");
//                 console.error(err);
//             });
//     }
    

//     return (
//         <div className="col1Div">
//             <div className="outerDiv">
//                 <div className="innerDiv1">
//                     <Navbar />
//                 </div>
//                 <div className="innerDivR">
//                     <div className="form-container">
//                         <h2>Create Truck Request</h2>
//                         <form onSubmit={sendData}>
//                             <label htmlFor="requestID">Request ID:</label>
//                             <input type="text" id="requestID" value={requestID || ""} required disabled />
//                             <div className="hint-message">Check Request ID</div>

//                             <label htmlFor="pickUpId">Pickup ID:</label>
//                             <input type="text" id="pickUpId" value={pickUpID || ""} required disabled />

//                             <label htmlFor="requestDate">Request Date:</label>
//                             <input type="date" id="requestDate" name="requestDate" value={pickupDate}
//                                 onChange={(e) => setPickupDate(e.target.value)}
//                                 onBlur={(e) => validateDate(e.target.value)}
//                                 min={getTodayDate()} max={getMaxDate()}
//                                 required />
//                             {dateError && <div className="error-message">{dateError}</div>}

//                             <label htmlFor="truckCapacity">Truck Capacity (in Kg):</label>
//                             <div className="input-container">
//                                 <input type="number" id="truckCapacity" name="truckCapacity" value={capacity} min="1800" max="6000" step="100"
//                                     onChange={(e) => setCapacity(e.target.value)}
//                                     onBlur={(e) => validateCapacity(e.target.value)}
//                                     required />
//                                 <span className="unit-label">Kg</span>
//                             </div>
//                             <div className="hint-message">Capacity must be between 1800 - 6000Kg</div>
//                             {capacityError && <div className="error-message">{capacityError}</div>}

//                             <label htmlFor="wasteType">Waste Type:</label>
//                             <input type="text" id="wasteType" name="wasteType" value={wastetype} readOnly />

//                             <label htmlFor="pickupLocation">Pickup Location:</label>
//                             <textarea id="pickupLocation" name="pickupLocation" value={pickupLoc}
//                                 onChange={(e) => setPickupLoc(e.target.value)}
//                                 required readOnly></textarea>

//                             <label htmlFor="priority">Select Priority *:</label>
//                             <select id="priority" className="selectDiv" onChange={(e) => setPriority(e.target.value)} required>
//                                 <option value="High">High</option>
//                                 <option value="Medium">Medium</option>
//                                 <option value="Low">Low</option>
//                             </select>

//                             <label htmlFor="status">Status:</label>
//                             <input type="text" id="status" value={RequestStatus} name="status" disabled />

//                             <button type="submit">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateTruckRequests;

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
    const [wastetype, setWastetype] = useState("");

    // State for user inputs
    const [requestID, setRequestID] = useState("");
    const [truck_RegNumber, setTruck_RegNumber] = useState("");
    const [driver_id, setDriver_id] = useState("");
    const [RequestStatus, setRequestStatus] = useState("Requested");
    const [priority, setPriority] = useState("High");
    const [pickUpID, setPickUp_ID] = useState(pickID);

    // Error states
    const [dateError, setDateError] = useState("");
    const [capacityError, setCapacityError] = useState("");

    // Fetch latest request ID
    useEffect(() => {
        axios.get("http://Localhost:8070/requestTruck/latestRequestID")
            .then(response => {
                setRequestID(response.data.newRequestID);
            })
            .catch(error => {
                console.error("Error fetching latest Request ID:", error);
            });
    }, []);

    // Fetch pickup request details
    useEffect(() => {
        axios.get(`http://localhost:8070/pickupRequests/getPickupInfo/${pickID}`)
            .then((response) => {
                const data = response.data.pickUpInfo;
                setPickupDate(data.PickupDate);
                setCapacity(data.Capacity);
                setPickupLoc(data.PickupLocation);
                setWastetype(data.wasteType);
            })
            .catch(() => {
                console.error("Error fetching pickup details.");
            });
    }, [pickID]);

    // Function to get today's date in YYYY-MM-DD format
    function getTodayDate() {
        const today = new Date();
        return today.toISOString().split("T")[0];
    }

    // Function to get max allowed date (7 days from today)
    function getMaxDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 7);
        return maxDate.toISOString().split("T")[0];
    }

    // Validate Request Date
    const validateDate = (selectedDate) => {
        const today = new Date(getTodayDate());
        const maxDate = new Date(getMaxDate());
        const chosenDate = new Date(selectedDate);

        if (chosenDate < today || chosenDate > maxDate) {
            setDateError("Date must be today or within the next 7 days.");
        } else {
            setDateError(""); // Clear error if valid
        }
    };

    // Validate Truck Capacity (must be between 1800 and 6000)
    const validateCapacity = (value) => {
        const capacity = Number(value);
        if (capacity < 1800) {
            setCapacityError("Capacity cannot be less than 1800 Kg.");
        } else if (capacity > 6000) {
            setCapacityError("Capacity cannot exceed 6000 Kg.");
        } else {
            setCapacityError(""); // Clear error if valid
        }
    };

    function sendData(e) {
        e.preventDefault();
    
        if (dateError || capacityError) {
            alert("Please fix the validation errors before submitting.");
            return;
        }
    
        const newTruckRequest = {
            RequestID: requestID,
            Truck_RegNumber: truck_RegNumber,
            PickUp_ID: pickUpID,
            driver_id: driver_id,
            Request_Date: pickupDate,
            TruckCapacity: capacity,
            PickupLocation: pickupLoc,
            Priority: priority,
            RequestStatus: "Requested" // Truck request status
        };
    
        // First: Create truck request
        axios.post("http://localhost:8070/requestTruck/addtruckRequest", newTruckRequest)
            .then(() => {
                // Second: Update status in pickupRequests table
                axios.put(`http://localhost:8070/pickupRequests/updatePickupRequest/${pickUpID}`, {
                    Status: "Requested"
                })
                .then(() => {
                    alert("Truck request created and pickup status updated.");
                    navigate("/");
                })
                .catch((err) => {
                    alert("Truck created, but failed to update pickup status.");
                    console.error(err);
                });
            })
            .catch((err) => {
                alert("Error creating truck request.");
                console.error(err);
            });
    }

    return (
        <div className="create-truck-col1Div">
            <div className="create-truck-outerDiv">
                <div className="create-truck-innerDiv1">
                    <Navbar />
                </div>
                <div className="create-truck-innerDivR">
                    <div className="create-truck-form-container">
                        <h2 className="create-truck-header">Create Truck Request</h2>
                        <form className="create-truck-form create-truck-input-container " onSubmit={sendData}>
                            <label htmlFor="requestID" className="create-truck-label">Request ID:</label>
                            <input  type="text" id="requestID" value={requestID || ""} required disabled />
                            <div className="create-truck-hint-message">Check Request ID</div>

                            <label htmlFor="pickUpId" className="create-truck-label">Pickup ID:</label>
                            <input type="text" id="pickUpId" value={pickUpID || ""} required disabled />

                            <label htmlFor="requestDate" className="create-truck-label">Request Date:</label>
                            <input type="date" id="requestDate" name="requestDate" value={pickupDate}
                                onChange={(e) => setPickupDate(e.target.value)}
                                onBlur={(e) => validateDate(e.target.value)}
                                min={getTodayDate()} max={getMaxDate()}
                                required />
                            {dateError && <div className="create-truck-error-message">{dateError}</div>}

                            <label htmlFor="truckCapacity" className="create-truck-label">Truck Capacity (in Kg):</label>
                            <div className="create-truck-input-container">
                                <input type="number" id="truckCapacity" name="truckCapacity" value={capacity} min="1800" max="6000" step="100"
                                    onChange={(e) => setCapacity(e.target.value)}
                                    onBlur={(e) => validateCapacity(e.target.value)}
                                    required />
                                <span className="create-truck-unit-label">Kg</span>
                            </div>
                            <div className="create-truck-hint-message">Capacity must be between 1800 - 6000Kg</div>
                            {capacityError && <div className="create-truck-error-message">{capacityError}</div>}

                            <label htmlFor="wasteType" className="create-truck-label">Waste Type:</label>
                            <input type="text" id="wasteType" name="wasteType" value={wastetype} readOnly />

                            <label htmlFor="pickupLocation" className="create-truck-label">Pickup Location:</label>
                            <textarea id="pickupLocation" name="pickupLocation" value={pickupLoc}
                                onChange={(e) => setPickupLoc(e.target.value)}
                                required readOnly></textarea>

                            <label htmlFor="priority" className="create-truck-label">Select Priority *:</label>
                            <select id="priority" className="create-truck-select-div" onChange={(e) => setPriority(e.target.value)} required>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>

                            <label htmlFor="status" className="create-truck-label">Status:</label>
                            <input type="text" id="status" value={RequestStatus} name="status" disabled />

                            <button type="submit" className="create-truck-submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTruckRequests;

