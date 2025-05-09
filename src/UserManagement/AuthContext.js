import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);

                    setUser({
                    id: decoded.user_id,
                    role: decoded.role,
                    email: decoded.email,
                });
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:8081/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                const decoded = jwtDecode(data.token);
                setUser({
                    id: decoded.user_id,
                    role: decoded.role,
                    email: decoded.email,
                });
                navigate("/"); // Redirect after login
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };   

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);

        // Delay navigation slightly for a smoother transition
        setTimeout(() => {
            navigate("/");
        }, 500);  // 500ms delay before redirect
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
