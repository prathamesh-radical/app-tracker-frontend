import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Divider, Link, CircularProgress } from "@mui/material";
import { MdOutlineEmail, MdOutlineLock, MdVisibility, MdVisibilityOff, MdApps } from "react-icons/md";
import "../styles/login.css";
import { MyContext } from "../context/context";
import useFunction from "../hooks/useFunction";

export default function Login() {
    const { loginFormData: formData, handleChange, loading, isAuthenticated } = useContext(MyContext);
    const { handleLogin } = useFunction();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Box
            className="login-root"
            sx={{
                minHeight: "100svh",
                width: "100%",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                p: { xs: "16px", sm: "24px", md: "32px" },
                boxSizing: "border-box",
            }}
        >
            {/* Centered login card */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                }}
            >
                <Card className="login-card" elevation={0} sx={{ width: "100%" }}>
                    <CardContent className="login-card-content">

                        {/* Card header */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: "12px", sm: "16px" },
                                mb: { xs: "16px", sm: "24px" },
                            }}
                        >
                            <Box className="logo-box">
                                <MdApps size={22} color="#3b82f6" />
                            </Box>
                            <Box>
                                <Typography className="card-title">Welcome Back</Typography>
                                <Typography className="card-subtitle">Sign in to continue</Typography>
                            </Box>
                        </Box>

                        <Divider className="login-divider" />

                        {/* Form */}
                        <Box
                            component="form"
                            onSubmit={handleLogin}
                            className="login-form"
                            noValidate
                        >
                            {/* Email */}
                            <Box className="field-wrap">
                                <label className="field-label">Email Address</label>
                                <Box className="input-box">
                                    <MdOutlineEmail size={17} className="input-icon" />
                                    <input
                                        type="email"
                                        className="field-input"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={handleChange("email")}
                                        required
                                        autoComplete="email"
                                    />
                                </Box>
                            </Box>

                            {/* Password */}
                            <Box className="field-wrap">
                                <label className="field-label">Password</label>
                                <Box className="input-box">
                                    <MdOutlineLock size={17} className="input-icon" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="field-input"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange("password")}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="eye-btn"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <MdVisibilityOff size={17} /> : <MdVisibility size={17} />}
                                    </button>
                                </Box>
                            </Box>

                            {/* Submit */}
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? (
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                        <CircularProgress size={15} sx={{ color: "rgba(255,255,255,0.6)" }} />
                                        <span>Signing in...</span>
                                    </Box>
                                ) : "Sign In"}
                            </button>
                        </Box>

                        {/* Footer */}
                        {/* <Typography className="footer-text">
                            Don't have an account?{" "}
                            <Link href="/register" underline="none" className="signup-link">Create one</Link>
                        </Typography> */}
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}