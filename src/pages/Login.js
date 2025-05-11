import { useContext, useState } from "react";
import AuthContext from "../UserManagement/AuthContext";
import Signup from "../components/Signup";
import { Box, Container, TextField, Button, Typography, Paper, CircularProgress, } from "@mui/material";

const Login = () => {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                window.location.href = "/"; // Navigate manually or use context
            }
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url('https://www.shutterstock.com/shutterstock/videos/3627903431/thumb/12.jpg?ip=x480')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "brightness(0.5)",
                    zIndex: -1,
                },
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        backdropFilter: "blur(9px)",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: 3,
                        textAlign: "center",
                        color: "#fff",
                    }}
                >
                    {!showSignup ? (
                        <>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                                GreenGuard Sign In
                            </Typography>
                            <Typography variant="h6" gutterBottom mb={3}>
                                Welcome back again
                            </Typography>

                            {error && (
                                <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                                    {error}
                                </Typography>
                            )}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    label="Email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    sx={{
                                        mb: 2,
                                        input: { color: "white" },
                                        label: { color: "white" },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "white" },
                                            "&:hover fieldset": { borderColor: "#80cbc4" },
                                            "&.Mui-focused fieldset": { borderColor: "#26a69a" },
                                        },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    sx={{
                                        mb: 3,
                                        input: { color: "white" },
                                        label: { color: "white" },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: "white" },
                                            "&:hover fieldset": { borderColor: "#80cbc4" },
                                            "&.Mui-focused fieldset": { borderColor: "#26a69a" },
                                        },
                                    }}
                                />
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    color="warning"
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} sx={{ color: "#fff" }} />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </form>

                            <Typography variant="body2" sx={{ mt: 2 }}>
                                User doesn't have an account?
                                <Button
                                    variant="text"
                                    color="inherit"
                                    onClick={() => setShowSignup(true)}
                                    sx={{
                                        ml: 1,
                                        ":hover": {
                                            textDecoration: "underline",
                                            color: "warning.main",
                                        },
                                    }}
                                >
                                    Sign up
                                </Button>
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                                GreenGuard Sign Up
                            </Typography>
                            <Signup />
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Already have an account?
                                <Button
                                    variant="text"
                                    color="inherit"
                                    onClick={() => setShowSignup(false)}
                                    sx={{
                                        ml: 1,
                                        ":hover": {
                                            textDecoration: "underline",
                                            color: "warning.main",
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Typography>
                        </>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
