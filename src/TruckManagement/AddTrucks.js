import Navbar from './Components/SideNav';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./styles/AddTrucks.css";

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

    const [truckIDError, setTruckIDError] = useState("");
    const [capacityError, setCapacityError] = useState("");
    const [inspectionDateError, setInspectionDateError] = useState("");
    const [insuranceDateError, setInsuranceDateError] = useState("");

    //Validate inspection and insurance expiry date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minDate = today.toISOString().split("T")[0];

    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    const maxDate = oneYearLater.toISOString().split("T")[0];

    const validateFutureDateWithinOneYear = (date, setError) => {
        const selectedDate = new Date(date);

        if (selectedDate <= today) {
            setError("Date must be in the future.");
            return false;
        } else if (selectedDate > oneYearLater) {
            setError("Date cannot be more than 1 year from today.");
            return false;
        }

        setError(""); // Clear error if valid
        return true;
    };

    const handleDateChange = (e, setterFunction, setError) => {
        const value = e.target.value;
        setterFunction(value);
        validateFutureDateWithinOneYear(value, setError);
    };

    // // Validate Future Date (Must be within 1 year from today)
    // const validateFutureDateWithinOneYear = (date, setError) => {
    //     const selectedDate = new Date(date);
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);

    //     const oneYearLater = new Date();
    //     oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    //     if (selectedDate <= today) {
    //         setError("Date must be in the future.");
    //         return false;
    //     } else if (selectedDate > oneYearLater) {
    //         setError("Date cannot be more than 1 year from today.");
    //         return false;
    //     }

    //     setError(""); // Clear error if valid
    //     return true;
    // };

    // const handleDateChange = (e, setterFunction, setError) => {
    //     const value = e.target.value;
    //     setterFunction(value);
    //     validateFutureDateWithinOneYear(value, setError);
    // };

    // Validate Truck ID
    const validateTruckID = (value) => {
        const regex = /^(?:[A-Za-z]{2}-\d{4}|\d{2,3}-\d{4})$/;

        if (!regex.test(value)) {
            setTruckIDError("Invalid Truck ID format. Use XX-0000, 00-0000, or 000-0000.");
            return false;
        }

        setTruckIDError(""); // Clear error if valid
        return true;
    };

    const handleTruckIDBlur = (e) => {
        const value = e.target.value;
        if (!validateTruckID(value)) {
            setRegNum(""); // Clear the value if invalid
        } else {
            setRegNum(value);
        }
    };

    // Validate Capacity
    const validateCapacity = (value) => {
        let numValue = parseInt(value, 10);

        if (isNaN(numValue) || numValue < 1800 || numValue > 6000) {
            setCapacityError("Capacity must be between 1800Kg and 6000Kg.");
            return false;
        }

        setCapacityError(""); // Clear error if valid
        return true;
    };

    const handleCapacityBlur = (e) => {
        let value = parseInt(e.target.value, 10);

        if (!validateCapacity(value)) {
            setCapacity(""); // Clear if invalid
        } else {
            let roundedValue = Math.round(value / 100) * 100;
            setCapacity(roundedValue);
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
                    <form className="formlayout" onSubmit={sendData}>
                        <table className="tableW">
                            <td className="tableLeft">
                                <div className="formDiv">
                                    <div className="mb-3">
                                        <label htmlFor="regNum" className="form-label">Registration Number</label>
                                        <input type="text" className="form-control" name="regNum" id="reg_number"
                                            onChange={(e) => setRegNum(e.target.value)}
                                            onBlur={handleTruckIDBlur}
                                            required />
                                        <div className="form-text">XX-0000/000-0000 format</div>
                                        {truckIDError && <div className="error-message" style={{ color: 'red' }}>{truckIDError}</div>}
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
                                    <div className="mb-3">
                                        <label htmlFor="capacity" className="form-label">Capacity</label>
                                        <input type="Number" className="form-control" name="capacity" id="capacity" placeholder="Kg" min="1800" max="6000" step="100"
                                            onChange={(e) => setCapacity(e.target.value)}
                                            onBlur={handleCapacityBlur}
                                            required />
                                        <div className="form-text">Kg - 1800 to</div>
                                        {capacityError && <div className="error-message" style={{ color: 'red' }}>{capacityError}</div>}
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
                                        <div className="mb-3 w-48 leftInnerTab">
                                            <label htmlFor="insureExpiry" className="form-label ">Insurance Expiry</label>
                                            <input type="date" className="form-control dateField" name="insureExpiry" id="insuranceDate"
                                                min={minDate} max={maxDate}
                                                onChange={(e) => handleDateChange(e, setInsurDate, setInsuranceDateError)}
                                                required />
                                            {insuranceDateError && <div className="error-message" style={{ color: 'red' }}>{insuranceDateError}</div>}
                                        </div>
                                    </td>
                                    <td className='tableSmallLeft'>
                                        <div className="mb-3 w-48">
                                            <label htmlFor="InspectExpiry" className="form-label">Inspection Date</label>
                                            <input type="date" className="form-control dateField" name="InspectExpiry" id="inspectionDate"
                                                min={minDate} max={maxDate}
                                                onChange={(e) => handleDateChange(e, setInspectDate, setInspectionDateError)}
                                                required />
                                            {inspectionDateError && <div className="error-message" style={{ color: 'red' }}>{inspectionDateError}</div>}
                                        </div>
                                    </td>
                                </table>

                                <div class="mb-4 w-50 labelMargin2">
                                    <label for="selectDriver" class="form-label">Driver</label>
                                    <select class="form-control AddStyle" id="driverID" name="selectDriver"
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