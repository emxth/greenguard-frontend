
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/ViewPickUpRequests.css";

function ViewPickUpRequests() {
    const [pickupRequests, setPickUpRequests] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling

    const navigate = useNavigate();

    const [allRequest, setAllRequest] = useState([]); // Store all trucks for resetting the table
    // const [searchRegNum, setSearchRegNum] = useState("");

    useEffect(() => {
        // Fetch truck data from backend
        axios.get("http://localhost:8070/pickupRequests/")
            .then((response) => {
                setPickUpRequests(response.data);
                setAllRequest(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching pickups:", err);
                setError("Failed to load pickups. Please try again.");
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



    // //Delete code
    // function DeleteTruckRequest(req_ID) {
    //     if (window.confirm(`Are you sure you want to delete truck with Reg Number: ${req_ID}?`)) {
    //         axios.delete(`http://Localhost:8070/requestTruck/deleteRequest/${req_ID}`)
    //             .then(() => alert("Truck request deleted successfully!"))
    //             .catch((error) => {
    //                 console.error("Error deleting truck request :", error);
    //                 alert("Failed to delete request.");
    //             });
    //     }
    // }

    if (loading) return <p>Loading trucks...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    //Navigate function
    function Allocatetruck(pickUpID) {
        console.log(pickUpID);
        navigate(`/CreateTruckRequest/${pickUpID}`);
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
                            <th>PickUp_ID</th>
                            <th>Name</th>
                            <th>PickupDate</th>
                            <th>wasteType</th>
                            <th>Capacity</th>
                            <th>Pickup Location</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickupRequests.length > 0 ? (
                            pickupRequests.map((pickups) => (
                                <tr key={pickups.PickUp_ID}>
                                    <td>{pickups.PickUp_ID}</td>
                                    <td>{pickups.Name}</td>
                                    <td>{pickups.PickupDate}</td>
                                    <td>{pickups.wasteType}</td>
                                    <td>{pickups.Capacity}</td>
                                    <td>{pickups.PickupLocation}</td>
                                    <td className="status-pending">{pickups.Status}</td>
                                    <td className="action-bar">
                                        <button type="submit" className="delete-btn" onClick={() => Allocatetruck(pickups.PickUp_ID)}>Allocate truck</button>
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

export default ViewPickUpRequests;
