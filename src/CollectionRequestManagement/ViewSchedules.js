
import BackBtn from "./components/BackBtn";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/viewShedules.css";

function ViewSchedules() {
    const [pickUpSchedules, setSchedules] = useState([]); // Stores fetched truck data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error handling
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch truck data from backend
        axios.get("http://Localhost:8070/shedulePickup/getAllSchedule")
            .then((response) => {
                setSchedules(response.data); // Set state with fetched data
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching Schedules:", err);
                setError("Failed to load Schedules. Please try again.");
                setLoading(false);
            });
    }, []);

    //Delete code
    function DeleteSchedule(schedule_ID) {
        if (window.confirm(`Are you sure you want to delete schedule with schedule Number: ${schedule_ID}?`)) {
            axios.delete(`http://Localhost:8070/shedulePickup/deleteSchedule/${schedule_ID}`)
                .then(() => alert("Schedule deleted successfully!"))
                .catch((error) => {
                    console.error("Error deleting schedule :", error);
                    alert("Failed to delete schedule.");
                });
        }
    }

    //update code
    function UpdateSchedule(schedule_ID){
        console.log(schedule_ID);
        navigate(`/ViewRequestAndUpdate/${schedule_ID}`)
    }

    if (loading) return <p>Loading trucks...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <div>
                <BackBtn />
            </div>
            <div className="table-container">
                <table className="request-table">
                    <thead>
                        <tr>
                            <th>Schedule ID</th>
                            <th>PickUp ID</th>
                            <th>Truck Number</th>
                            <th>driver ID</th>
                            <th>Schedule Date</th>
                            <th>Comments</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pickUpSchedules.length > 0 ? (
                            pickUpSchedules.map((schedule) => (
                                <tr key={schedule.Schedule_ID}>
                                    <td>{schedule.Schedule_ID}</td>
                                    <td>{schedule.PickUp_ID}</td>
                                    <td>{schedule.Truck_RegNumber}</td>
                                    <td>{schedule.driver_id}</td>
                                    <td>{schedule.ScheduleDate}</td>
                                    <td>{schedule.Comments}</td>
                                    <td className="status-pending">{schedule.ScheduleStatus}</td>
                                    <td className="action-bar">
                                        <button type="submit" className="edit-btn" onClick={() => UpdateSchedule(schedule.Schedule_ID)}>Edit</button>
                                        <button type="submit" className="delete-btn" onClick={() => DeleteSchedule(schedule.Schedule_ID)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No Requests found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ViewSchedules;
