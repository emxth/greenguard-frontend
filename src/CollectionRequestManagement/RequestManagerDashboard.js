import Navbar from './components/sideNavBar';
import react, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function requestManagerDashboard() {
    return (
        <div className="col1Div">
            <div className="outerDiv">
                <div className="innerDiv1">
                    <Navbar />
                </div>
                <div className="innerDivR">
                    <h1>DashBoard</h1>
                </div>
            </div>
        </div>
    );
}

export default requestManagerDashboard;