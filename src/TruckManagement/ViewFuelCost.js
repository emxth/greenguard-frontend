import React, { useState, useEffect } from "react";
import axios from "axios";
import BackBtn from "../TruckManagement/Components/BackBtn";

function ViewFuelCost() {
    const [truckFuelCosts, setTruckFuelCosts] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling

    useEffect(() => {
        // Fetch truck data from backend
        axios.get("http://localhost:8080/FuelCost/getAllFuelCost")
            .then((response) => {
                setTruckFuelCosts(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching truck Fuel costs:", err);
                setError("Failed to load truck feul costs. Please try again.");
                setLoading(false);
            });
    }, []);

    //Delete fuel cost
    function deleteFuelCost(fuelId, regNum) {
        if (window.confirm(`Are you sure you want to delete Fuel cost with Reg Number: ${regNum}?`)) {
            axios.delete(`http://localhost:8080/FuelCost/deleteFuelCost/${fuelId}`)
                .then(() => alert("Fuel cost deleted successfully!"))
                .catch((error) => {
                    console.error("Error deleting Fuel cost:", error);
                    alert("Failed to delete cost.");
                });
        }
    }

    if (loading) return <p>Loading truck Costs...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <div>
                <BackBtn />
            </div>
            <div style={{ padding: "20px" }}>
                <h2>Truck Cost Details</h2>
                <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                        <tr>
                            <th>Truck_Number</th>
                            <th>Fuel Date</th>
                            <th>Fuel Type</th>
                            <th>Fuel Cost</th>
                            <th>Litres</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {truckFuelCosts.length > 0 ? (
                            truckFuelCosts.map((FuelCost) => (
                                <tr>
                                    <td>{FuelCost.Truck_RegNum}</td>
                                    <td>{FuelCost.Fuel_Date}</td>
                                    <td>{FuelCost.FuelType}</td>
                                    <td>{FuelCost.FuelCost}</td>
                                    <td>{FuelCost.Litres}</td>
                                    <td>{FuelCost.Status}</td>
                                    <td>
                                        <button style={{ marginLeft: "5px" }} onClick={() => deleteFuelCost(FuelCost._id, FuelCost.Truck_RegNum)}>Delete</button>
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

export default ViewFuelCost;
