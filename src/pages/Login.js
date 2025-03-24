import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../utils/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // For redirecting after login

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error message
        setLoading(true);

        try {
            const success = await login(email, password); // Call login function from AuthContext
            if (success) {
                navigate("/"); // Redirect to homepage or dashboard after successful login
            }
        } catch (err) {
            setError("Invalid email or password"); // Show error message
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
