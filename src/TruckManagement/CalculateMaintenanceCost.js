import Navbar from './Components/SideNav';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/AddTrucks.css";

function CalculateMaintenanceCost() {
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [regNum, setRegNum] = useState("");
    const [mileage, setMileage] = useState("");
    const [lastServiceDate, setLastServiceDate] = useState("");
    const [status, setStatus] = useState("");
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [email, setEmail] = useState("");

    const [mileageError, setMileageError] = useState("");
    const [dateError, setDateError] = useState("");
    const [emailError, setEmailError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8080/truck/")
            .then((response) => {
                setTrucks(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching trucks:", err);
                setError("Failed to load trucks. Please try again.");
                setLoading(false);
            });
    }, []);

    function checkMaintenanceDue(truck) {
        const kmsSinceService = truck.mileage % truck.serviceInterval;
        if (kmsSinceService > truck.serviceInterval * 0.9) {
            return "Maintenance due soon";
        }

        const daysSinceService = (Date.now() - new Date(truck.lastServiceDate)) / (1000 * 60 * 60 * 24);
        if (daysSinceService > 180) {
            return "Maintenance overdue";
        }

        return "All good";
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Reset errors
        setMileageError("");
        setDateError("");

        let valid = true;
        const today = new Date();
        const selectedDate = new Date(lastServiceDate);
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(today.getFullYear() - 2);

        if (parseFloat(mileage) < 0) {
            setMileageError("Mileage must not be negative.");
            valid = false;
        }

        if (selectedDate > today) {
            setDateError("Last service date cannot be in the future.");
            valid = false;
        } else if (selectedDate < twoYearsAgo) {
            setDateError("Last service date must be within the past 2 years.");
            valid = false;
        }

        if (!valid) return;

        const truck = {
            regNum,
            mileage: parseFloat(mileage),
            lastServiceDate,
            serviceInterval: 10000
        };

        const maintenanceStatus = checkMaintenanceDue(truck);
        setStatus(maintenanceStatus);
    };

    const handleSendEmail = async () => {
        setEmailError("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        try {
            const subject = `Truck ${regNum} Maintenance Alert`;
            const message = `Truck ${regNum} status: ${status}. Please schedule a service.`;

            await axios.post("http://localhost:8080/api/send-email", {
                to: email,
                subject,
                message
            });

            alert(`Email sent to ${email}`);
            setShowEmailPopup(false);
            setEmail("");
        } catch (error) {
            console.error("Failed to send email", error);
            alert("Error sending email");
        }
    };

    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <h1>Add Trucks</h1>
                    <form className="formlayout" onSubmit={handleSubmit}>
                        <table className="tableW">
                            <tbody>
                                <tr>
                                    <td className="tableLeft">
                                        <div className="formDiv">
                                            <div className="mb-3">
                                                <label className="form-label">Truck Registration Number</label>
                                                <select
                                                    className="form-control"
                                                    required
                                                    value={regNum}
                                                    onChange={(e) => setRegNum(e.target.value)}>
                                                    <option value="">Select a truck</option>
                                                    {trucks.map((trucks) => (
                                                        <option key={trucks.RegNumber} value={trucks.RegNumber}>
                                                            {trucks.RegNumber}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mileage (in KM)</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    required
                                                    value={mileage}
                                                    onChange={(e) => setMileage(e.target.value)}
                                                />
                                                {mileageError && <div style={{ color: "red", fontSize: "14px" }}>{mileageError}</div>}
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Service Date</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    required
                                                    value={lastServiceDate}
                                                    onChange={(e) => setLastServiceDate(e.target.value)}
                                                />
                                                {dateError && <div style={{ color: "red", fontSize: "14px" }}>{dateError}</div>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="TableRight">
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <input type="text" className="form-control" readOnly value={status} />
                                            <div className="form-text">
                                                <span
                                                    style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
                                                    onClick={() => setShowEmailPopup(true)}>
                                                    Send Email
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className="btn btn-primary btnPadding">Calculate Cost</button>
                    </form>

                    {showEmailPopup && (
                        <div className="popup-overlay" style={{ marginTop: '50px' }}>
                            <div className="popup-content">
                                <h4>Send Maintenance Email</h4>
                                <input
                                    type="email"
                                    className="form-control mb-2"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {emailError && <div style={{ color: "red", fontSize: "14px" }}>{emailError}</div>}
                                <button className="btn btn-success me-2" onClick={handleSendEmail}>Send</button>
                                <button className="btn btn-danger" onClick={() => setShowEmailPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CalculateMaintenanceCost;
