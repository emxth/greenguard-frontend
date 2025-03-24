import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Auto-login if token exists
        const token = localStorage.getItem("token");
        if (token) {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            setUser(storedUser);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8081/api/login", {  // Ensure this matches your backend
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error("Login failed");
            }
    
            const data = await response.json();
            setUser({ email: data.email, role: data.role, token: data.token }); // Store user data properly
            localStorage.setItem("token", data.token); // Save token for authentication
        } catch (error) {
            console.error("Login error:", error.message);
        }
    };    

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
