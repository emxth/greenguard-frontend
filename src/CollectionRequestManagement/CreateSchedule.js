// import Navbar from './components/sideNavBar';
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import "./styles/CreatePickUpSchedule.css";

// function CreateSchedule() {
//     const { truckReqID } = useParams();
//     const navigate = useNavigate();

//     // State for fetched data
//     const [truck_RegNumber, setTruck_RegNumber] = useState("");
//     const [driverId, setDriver_id] = useState("");
//     const [scheduleID, setSchedule_ID] = useState("");

//     // State for user inputs
//     const [pickUpID, setPickUp_ID] = useState("");
//     const [comments, setComments] = useState("");
//     const [scheduleDate, setScheduleDate] = useState("");
//     const [errors, setErrors] = useState({});
//     const [scheduleStatus, setScheduleStatus] = useState("Processing");

//     // Fetch the latest pickup ID when the component loads
//     useEffect(() => {
//         axios.get("http://localhost:8070/shedulePickup/latestScheduleID")
//             .then(response => {
//                 setSchedule_ID(response.data.newSchedule_ID); // Store formatted ID (R01, R02)
//             })
//             .catch(error => {
//                 console.error("Error fetching latest schedule ID:", error);
//             });
//     }, []);

//     // Fetch request details
//     useEffect(() => {
//         axios.get(`http://localhost:8070/requestTruck/gettruckRequest/${truckReqID}`)
//             .then((response) => {
//                 const data = response.data.truckRequestInfo;
//                 setTruck_RegNumber(data.Truck_RegNumber);
//                 setDriver_id(data.driver_id);
//                 setPickUp_ID(data.PickUp_ID);
//             })
//             .catch(() => {
//                 setErrors((prev) => ({ ...prev, pickup: "Error fetching truck request details." }));
//             });
//     }, [truckReqID]);

//     // Function to validate the schedule date
//     const validateScheduleDate = (date) => {
//         const selectedDate = new Date(date);
//         const today = new Date();
//         today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

//         const maxDate = new Date();
//         maxDate.setDate(today.getDate() + 14); // Allow only up to 14 days from today

//         if (selectedDate < today) {
//             return "Past dates are not allowed.";
//         } else if (selectedDate > maxDate) {
//             return "Date must be within the next two weeks.";
//         }
//         return ""; // No error
//     };

//     // onChange handler for the schedule date
//     const handleScheduleDateChange = (e) => {
//         const date = e.target.value;
//         const errorMessage = validateScheduleDate(date);

//         if (errorMessage) {
//             setErrors((prev) => ({ ...prev, scheduleDate: errorMessage }));
//         } else {
//             setErrors((prev) => ({ ...prev, scheduleDate: "" })); // Clear error
//             setScheduleDate(date);
//         }
//     };

//     // Handle form submission
//     function sendData(e) {
//         e.preventDefault();

//         if (errors.scheduleDate) {
//             alert("Please fix the errors before submitting.");
//             return;
//         }

//         const newPickUpSchedule = {
//             Schedule_ID: scheduleID,
//             PickUp_ID: pickUpID,
//             Truck_RegNumber: truck_RegNumber,
//             driver_id: driverId,
//             ScheduleDate: scheduleDate,
//             Comments: comments
//         };

//         axios.post("http://Localhost:8070/shedulePickup/addPickUpSchedule", newPickUpSchedule)
//             .then(() => {
//                 alert("Truck schedule Created");
//                 // navigate("/");
//             })
//             .catch((err) => {
//                 alert(err);
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
//                         <h2>Create Schedule</h2>
//                         <form onSubmit={sendData}>
//                             <label htmlFor="scheduleID">Schedule ID:</label>
//                             <input type="text" id="scheduleID" value={scheduleID} required readOnly />
//                             <div className="hint-message">Check Schedule ID</div>

//                             <label htmlFor="pickupID">Pickup ID:</label>
//                             <input type="text" id="pickupID" value={pickUpID} required readOnly />

//                             <label htmlFor="truckRegNumber">Truck Reg Number:</label>
//                             <input type="text" id="truckRegNumber" value={truck_RegNumber} required readOnly />

//                             <label htmlFor="driverID">Driver ID:</label>
//                             <input type="text" id="driverID" value={driverId} required />

//                             <label htmlFor="scheduleDate">Schedule Date:</label>
//                             <input 
//                                 type="date" 
//                                 id="scheduleDate" 
//                                 name="scheduleDate" 
//                                 onChange={handleScheduleDateChange} 
//                                 required 
//                             />
//                             {errors.scheduleDate && <p className="error-message">{errors.scheduleDate}</p>}

//                             <label htmlFor="comment">Comment:</label>
//                             <textarea id="comment" name="comment" onChange={(e) => {
//                                 setComments(e.target.value);
//                             }} required></textarea>

//                             <button type="submit">Submit</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default CreateSchedule;

import Navbar from './components/sideNavBar';
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles/CreatePickUpSchedule.css";

function CreateSchedule() {
    const { truckReqID } = useParams();
    const navigate = useNavigate();

    // State for fetched data
    const [truck_RegNumber, setTruck_RegNumber] = useState("");
    const [driverId, setDriver_id] = useState("");
    const [scheduleID, setSchedule_ID] = useState("");

    // State for user inputs
    const [pickUpID, setPickUp_ID] = useState("");
    const [comments, setComments] = useState("");
    const [scheduleDate, setScheduleDate] = useState("");
    const [scheduleStatus, setScheduleStatus] = useState("Processing");
    const [errors, setErrors] = useState({});

    // Fetch the latest schedule ID
    useEffect(() => {
        axios.get("http://localhost:8070/shedulePickup/latestScheduleID")
            .then(response => {
                setSchedule_ID(response.data.newSchedule_ID);
            })
            .catch(error => {
                console.error("Error fetching latest schedule ID:", error);
            });
    }, []);

    // Fetch request details
    useEffect(() => {
        axios.get(`http://localhost:8070/requestTruck/gettruckRequest/${truckReqID}`)
            .then((response) => {
                const data = response.data.truckRequestInfo;
                setTruck_RegNumber(data.Truck_RegNumber);
                setDriver_id(data.driver_id);
                setPickUp_ID(data.PickUp_ID);
            })
            .catch(() => {
                setErrors((prev) => ({ ...prev, pickup: "Error fetching truck request details." }));
            });
    }, [truckReqID]);

    // Validate Schedule Date (Today - 14 days ahead)
    const validateScheduleDate = (date) => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const maxDate = new Date();
        maxDate.setDate(today.getDate() + 14); 

        if (selectedDate < today) {
            return "Past dates are not allowed.";
        } else if (selectedDate > maxDate) {
            return "Date must be within the next two weeks.";
        }
        return "";
    };

    const handleScheduleDateChange = (e) => {
        const date = e.target.value;
        const errorMessage = validateScheduleDate(date);

        setErrors((prev) => ({ ...prev, scheduleDate: errorMessage }));
        setScheduleDate(date);
    };

    // Validate Comments (10-200 characters)
    const validateComments = (text) => {
        if (text.length < 10) return "Comment must be at least 10 characters.";
        if (text.length > 200) return "Comment cannot exceed 200 characters.";
        return "";
    };

    const handleCommentsChange = (e) => {
        const text = e.target.value;
        setComments(text);
        setErrors((prev) => ({ ...prev, comments: validateComments(text) }));
    };

    // Handle form submission
    function sendData(e) {
        e.preventDefault();

        if (errors.scheduleDate || errors.comments) {
            alert("Please fix the errors before submitting.");
            return;
        }

        const newPickUpSchedule = {
            Schedule_ID: scheduleID,
            PickUp_ID: pickUpID,
            Truck_RegNumber: truck_RegNumber,
            driver_id: driverId,
            ScheduleDate: scheduleDate,
            Comments: comments,
            ScheduleStatus: scheduleStatus
        };

        axios.post("http://localhost:8070/shedulePickup/addPickUpSchedule", newPickUpSchedule)
            .then(() => {
                alert("Truck schedule Created");
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
                        <h2>Create Schedule</h2>
                        <form onSubmit={sendData}>
                            <label htmlFor="scheduleID">Schedule ID:</label>
                            <input type="text" id="scheduleID" value={scheduleID} required disabled />
                            <div className="hint-message">Check Schedule ID</div>

                            <label htmlFor="pickupID">Pickup ID:</label>
                            <input type="text" id="pickupID" value={pickUpID} required disabled />

                            <label htmlFor="truckRegNumber">Truck Reg Number:</label>
                            <input type="text" id="truckRegNumber" value={truck_RegNumber} required disabled />

                            <label htmlFor="driverID">Driver ID:</label>
                            <input type="text" id="driverID" value={driverId} required readOnly />

                            <label htmlFor="scheduleDate">Schedule Date:</label>
                            <input 
                                type="date" 
                                id="scheduleDate" 
                                name="scheduleDate" 
                                onChange={handleScheduleDateChange} 
                                required 
                            />
                            {errors.scheduleDate && <p className="error-message">{errors.scheduleDate}</p>}

                            <label htmlFor="comment">Comment:</label>
                            <textarea 
                                id="comment" 
                                name="comment" 
                                onChange={handleCommentsChange} 
                                required 
                            ></textarea>
                            {errors.comments && <p className="error-message">{errors.comments}</p>}

                            {/* Schedule Status Dropdown */}
                            <label htmlFor="scheduleStatus">Schedule Status:</label>
                            <select 
                                id="scheduleStatus" 
                                className="selectDiv" 
                                value={scheduleStatus} 
                                onChange={(e) => setScheduleStatus(e.target.value)} 
                                required
                            >
                                <option value="Processing">Processing</option>
                                <option value="Ready for pickup">Ready for pickup</option>
                            </select>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateSchedule;
