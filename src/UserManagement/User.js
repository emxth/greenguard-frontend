import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";

const API_BASE_URL = "http://localhost:8081/user";

const User = () => {
    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getalluser`);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <UserTable rows={user} fetchUser={fetchUser} />
        </div>
    );
};

export default User;
