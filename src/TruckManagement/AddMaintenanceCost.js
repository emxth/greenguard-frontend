import Navbar from './Components/SideNav';
import react, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/AddMaintainanceCost.css";

function AddMaintenanceCost() {
    //set input values to variables
    const { regNum } = useParams();
    const [maintenance_Date, setMaintenance_Date] = useState("");
    const [truckRegNum, setTruckRegNum] = useState(regNum);
    const [maintenanceType, setMaintenanceType] = useState("");
    const [truckCost, setTruckCost] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const navigate = useNavigate();

    //Make event to happen after button is clicked
    function sendData(e) {
        e.preventDefault();
        console.log("Function called");
        //Create object to send data to backend
        const newMaintenanceCost = {
            'Truck_RegNum': truckRegNum,
            'Maintenance_Date': maintenance_Date,
            'maintenance_type': maintenanceType,
            'Cost': truckCost,
            'Description': description,
            'Status': status,
        }

        axios.post("http://Localhost:8080/Maintenance/addTruckCost", newMaintenanceCost).then(() => {
            alert("Cost added");
            navigate("/")
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        // <div className="col1Div">
        //     <div className="outerDiv">
        //         <div className="innerDiv1">
        //             <Navbar />
        //         </div>
        //         <div className="innerDivR">
        //             <div>
        //                 <form className="formlayout" onSubmit={sendData}>
        //                     <div className="formDiv2">
        //                         <div class="mb-3">
        //                             <label for="regNumber" class="form-label">Truck Number</label>
        //                             <input type="text" class="form-control" name="regNumber" id="regNumber" value={regNum}
        //                                 readOnly required />
        //                             <div id="maintainIDHelp" class="form-text">Truck ID must be 3 digit number</div>
        //                         </div>
        //                         <div class="mb-3 w-48">
        //                             <label for="MaintainDate" class="form-label">Maintenance Date</label>
        //                             <input type="date" class="form-control" name="MaintainDate" id="MaintainDte"
        //                                 onChange={(e) => {
        //                                     //get input feild value to useState
        //                                     setMaintenance_Date(e.target.value);
        //                                 }} required />
        //                         </div>
        //                         <div class="mb-4 w-50 labelMargin2">
        //                             <label for="maintainType" class="form-label">Type</label>
        //                             <select class="form-control" id="maintainenceType" name="maintainType"
        //                                 onChange={(e) => {
        //                                     //get input feild value to useState
        //                                     setMaintenanceType(e.target.value);
        //                                 }} >
        //                                 <option value="" disabled selected>Maintenance Type</option>
        //                                 <option value="Interior">Interior</option>
        //                                 <option value="exterior">Exterior</option>
        //                             </select>
        //                         </div>
        //                         <div class="mb-3">
        //                             <label for="cost" class="form-label">Total Expenses</label>
        //                             <input type="text" class="form-control" name="cost" id="truckCost"
        //                                 onChange={(e) => {
        //                                     //get input feild value to useState
        //                                     setTruckCost(e.target.value);
        //                                 }} required />
        //                         </div>
        //                         <div class="mb-3">
        //                             <label for="descriptCost" class="form-label">Description</label>
        //                             <input type="textArea" class="form-control" name="descriptCost" id="description"
        //                                 onChange={(e) => {
        //                                     //get input feild value to useState
        //                                     setDescription(e.target.value);
        //                                 }} required />
        //                         </div>
        //                         <div class="mb-3">
        //                             <label for="status" class="form-label">Status</label>
        //                             <input type="text" class="form-control" name="status" value={status} id="status" readOnly />
        //                         </div>
        //                         <button type="submit" class="btn btn-primary btnPadding">Submit</button>
        //                         <button type="cancel" class="btn btn-primary btnPadding">Cancel</button>

        //                     </div>
        //                 </form>

        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="container">
            <div className="left-navbar">
                <Navbar />
            </div>
            <div className="right-form">
                <form className="form-layout" onSubmit={sendData}>
                <h2 className='topic'>Add maintenance cost</h2>
                    <div className="form-group">
                        <label htmlFor="regNumber" className="form-label">Truck Number</label>
                        <input type="text" className="form-control" name="regNumber" id="regNumber" value={regNum} readOnly required />
                        <div className="form-text">Truck ID must be a 3-digit number</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="MaintainDate" className="form-label">Maintenance Date</label>
                        <input type="date" className="form-control1" name="MaintainDate" id="MaintainDate"
                            onChange={(e) => setMaintenance_Date(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="maintainType" className="form-label">Type</label>
                        <select className="form-control3" id="maintainType" name="maintainType"
                            onChange={(e) => setMaintenanceType(e.target.value)}>
                            <option value="" disabled selected>Maintenance Type</option>
                            <option value="Interior">Interior</option>
                            <option value="Exterior">Exterior</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost" className="form-label">Total Expenses</label>
                        <input type="text" className="form-control" name="cost" id="truckCost"
                            onChange={(e) => setTruckCost(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="descriptCost" className="form-label">Description</label>
                        <textarea className="form-control2" name="descriptCost" id="description"
                            onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="status" className="form-label">Status</label>
                        <input type="text" className="form-control" name="status" value={status} id="status" readOnly />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                    </div>
                </form>
            </div>
        </div>

    );
}


export default AddMaintenanceCost;