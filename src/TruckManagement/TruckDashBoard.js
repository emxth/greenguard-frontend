import Navbar from './Components/SideNav';
import react, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/AddMaintainanceCost.css";

function TruckDashBoard() {
    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <h1>Hello</h1>
                </div>
            </div>
        </div>
    );
}

export default TruckDashBoard;