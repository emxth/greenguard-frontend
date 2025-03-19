import Navbar from './Components/SideNav';
import react, { useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/AddFuel.css";

function AddFuelCost() {
    const { regNum } = useParams(); // Get RegNumber from URL
    //set input values to variables
    const [regNumber, setRegNum] = useState(regNum);
    const [fuelDate, setFuelDate] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [fuelCost, setFuelCost] = useState("");
    const [litres, setLitres] = useState("");
    const [Status, setStatus] = useState("Pending");

    const navigate = useNavigate();

    //Make event to happen after button is clicked
    function sendData(e) {
        e.preventDefault();
        console.log("Function called");
        //Create object to send data to backend
        const newFuelCost = {
            'Truck_RegNum': regNumber,
            'Fuel_Date': fuelDate,
            'FuelType': fuelType,
            'FuelCost': fuelCost,
            'Litres': litres,
            'Status': Status,
        }
        console.log(newFuelCost);

        axios.post("http://localhost:8080/FuelCost/addFuelCost", newFuelCost).then(() => {
            alert("Fuel Cost added");
            navigate("/")
        }).catch((err) => {
            alert(err);
        })
    }

    return (
        // <div>
        //     <form className="formlayout2" onSubmit={sendData}>
        //         <div className="formDiv2">
        //             <div class="mb-3">
        //                 <label for="regNumber" class="form-label">Truck Number</label>
        //                 <input type="text" class="form-control" name="regNumber" id="regNumber" value={regNum}
        //                     readOnly required />
        //                 <div id="maintainIDHelp" class="form-text">Truck ID must be 3 digit number</div>
        //             </div>
        //             <div class="mb-3 w-48">
        //                 <label for="FuelDate" class="form-label">Fuel Date</label>
        //                 <input type="date" class="form-control" name="FuelDate" id="fuelDate"
        //                     onChange={(e) => {
        //                         //get input feild value to useState
        //                         setFuelDate(e.target.value);
        //                     }} required />
        //             </div>
        //             <div class="mb-4 w-50 labelMargin2">
        //                 <label for="FuelType" class="form-label">Fuel Type</label>
        //                 <select class="form-control" id="fuelType" name="FuelType"
        //                     onChange={(e) => {
        //                         //get input feild value to useState
        //                         setFuelType(e.target.value);
        //                     }} >
        //                     <option value="" disabled selected>Select Type</option>
        //                     <option value="Petrol">Petrol</option>
        //                     <option value="Diesel">Diesel</option>
        //                 </select>
        //             </div>
        //             <div class="mb-3">
        //                 <label for="cost" class="form-label">Fuel cost</label>
        //                 <input type="text" class="form-control" name="cost" id="fuelCost"
        //                     onChange={(e) => {
        //                         //get input feild value to useState
        //                         setFuelCost(e.target.value);
        //                     }} required />
        //             </div>
        //             <div class="mb-3">
        //                 <label for="fuelLitres" class="form-label">Litres</label>
        //                 <input type="text" class="form-control" name="fuelLitres" id="FuelLitres"
        //                     onChange={(e) => {
        //                         //get input feild value to useState
        //                         setLitres(e.target.value);
        //                     }} required />
        //             </div>
        //             <div class="mb-3">
        //                 <label for="status" class="form-label">Status</label>
        //                 <input type="text" class="form-control" name="status" value={Status} id="status" readOnly />
        //             </div>
        //             <button type="submit" class="btn btn-primary btnPadding">Submit</button>
        //             <button type="cancel" class="btn btn-primary btnPadding">Cancel</button>

        //         </div>
        //     </form>

        // </div>
        <div className="container">
            <div className="left-navbar">
                <Navbar />
            </div>
            <form className="fuel-form" onSubmit={sendData}>
                <h2 className='topicFuel'>Add Fuel Cost</h2>
                <div className="fuel-form-group">
                    <label htmlFor="regNumber" className="fuel-form-label">Truck Number</label>
                    <input type="text" className="fuel-form-control" name="regNumber" id="regNumber" value={regNum} readOnly required />
                    <div className="fuel-form-text">Truck ID must be a 3-digit number</div>
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="FuelDate" className="fuel-form-label">Fuel Date</label>
                    <input type="date" className="fuel-form-control" name="FuelDate" id="fuelDate"
                        onChange={(e) => setFuelDate(e.target.value)} required />
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="FuelType" className="fuel-form-label">Fuel Type</label>
                    <select className="fuel-form-control" id="fuelType" name="FuelType"
                        onChange={(e) => setFuelType(e.target.value)}>
                        <option value="" disabled selected>Select Type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                    </select>
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="cost" className="fuel-form-label">Fuel Cost</label>
                    <input type="text" className="fuel-form-control" name="cost" id="fuelCost"
                        onChange={(e) => setFuelCost(e.target.value)} required />
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="fuelLitres" className="fuel-form-label">Litres</label>
                    <input type="text" className="fuel-form-control" name="fuelLitres" id="FuelLitres"
                        onChange={(e) => setLitres(e.target.value)} required />
                </div>
                <div className="fuel-form-group">
                    <label htmlFor="status" className="fuel-form-label">Status</label>
                    <input type="text" className="fuel-form-control" name="status" value={Status} id="status" readOnly />
                </div>
                <div className="fuel-button-group">
                    <button type="submit" className="fuel-btn fuel-btn-primary">Submit</button>
                    <button type="button" className="fuel-btn fuel-btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddFuelCost;