import React, { useState, useEffect } from "react";
import axios from "axios";
import BackBtn from "../TruckManagement/Components/BackBtn";

function ViewTruckCosts() {
    const [truckCost, setTruckCost] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling

    useEffect(() => {
        // Fetch truck data from backend
        axios.get("http://localhost:8080/Maintenance/getAllCosts")
            .then((response) => {
                setTruckCost(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching truck costs:", err);
                setError("Failed to load truck costs. Please try again.");
                setLoading(false);
            });
    }, []);

    function DeleteCost(costID){
        if (window.confirm(`Are you sure you want to delete Cost`)) {
            axios.delete(`http://localhost:8080/Maintenance/deleteCost/${costID}`)
                .then(() => alert("Cost deleted successfully!"))
                .catch((error) => {
                    console.error("Error deleting truck:", error);
                    alert("Failed to delete Cost.");
                });
        }
    }

    if (loading) return <p>Loading truck Costs...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <div>
                <BackBtn />
            </div>
            <h2>Truck Cost Details</h2>
            <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Truck_Number</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Expenses</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {truckCost.length > 0 ? (
                        truckCost.map((cost) => (
                            <tr>
                                <td>{cost.Truck_RegNum}</td>
                                <td>{cost.Maintenance_Date}</td>
                                <td>{cost.maintenance_type}</td>
                                <td>{cost.Cost}</td>
                                <td>{cost.Description}</td>
                                <td>{cost.Status}</td>
                                <td>
                                    <button type="submit" onClick={() => DeleteCost(cost._id)}>Delete</button>
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
    );
}

export default ViewTruckCosts;
