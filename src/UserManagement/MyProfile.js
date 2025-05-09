import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import PublicProfile from "../pages/PublicProfile";

const MyProfile = () => {
    const { user } = useContext(AuthContext);
    const API_BASE_URL = "http://localhost:8081/user";
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!user || !user.id) {
            console.error("User ID is undefined, skipping API call.");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/getuser/${user.id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [user]);

    return (
        <div>
            {userData ? <PublicProfile userData={userData} /> : <p>Loading profile...</p>}
        </div>
    );
};

export default MyProfile;
