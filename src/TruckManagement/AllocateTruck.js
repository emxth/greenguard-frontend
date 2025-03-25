import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styles/AllocateTruck.css";
import BackBtn from "../TruckManagement/Components/BackBtn";

function AllocateTruck() {
    const { reqID } = useParams(); // Get RegNumber from URL
    const [trucks, setTrucks] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling
    // const navigate = useNavigate();

    const [allTrucks, setAllTrucks] = useState([]); // Store all trucks for resetting the table
    const [searchRegNum, setSearchRegNum] = useState("");

    //set fetched request details
    const [requestID, setRequestID] = useState(null);
    const [truckCapacity, setTruckCapacity] = useState(null);

    useEffect(() => {
        axios.get(`http://Localhost:8080/truckRequest/getOnetruckRequests/${reqID}`)
            .then((response) => {
                setRequestID(response.data.RequestInfo.RequestID);
                setTruckCapacity(response.data.RequestInfo.TruckCapacity);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching truck request details.");
                setLoading(false);
            });
    }, [reqID]);

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


    if (loading) return <p>Loading trucks...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    //function to update truck request
    function AssignTruck(RegNum, driverID){
        console.log(RegNum);
        console.log(driverID);
        //http://Localhost:8080/truckRequest/updateTRequest/:reqID

        // Function to update truck details
        const updatedTruckRequest = {
            'Truck_RegNumber': RegNum,
            'driver_id': driverID,
            'RequestStatus': "Assigned"
        }
        console.log(updatedTruckRequest);
        axios.put(`http://Localhost:8080/truckRequest/updateTRequest/${requestID}`, updatedTruckRequest)
            .then(() => {
                alert("Truck Assigned successfully!");
                // Redirect to homepage after update
            })
            .catch((error) => {
                console.error("Error in assigning truck:", error);
                alert("Failed to assign truck.");
            });
    }

    return (
        <div className="col1Div">
            <div>
                <BackBtn />
            </div>
            <div className="outerDiv">
                <div className="innerDivR">
                    <div style={{ padding: "20px" }}>
                        <h2>Assign Truck</h2>
                        <div>
                            <label className="label-style">Request ID : {requestID}</label><br />
                            <label className="label-style">Capacity :  {truckCapacity}</label><br />
                        </div>
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
                                                <button  onClick={() => AssignTruck(truck.RegNumber, truck.driver_id)}>Assign</button>
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
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AllocateTruck;
