import { Box, Container, IconButton, Typography } from "@mui/material";
import { FaPowerOff } from "react-icons/fa6";
import logoImage from "../assets/logo.png";
import "../styles/header.css";
import useFunction from "../hooks/useFunction";
import { useLocation } from "react-router-dom";

export default function Header() {
    const loaction = useLocation();
    const { handleLogout } = useFunction();
    const loginPage = loaction.pathname === "/login";
    const registerPage = loaction.pathname === "/register";

    return (
        <Box component="header" className="header-root">

            {/* Ambient background blobs */}
            <Box className="header-blobs">
                <Box className="header-blob-tr gradient-top-right" />
                <Box className="header-blob-bl gradient-bottom-left" />
            </Box>

            {/* Main content row — centered, right-padded to avoid logout btn overlap */}
            <Container maxWidth={false} className="header-inner">

                {/* Logo */}
                <img
                    src={logoImage}
                    alt="Radical App Logo"
                    className="header-logo"
                />

                {/* Text block */}
                <Box className="header-text">

                    {/* Title */}
                    <Box className="header-title-row">
                        <Typography
                            component="span"
                            className="header-title-light gradient-light animate-fadeInUp"
                        >
                            Radical App
                        </Typography>
                        <Typography
                            component="span"
                            className="header-title-bold gradient-cyan-blue animate-fadeInUp"
                        >
                            Tracker
                        </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                        variant="body1"
                        component="p"
                        className="header-description description-text animate-fadeInUp"
                    >
                        Monitor, analyze, and optimize your applications in real-time
                    </Typography>

                    {/* Accent lines */}
                    <Box className="header-accent-row">
                        <Box className="h-1 rounded-full animate-slideIn accent-line-primary" />
                        <Box className="h-1 grow rounded-full accent-line-secondary" />
                    </Box>

                </Box>
            </Container>

            {/* Logout button — absolutely positioned far right */}
            <IconButton
                aria-label="logout"
                size="large"
                color="error"
                className={`header-logout ${loginPage || registerPage ? "hidden opacity-0" : ""}`}
                onClick={handleLogout}
            >
                <FaPowerOff color="red" />
            </IconButton>

        </Box>
    );
}