import Navbar from './Components/SideNav';
import React, { useState } from "react";
import "./styles/AddTrucks.css";

function CalculateMaintenanceCost() {
    const [regNum, setRegNum] = useState("");
    const [mileage, setMileage] = useState("");
    const [lastServiceDate, setLastServiceDate] = useState("");
    const [status, setStatus] = useState("");
    const [showEmailPopup, setShowEmailPopup] = useState(false);
    const [email, setEmail] = useState("");

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

        const truck = {
            regNum,
            mileage: parseFloat(mileage),
            lastServiceDate,
            serviceInterval: 10000 // default interval
        };

        const maintenanceStatus = checkMaintenanceDue(truck);
        setStatus(maintenanceStatus);
    };

    const handleSendEmail = () => {
        // Here you would typically call a backend API to send the email.
        alert(`Email sent to ${email} regarding maintenance status: "${status}"`);
        setShowEmailPopup(false);
        setEmail("");
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
                                                <input type="text" className="form-control" required value={regNum} onChange={(e) => setRegNum(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Mileage (in KM)</label>
                                                <input type="number" className="form-control" required value={mileage} onChange={(e) => setMileage(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Last Service Date</label>
                                                <input type="date" className="form-control" required value={lastServiceDate} onChange={(e) => setLastServiceDate(e.target.value)} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="TableRight">
                                        <div className="mb-3">
                                            <label className="form-label">Status</label>
                                            <input type="text" className="form-control" readOnly value={status} />
                                            <div className="form-text">
                                                <span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => setShowEmailPopup(true)}>
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

                    {/* Email Popup */}
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
