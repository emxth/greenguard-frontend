import Navbar from './components/sideNavBar';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./styles/RequestManagerDashboard.css";

function RequestManagerDashboard() {
    const [assignedRequests, setAssignedRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://Localhost:8070/requestTruck/getAssignedRequests") // Replace with your actual API
            .then(response => {
                setAssignedRequests(response.data);
            })
            .catch(error => {
                console.error("Error fetching requests:", error);
            });
    }, []);

    function handleCreateSchedule(truckReqID){
        console.log(truckReqID);
        navigate(`/createSchedule/${truckReqID}`);
    }

    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <h1>Collection Request Manager</h1>

                    <div className="cards-container">
                        {assignedRequests.map((requestAssigned, index) => (
                            <div key={index} className="request-card">
                                <p><strong>Request ID:</strong> {requestAssigned.RequestID}</p>
                                <p><strong>Truck Number:</strong> {requestAssigned.Truck_RegNumber}</p>
                                <p><strong>Driver:</strong> {requestAssigned.driver_id}</p>
                                <p><strong>Status:</strong> {requestAssigned.RequestStatus}</p>
                                <button onClick={() => handleCreateSchedule(requestAssigned.RequestID)}>Create Schedule</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default RequestManagerDashboard;
