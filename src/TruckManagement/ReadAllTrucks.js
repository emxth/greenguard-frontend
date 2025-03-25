import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./styles/ReadAllTruck.css";
import BackBtn from "../TruckManagement/Components/BackBtn";

function ReadAllTrucks() {
    const [trucks, setTrucks] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling
    const navigate = useNavigate();

    const [allTrucks, setAllTrucks] = useState([]); // Store all trucks for resetting the table
    const [searchRegNum, setSearchRegNum] = useState("");

    useEffect(() => {
        // Fetch truck data from backend
        axios.get("http://localhost:8080/truck/")
            .then((response) => {
                setTrucks(response.data);
                setAllTrucks(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching trucks:", err);
                setError("Failed to load trucks. Please try again.");
                setLoading(false);
            });
    }, []);

    const searchTruck = () => {
        if (!searchRegNum.trim()) {
            setTrucks(allTrucks); // Reset table to show all trucks
            return;
        }

        const filteredTrucks = allTrucks.filter(truck =>
            truck.RegNumber.toLowerCase().includes(searchRegNum.toLowerCase())
        );

        setTrucks(filteredTrucks);
    };



    //Delete code
    function deleteTruck(regNum) {
        if (window.confirm(`Are you sure you want to delete truck with Reg Number: ${regNum}?`)) {
            axios.delete(`http://localhost:8080/truck/delete/${regNum}`)
                .then(() => alert("Truck deleted successfully!"))
                .catch((error) => {
                    console.error("Error deleting truck:", error);
                    alert("Failed to delete truck.");
                });
        }
    }

    if (loading) return <p>Loading trucks...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    //Navigate function
    function NavigateToViewTruck(truckRegNum) {
        console.log(truckRegNum);
        navigate(`/truck/${truckRegNum}`);

    }

    //Navigate to truck cost
    // function NavigateToTruckCosts() {
    //     navigate(`/truckCost`);
    // }

    // function NavigateToFuelCosts() {
    //     navigate(`/truckFuelCost`);
    // }

    return (
        <div className="col1Div">
            <div>
                <BackBtn/>
            </div>
            <div className="outerDiv">
                <div className="innerDivR">
                    <div style={{ padding: "20px" }}>
                        <h2>Truck Details</h2>

                        {/* Search Bar */}
                        <input
                            type="text"
                            placeholder="Enter Truck Reg Number"
                            value={searchRegNum}
                            onChange={(e) => setSearchRegNum(e.target.value)}
                        />
                        <button onClick={searchTruck}>Search</button>
                        <button onClick={() => setTrucks(allTrucks)} style={{ marginLeft: "5px" }}>Reset</button>
                        <br></br><br></br>
                        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
                            <thead>
                                <tr>
                                    <th>Reg Number</th>
                                    <th>Model</th>
                                    <th>Capacity</th>
                                    <th>Insurance Expiry</th>
                                    <th>Inspection Date</th>
                                    <th>Collection Center</th>
                                    <th>Driver ID</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trucks.length > 0 ? (
                                    trucks.map((truck) => (
                                        <tr key={truck.RegNumber}>
                                            <td>{truck.RegNumber}</td>
                                            <td>{truck.Model}</td>
                                            <td>{truck.Capacity}</td>
                                            <td>{truck.Insurance_Expiry}</td>
                                            <td>{truck.Inspection__date}</td>
                                            <td>{truck.Collection_center_id}</td>
                                            <td>{truck.driver_id}</td>
                                            <td>{truck.isActive ? "Active" : "Inactive"}</td>
                                            <td>
                                                <button onClick={() => NavigateToViewTruck(truck.RegNumber)}>View</button>
                                                <button style={{ marginLeft: "5px" }} onClick={() => deleteTruck(truck.RegNumber)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8">No trucks found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* <button type="submit" onClick={() => NavigateToTruckCosts()}>Costs</button>
                        <button type="submit" onClick={() => NavigateToFuelCosts()}>Fuel Costs</button> */}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ReadAllTrucks;
