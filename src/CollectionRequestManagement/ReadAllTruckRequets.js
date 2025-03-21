

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/ReadAllTruckRequests.css";

function ReadAllTruckRequests() {
    const [truckrequests, setTruckrequests] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling
    const navigate = useNavigate();

    const [allTruckRequest, setAllTruckRequest] = useState([]); // Store all trucks for resetting the table
    // const [searchRegNum, setSearchRegNum] = useState("");

    useEffect(() => {
        // Fetch truck data from backend
        axios.get("http://Localhost:8070/requestTruck/")
            .then((response) => {
                setTruckrequests(response.data);
                setAllTruckRequest(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching trucks:", err);
                setError("Failed to load trucks. Please try again.");
                setLoading(false);
            });
    }, []);

    // const searchTruck = () => {
    //     if (!searchRegNum.trim()) {
    //         setTrucks(allTrucks); // Reset table to show all trucks
    //         return;
    //     }

    //     const filteredTrucks = allTrucks.filter(truck =>
    //         truck.RegNumber.toLowerCase().includes(searchRegNum.toLowerCase())
    //     );

    //     setTrucks(filteredTrucks);
    // };



    //Delete code
    function DeleteTruckRequest(req_ID) {
        if (window.confirm(`Are you sure you want to delete truck with Reg Number: ${req_ID}?`)) {
            axios.delete(`http://Localhost:8070/requestTruck/deleteRequest/${req_ID}`)
                .then(() => alert("Truck request deleted successfully!"))
                .catch((error) => {
                    console.error("Error deleting truck request :", error);
                    alert("Failed to delete request.");
                });
        }
    }

    if (loading) return <p>Loading trucks...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    //Navigate function
    function NavigateToViewRequests(request_ID) {
        console.log(request_ID);
        navigate(`/ViewOneRequest/${request_ID}`);
    }

    // //Navigate to truck cost
    // function NavigateToTruckCosts() {
    //     navigate(`/truckCost`);
    // }

    // function NavigateToFuelCosts() {
    //     navigate(`/truckFuelCost`);
    // }

    return (
        <div>
            {/* <div>
                <BackBtn/>
            </div> */}
            <div className="table-container">
                <table className="request-table">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Truck Number</th>
                            <th>Driver ID</th>
                            <th>Request Date</th>
                            <th>Truck Capacity</th>
                            <th>Pickup Location</th>
                            <th>Request Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {truckrequests.length > 0 ? (
                            truckrequests.map((requests) => (
                                <tr key={requests.RequestID}>
                                    <td>{requests.RequestID}</td>
                                    <td>{requests.Truck_RegNumber}</td>
                                    <td>{requests.driver_id}</td>
                                    <td>{requests.Request_Date}</td>
                                    <td>{requests.TruckCapacity}</td>
                                    <td>{requests.PickupLocation}</td>
                                    <td className="status-pending">{requests.RequestStatus}</td>
                                    <td className="action-bar">
                                        <button type="submit" className="delete-btn" onClick={() => DeleteTruckRequest(requests.RequestID)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No costs found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ReadAllTruckRequests;
