import React, { useEffect, useState } from "react";
import axios from "axios";
import TruckMaintanenceTable from "./TruckMaintanenceTable";

const API_BASE_URL = "http://localhost:8081/Maintenance";

const TruckMaintanence = () => {
    const [maintanences, setMaintanences] = useState([]);

    const fetchMaintanences = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getAllCosts`);
            setMaintanences(response.data);
        } catch (error) {
            console.error("Error fetching truck maintenances:", error);
        }
    };

    useEffect(() => {
        fetchMaintanences();
    }, []);

    return (
        <div>
            <TruckMaintanenceTable rows={maintanences} fetchMaintanences={fetchMaintanences} />
        </div>
    );
};

export default TruckMaintanence;
