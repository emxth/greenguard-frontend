import Navbar from './Components/SideNav';
import react, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/AddTrucks.css";

function AddTrucks() {
    //set input values to variables
    const [regNumber, setRegNum] = useState("");
    const [model, setModel] = useState("");
    const [capacity, setCapacity] = useState("");
    const [insurance_Expiry, setInsurDate] = useState("");
    const [inspection__date, setInspectDate] = useState("");
    const [collection_center_id, setCollectID] = useState("");
    const [driver_id, setDriverID] = useState("");
    const [isActive, setStatus] = useState("");
    const navigate = useNavigate();

    //Make event to happen after button is clicked
    function sendData(e) {
        e.preventDefault();
        console.log("Function called");
        //Create object to send data to backend
        const newTruck = {
            'RegNumber': regNumber,
            'Model': model,
            'Capacity': capacity,
            'Insurance_Expiry': insurance_Expiry,
            'Inspection__date': inspection__date,
            'Collection_center_id': collection_center_id,
            'driver_id': driver_id,
            'isActive': isActive
        }
        console.log(newTruck);

        axios.post("http://Localhost:8080/truck/addTruck", newTruck).then(() => {
            alert("Truck added");
            navigate("/")
        }).catch((err) => {
            alert(err);
        })
    }

    const validatePastDate = (value) => {
        const selectedDate = new Date(value);
        const today = new Date();
        return selectedDate <= today;
    };

    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR"> 
                    <h1>Add Trucks</h1>
                    <form className="formlayout" onSubmit={sendData}>
                        <table className="tableW">
                            <td className="tableLeft">
                                <div className="formDiv">
                                    <div class="mb-3">
                                        <label for="regNum" class="form-label">Registration Number</label>
                                        <input type="text" class="form-control" name="regNum" id="reg_number"
                                            onChange={(e) => {
                                                //get input feild value to useState
                                                setRegNum(e.target.value);
                                            }} required />
                                        <div id="truckIDHelp" class="form-text">Truck ID must be 5 digit number</div>
                                    </div>
                                    <div class="mb-3">
                                        <label for="selectModel" class="form-label">Select Model</label>
                                        <select class="form-control" id="Model" name="selectModel" onChange={(e) => {
                                            //get input feild value to useState
                                            setModel(e.target.value);
                                        }} required>
                                            <option value="" disabled selected>Select truck Model</option>
                                            <option value="Izusu">Izusu</option>
                                            <option value="Volvo">Volvo</option>
                                            <option value="Force">Force</option>
                                            <option value="Toyota">Toyota</option>
                                            <option value="Mitzubishi">Mitzubishi</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="capacity" class="form-label">Capacity</label>
                                        <input type="Number" class="form-control" name="capacity" id="capacity" placeholder="CC "
                                            onChange={(e) => {
                                                //get input feild value to useState
                                                setCapacity(e.target.value);
                                            }} required />
                                    </div>
                                    <div class="mb-3 w-55 labelMargin">
                                    <label for="collectID" class="form-label">Collection center_id</label>
                                    <input type="text" class="form-control" name="collectID" id="collectionID"
                                        onChange={(e) => {
                                            //get input feild value to useState
                                            setCollectID(e.target.value);
                                        }} required />
                                </div>
                                </div>
                            </td>
                            <td className="TableRight">
                                <table className='tableSmall'>
                                    <td>
                                        <div class="mb-3 w-48 leftInnerTab">
                                            <label for="insureExpiry" class="form-label">Insurance Expiry</label>
                                            <input type="date" class="form-control" name="insureExpiry" id="insurance"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (validatePastDate(value)) {
                                                        setInsurDate(value);
                                                    } else {
                                                        alert("Insurance expiry date cannot be a future date.");
                                                    }
                                                    //get input feild value to useState
                                                    setInsurDate(e.target.value);
                                                }} required />
                                        </div>
                                    </td>
                                    <td className='tableSmallLeft'>
                                        <div class="mb-3 w-48">
                                            <label for="InspectEpiry" class="form-label">Insurance Expiry</label>
                                            <input type="date" class="form-control" name="insureExpiry" id="insurance"
                                                onChange={(e) => {
                                                    //get input feild value to useState
                                                    setInspectDate(e.target.value);
                                                }} required />
                                        </div>
                                    </td>
                                </table>
                                
                                <div class="mb-4 w-50 labelMargin2">
                                    <label for="selectDriver" class="form-label">Driver</label>
                                    <select class="form-control" id="driverID" name="selectDriver"
                                        onChange={(e) => {
                                            //get input feild value to useState
                                            setDriverID(e.target.value);
                                        }} >
                                        <option value="" disabled selected>Select Driver</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </select>
                                </div>
                                <div className="labelMargin3">
                                    <label for="status" class="form-label">Truck Status</label>
                                    <div class="mb-2 form-check">
                                        <input type="checkbox" class="form-check-input labelChk" id="status"
                                            onChange={(e) => {
                                                //get input feild value to useState
                                                setStatus(e.target.checked);
                                            }} />
                                            <label class="activeLabel" for="status">active</label>
                                    </div>
                                </div>
                            </td>
                        </table>
                        <button type="submit" class="btn btn-primary btnPadding">Submit</button>
                        <button type="cancel" class="btn btn-primary btnPadding2">Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTrucks;