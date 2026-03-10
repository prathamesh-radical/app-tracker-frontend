import { useContext, useState } from "react";
import { Box, Card, CardContent, Typography, Divider, Link, CircularProgress } from "@mui/material";
import { MdOutlineEmail, MdOutlineLock, MdVisibility, MdVisibilityOff, MdApps } from "react-icons/md";
import "../styles/register.css";
import { MyContext } from "../context/context";
import useFunction from "../hooks/useFunction";

export default function Register() {
    const { registerFormData: formData, handleChange, loading } = useContext(MyContext);
    const { handleRegister } = useFunction();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <Box
            className="register-root"
            sx={{
                width: "100%",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
            }}
        >
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
                <Card className="register-card" elevation={0} sx={{ width: "100%" }}>
                    <CardContent className="register-card-content">
                        {/* Header */}
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
                                <Typography className="card-title">Get Started</Typography>
                                <Typography className="card-subtitle">Create your account to continue</Typography>
                            </Box>
                        </Box>

                        <Divider className="register-divider" />

                        {/* Form */}
                        <Box
                            component="form"
                            onSubmit={handleRegister}
                            className="register-form"
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

                            {/* Password row */}
                            <Box className="form-row">
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
                                            autoComplete="new-password"
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

                                <Box className="field-wrap">
                                    <label className="field-label">Confirm Password</label>
                                    <Box className="input-box">
                                        <MdOutlineLock size={17} className="input-icon" />
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            className="field-input"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={handleChange("confirmPassword")}
                                            required
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="eye-btn"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            tabIndex={-1}
                                            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                                        >
                                            {showConfirm ? <MdVisibilityOff size={17} /> : <MdVisibility size={17} />}
                                        </button>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Submit */}
                            <button type="submit" className="submit-btn" disabled={loading}>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                    {loading && <CircularProgress size={15} sx={{ color: "rgba(255,255,255,0.6)" }} />}
                                    <span>{loading ? "Creating account..." : "Create account"}</span>
                                </Box>
                            </button>
                        </Box>

                        {/* Footer */}
                        <Typography className="footer-text">
                            Already have an account?{" "}
                            <Link href="/login" underline="none" className="signin-link">Sign in</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}