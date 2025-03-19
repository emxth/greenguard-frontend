import React, { useEffect, useState } from "react";
import axios from "axios";
import FuelTable from "./FuelTable";

const API_BASE_URL = "http://localhost:8081/truckFuelCost";

const TruckFuel = () => {
    const [fuel, setFuel] = useState([]);

    const fetchTruckFuel = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAllFuelCost`);
            setFuel(response.data);
        } catch (error) {
            console.error("Error fetching truck fuel cost:", error);
        }
    };

    useEffect(() => {
        fetchTruckFuel();
    }, []);

    return (
        <div>
            <FuelTable rows={fuel} fetchTruckFuel={fetchTruckFuel} />
        </div>
    );
};

export default TruckFuel;
