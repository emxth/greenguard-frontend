import Navbar from './Components/SideNav';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./styles/TruckDashboard.css";
import { useNavigate } from "react-router-dom";

function TruckDashBoard() {

    const [truckRequests, setTruckRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://Localhost:8080/truckRequest/gettruckRequests")
            .then(response => {
                setTruckRequests(response.data);
            })
            .catch(error => {
                console.error("Error fetching truck requests:", error);
            });
    }, []);

    function allocateTruck(reqID){
        console.log(reqID);
        navigate(`/allocateTruck/${reqID}`);
    }


    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <h3 style={{ textAlign: "left" }}>Truck Manager<h1 style={{ textAlign: "center" }}>Dashboard</h1></h3>

                    <div className="card-container">
                        {truckRequests.length > 0 ? (
                            truckRequests.map((request, index) => (
                                <div key={index} className="card">
                                    <label><strong>Request ID:</strong>  {request.RequestID}</label>
                                    <label><strong>Request Date:</strong> {request.Request_Date}</label>
                                    <label><strong>Truck Capacity:</strong> {request.TruckCapacity}  Kg</label>
                                    <label><strong>Pickup Location:</strong> {request.PickupLocation}</label>
                                    <label><strong>Request Status:</strong> {request.RequestStatus} </label>
                                    <label><strong>Priority :</strong> {request.Priority} </label>
                                    <button  onClick={() => allocateTruck(request.RequestID)} className="allocate-btn">Allocate Truck</button>
                                </div>
                            ))
                        ) : (
                            <p>No truck requests available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TruckDashBoard;

// function TruckDashBoard() {
//     const [truckRequests, setTruckRequests] = useState([]);

//     useEffect(() => {
//         axios.get("http://localhost:8070/requestTruck/getAllRequests")
//             .then(response => {
//                 setTruckRequests(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching truck requests:", error);
//             });
//     }, []);

//     return (
//         <div className="col1Div">
//             <div className="outerDiv">
//                 <div className="innerDiv1">
//                     <Navbar />
//                 </div>
//                 <div className="innerDivR">
//                     <h1>Truck Requests Dashboard</h1>
//                     <div className="card-container">
//                         {truckRequests.length > 0 ? (
//                             truckRequests.map((request, index) => (
//                                 <div key={index} className="card">
//                                     <label><strong>Request ID:</strong> {request.RequestID}</label>
//                                     <label><strong>Request Date:</strong> {request.Request_Date}</label>
//                                     <label><strong>Truck Capacity:</strong> {request.TruckCapacity} Kg</label>
//                                     <label><strong>Pickup Location:</strong> {request.PickupLocation}</label>
//                                     <label><strong>Request Status:</strong> {request.RequestStatus}</label>
//                                     <button className="allocate-btn">Allocate Truck</button>
//                                 </div>
//     ))
// ) : (
//     <p>No truck requests available.</p>
// )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }