import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Components/SideNav";
import { useNavigate } from "react-router-dom";
import "../styles/ViewOneTruck.css";


function TruckDetails() {
    const { regNum } = useParams(); // Get RegNumber from URL
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    var [disableElements, setDisabledElements] = useState(true);

    const [btnLabel, setBtnLabel] = useState("Edit");

    const [truckCapacity, setTruckCapacity] = useState(null);
    const [truckInsurance, setTruckInsurance] = useState(null);
    const [truckInspection, setTruckInspection] = useState(null);
    const [truckCollectID, setTruckCollectID] = useState(null);
    const [truckDriver, setTruckDriver] = useState(null);
    const [truckStatus, setTruckStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/truck/get/${regNum}`)
            .then((response) => {
                setTruckCapacity(response.data.TruckInfo.Capacity);
                setTruckInsurance(response.data.TruckInfo.Insurance_Expiry);
                setTruckInspection(response.data.TruckInfo.Inspection__date);
                setTruckCollectID(response.data.TruckInfo.Collection_center_id);
                setTruckDriver(response.data.TruckInfo.driver_id);
                setTruckStatus(response.data.TruckInfo.isActive);
                setTruck(response.data.TruckInfo);
                setLoading(false);
                console.log(response.data.TruckInfo.isActive);
            })
            .catch((err) => {
                setError("Error fetching truck details.");
                setLoading(false);
            });
    }, [regNum]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    function updateVehicleInfo(e) {
        e.preventDefault();
        if (btnLabel == 'Edit') {
            setDisabledElements(false);
            setBtnLabel("Update");
        } else if (btnLabel == 'Update') {
            updateTruck();
        }
    }

    function navigateToCostForm(regNumber) {
        console.log(regNumber);
        navigate(`/Maintenance/${regNumber}`);
    }

    function navigateToFuelCostForm(regNumber) {
        console.log("Fuel : " + regNumber);
        navigate(`/FuelCost/${regNumber}`);
    }

    function handleChange(e) {
        console.log(e.target.value)
        let value = e.target.value;
        if (e.target.name == "updCapacity") {
            setTruckCapacity(value);
        }
        else if (e.target.name == "updInsurance") {
            setTruckInsurance(value);
        }
        else if (e.target.name == "updInspection") {
            setTruckInspection(value);
        }
        else if (e.target.name == "updCollectID") {
            setTruckCollectID(value);
        }
        else if (e.target.name == "updDriverID") {
            setTruckDriver(value);
        }
        else if (e.target.name == "updStatus") {
            let isChecked = e.target.checked;
            setTruckStatus(isChecked)
        }
    }


    // Update Function
    function updateTruck() {
        // Function to update truck details
        const updatedTruckInfo = {
            'Capacity': truckCapacity,
            'Insurance_Expiry': truckInsurance,
            'Inspection__date': truckInspection,
            'Collection_center_id': truckCollectID,
            'driver_id': truckDriver,
            'isActive': truckStatus
        }
        console.log(updatedTruckInfo);
        axios.put(`http://localhost:8080/truck/update/${regNum}`, updatedTruckInfo)
            .then(() => {
                alert("Truck details updated successfully!");
                // Redirect to homepage after update
            })
            .catch((error) => {
                console.error("Error updating truck data:", error);
                alert("Failed to update truck details.");
            });
    }



    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <div>
                        <>
                            <td>
                                <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
                                    <form>
                                        <h2>Truck Details</h2>
                                        <label>Truck ID:</label>
                                        <input type="text" value={truck.RegNumber} disabled style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                                        <label>Capacity:</label>
                                        <input type="text" onChange={handleChange} name="updCapacity" defaultValue={truckCapacity} disabled={disableElements} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                                        <label>Insurance Expiry:</label>
                                        <input type="date" onChange={handleChange} name="updInsurance" defaultValue={truckInsurance} disabled={disableElements} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                                        <label>Inspection Date:</label>
                                        <input type="date" onChange={handleChange} name="updInspection" defaultValue={truckInspection} disabled={disableElements} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                                        <label>Collection Center ID:</label>
                                        <input type="text" onChange={handleChange} name="updCollectID" defaultValue={truckCollectID} disabled={disableElements} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                                        <label>Driver ID:</label>
                                        <input type="text" onChange={handleChange} name="updDriverID" defaultValue={truckDriver} disabled={disableElements} style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />

                                        <label>Status:</label>
                                        <input type="checkbox" onChange={handleChange} name="updStatus" defaultChecked={truckStatus ? true : false} disabled={disableElements} style={{ width: "20%", padding: "8px", marginBottom: "10px", marginLeft: "0px" }} />
                                        <label>{truckStatus ? "Active" : "Inactive"}</label>

                                        <button type="submit" id="submitBtn" class="btn btn-primary btnPadding" style={{ position: "absolute" }} onClick={updateVehicleInfo}>{btnLabel}</button>
                                    </form>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div>
                                        <button type="submit" class="btn btn-info MaintainBtn" style={{ width: "" }} onClick={() => navigateToCostForm(truck.RegNumber)}>Add maintainance Cost</button>
                                    </div>
                                    <div>
                                        <button type="submit" class="btn btn-info FuelBtn" style={{ width: "" }} onClick={() => navigateToFuelCostForm(truck.RegNumber)}>Add Fuel Cost</button>
                                    </div>
                                </div>
                            </td>
                        </>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default TruckDetails;
