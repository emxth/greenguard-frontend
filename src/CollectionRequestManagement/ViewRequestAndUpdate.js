import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import BackBtn from "../TruckManagement/Components/BackBtn";
import "./styles/CreateTruckRequest.css";

// function ViewRequestAndUpdate() {
//     const { request_ID } = useParams(); // Get Req_ID from URL
//     const [truckRequest, setTruckrequest] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     var [disableElements, setDisabledElements] = useState(true);

//     const [btnLabel, setBtnLabel] = useState("Edit");

//     const [requestID, setRequestID] = useState(null);
//     const [truck_RegNumber, setTruck_RegNumber] = useState(null);
//     const [driver_id, setDriver_id] = useState(null);
//     const [request_Date, setRequest_Date] = useState(null);
//     const [truckCapacity, setTruckCapacity] = useState(null);
//     const [destination, setDestination] = useState(null);
//     const [pickupLocation, setPickupLocation] = useState(null);
//     const [RequestStatus, setRequestStatus] = useState(null);
//     // const navigate = useNavigate();

//     // const [capacityError, setCapacityError] = useState("");
//     // const [insuranceDateError, setInsuranceDateError] = useState("");
//     // const [inspectionDateError, setInspectionDateError] = useState("");

//     useEffect(() => {
//         axios.get(`http://Localhost:8070/requestTruck/gettruckRequest/${request_ID}`)
//             .then((response) => {
//                 setRequestID(response.data.RequestInfo.RequestID);
//                 setTruck_RegNumber(response.data.RequestInfo.Truck_RegNumber);
//                 setDriver_id(response.data.RequestInfo.driver_id);
//                 setRequest_Date(response.data.RequestInfo.Request_Date);
//                 setTruckCapacity(response.data.RequestInfo.TruckCapacity);
//                 setDestination(response.data.RequestInfo.PickupLocation);
//                 setPickupLocation(response.data.Destination);
//                 setRequestStatus(response.data.RequestStatus);
//                 setTruck(response.data.RequestInfo);
//                 setLoading(false);

//                 console.log(response.data.RequestInfo);
//             })
//             .catch((err) => {
//                 setError("Error fetching truck request details.");
//                 setLoading(false);
//             });
//     }, [request_ID]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p style={{ color: "red" }}>{error}</p>;

//     // function updateVehicleInfo(e) {
//     //     e.preventDefault();
//     //     if (btnLabel == 'Edit') {
//     //         setDisabledElements(false);
//     //         setBtnLabel("Update");
//     //     } else if (btnLabel == 'Update') {
//     //         updateTruck();
//     //     }
//     // }

//     // function navigateToCostForm(regNumber) {
//     //     console.log(regNumber);
//     //     navigate(`/Maintenance/${regNumber}`);
//     // }

//     // function navigateToFuelCostForm(regNumber) {
//     //     console.log("Fuel : " + regNumber);
//     //     navigate(`/FuelCost/${regNumber}`);
//     // }

//     // // Validate Capacity (1800 - 6000 Kg, rounded to nearest 100)
//     // const validateCapacity = (value, setError) => {
//     //     let numValue = parseInt(value, 10);

//     //     if (isNaN(numValue) || numValue < 1800 || numValue > 6000) {
//     //         setError("Capacity must be between 1800Kg and 6000Kg.");
//     //         return false;
//     //     }

//     //     // Round value to nearest 100
//     //     let roundedValue = Math.round(numValue / 100) * 100;
//     //     setTruckCapacity(roundedValue);
//     //     setError("");
//     //     return true;
//     // };

//     // // Validate Future Date (Must be within 1 year from today)
//     // const validateFutureDateWithinOneYear = (date, setError) => {
//     //     const selectedDate = new Date(date);
//     //     const today = new Date();
//     //     today.setHours(0, 0, 0, 0);

//     //     const oneYearLater = new Date();
//     //     oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

//     //     if (selectedDate <= today) {
//     //         setError("Date must be in the future.");
//     //         return false;
//     //     } else if (selectedDate > oneYearLater) {
//     //         setError("Date cannot be more than 1 year from today.");
//     //         return false;
//     //     }

//     //     setError("");
//     //     return true;
//     // };

//     // // Handle Input Changes & Validate
//     // const handleChange = (e) => {
//     //     let value = e.target.value;

//     //     if (e.target.name === "updCapacity") {
//     //         validateCapacity(value, setCapacityError);
//     //     } else if (e.target.name === "updInsurance") {
//     //         setTruckInsurance(value);
//     //         validateFutureDateWithinOneYear(value, setInsuranceDateError);
//     //     } else if (e.target.name === "updInspection") {
//     //         setTruckInspection(value);
//     //         validateFutureDateWithinOneYear(value, setInspectionDateError);
//     //     } else if (e.target.name === "updCollectID") {
//     //         setTruckCollectID(value);
//     //     } else if (e.target.name === "updDriverID") {
//     //         setTruckDriver(value);
//     //     } else if (e.target.name === "updStatus") {
//     //         setTruckStatus(e.target.checked);
//     //     }
//     // };



//     // // Update Function
//     // function updateTruck() {
//     //     // Function to update truck details
//     //     const updatedTruckInfo = {
//     //         'Capacity': truckCapacity,
//     //         'Insurance_Expiry': truckInsurance,
//     //         'Inspection__date': truckInspection,
//     //         'Collection_center_id': truckCollectID,
//     //         'driver_id': truckDriver,
//     //         'isActive': truckStatus
//     //     }
//     //     console.log(updatedTruckInfo);
//     //     axios.put(`http://localhost:8080/truck/update/${regNum}`, updatedTruckInfo)
//     //         .then(() => {
//     //             alert("Truck details updated successfully!");
//     //             // Redirect to homepage after update
//     //         })
//     //         .catch((error) => {
//     //             console.error("Error updating truck data:", error);
//     //             alert("Failed to update truck details.");
//     //         });
//     // }
//     return (
//         <div className="col1Div">
//             <div className="outerDiv">
//                 <div className="innerDiv1">
//                     <Navbar />
//                 </div>
//                 <div className="innerDivR">
//                     <div class="form-container">
//                         <h2>Create Truck Request</h2>
//                         <form onSubmit={sendData}>
//                             <label for="requestID">Request ID:</label>
//                             <input type="text" id="requestID" onChange={(e) => setRequestID(e.target.value)}
//                                 onBlur={(e) => validateRequestID(e.target.value)} name="requestID" required />.
//                             <div className="hint-message">Enter in format R000 (e.g., R123)</div>
//                             {error && <div className="error-message">{error}</div>}

//                             <label for="requestDate">Request Date:</label>
//                             <input type="date" id="requestDate" name="requestDate" min={getTodayDate()} max={getMaxDate()}
//                                 onChange={(e) => {
//                                     setRequest_Date(e.target.value);
//                                     validateDate(e.target.value);
//                                 }} required />
//                             {DateError && <div className="error-message">{DateError}</div>}
//                             <label for="truckCapacity">Truck Capacity (in Kg):</label>
//                             <input type="number" id="truckCapacity" name="truckCapacity" min="0" max="6000"
//                                 onChange={(e) => {
//                                     setTruckCapacity(e.target.value);
//                                     validateCapacity(e.target.value);
//                                 }}
//                                 required />
//                             <div className="hint-message">Capacity must be 1000 - 6000Kg</div>
//                             {capacityError && <div className="error-message">{capacityError}</div>}
//                             <label for="pickupLocation">Pickup Location:</label>
//                             <textarea id="pickupLocation" name="pickupLocation" onChange={(e) => setPickupLocation(e.target.value)}
//                                 onBlur={(e) => validateAddress(e.target.value, "pickup")} required></textarea>
//                             {errors.pickup && <div className="error-message">{errors.pickup}</div>}
//                             <label for="destination">Destination:</label>
//                             <textarea id="destination" name="destination" onChange={(e) => setDestination(e.target.value)}
//                                 onBlur={(e) => validateAddress(e.target.value, "destination")} required></textarea>
//                             {errors.destination && <div className="error-message">{errors.destination}</div>}
//                             <label for="status">Status:</label>
//                             <input type="text" id="status" value={RequestStatus} name="status" />

//                             <button type="submit">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

function ViewRequestAndUpdate() {
    return (
        <div>Edit</div>
    );
}

export default ViewRequestAndUpdate;
