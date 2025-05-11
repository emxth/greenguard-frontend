import React, { useEffect, useState } from "react";
import axios from "axios";
import UserTable from "./UserTable";
import { Box, Button, Container } from "@mui/material";
import UserUpdateForm from "./UserUpdateForm";

const API_BASE_URL = "http://localhost:8081/user";

const User = () => {
    const [user, setUser] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/getalluser`);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleAddUser = () => {
        setSelectedUser(null); // No user means it's an insert
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setSelectedUser(null);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "right", mb: 3 }}>
                <Button variant="contained" color="warning" onClick={handleAddUser}>
                    Add New Staff Member
                </Button>
            </Box>

            {showForm ? (
                <UserUpdateForm user={selectedUser} resetUser={resetForm} fetchUsers={fetchUser} />
            ) : (
                <UserTable rows={user} fetchUser={fetchUser} />
            )}
        </Container>
    );
};

export default User;