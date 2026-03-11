import { Box, Card, CardActionArea, CardContent, CardMedia, Typography, TextField, InputAdornment } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import "../styles/home.css";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppList from "../utils/AppList";

export default function Home() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [searchQuery, setSearchQuery]   = useState("");
    const navigate = useNavigate();

    const filteredAppList = useMemo(() => {
        if (!searchQuery.trim()) return AppList;
        const query = searchQuery.toLowerCase();
        return AppList.filter((app) =>
            app.appName.toLowerCase().includes(query) ||
            app.appId.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <Box className="home-root">
            <Box className="home-header">
                <Box sx={{ position: "relative", zIndex: 10 }}>
                    <Typography variant="h4" className="section-title">Select an App</Typography>
                    <Box className="section-underline" />
                </Box>

                <Box className="header-actions">
                    <TextField
                        placeholder="Search by app name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="small"
                        className="search-field"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CiSearch className="search-icon" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: "100%",
                            maxWidth: "300px",
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "rgba(15, 23, 42, 0.8)",
                                borderColor: "rgba(148, 163, 184, 0.3)",
                                borderRadius: "10px",
                                color: "#e2e8f0",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                "&:hover": { borderColor: "rgba(148, 163, 184, 0.6)", backgroundColor: "rgba(15, 23, 42, 0.95)" },
                                "&.Mui-focused": { borderColor: "#3b82f6", backgroundColor: "rgba(15, 23, 42, 0.98)", boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
                            },
                            "& .MuiOutlinedInput-input": {
                                padding: "15px 15px 15px 1px",
                                fontSize: "14px",
                                "&::placeholder": { color: "rgba(148, 163, 184, 0.6)", opacity: 1 },
                            },
                            "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(148, 163, 184, 0.3)" },
                        }}
                    />

                    <Card className="stat-card" elevation={0}>
                        <CardContent className="stat-card-content">
                            <Typography className="stat-label">Total Apps</Typography>
                            <Typography className="stat-value">{filteredAppList.length}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            <Box className="app-grid">
                {filteredAppList.map((app, index) => (
                    <Box
                        key={app.id}
                        onClick={() => navigate(`/appdata/${app.id}`, { state: { appName: app.appName } })}
                        sx={{ cursor: "pointer", textDecoration: "none", height: "100%" }}
                    >
                        <Card
                            className={`app-card${hoveredIndex === index ? " hovered" : ""}`}
                            elevation={0}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ "--animation-delay": `${0.1 * index}s` }}
                        >
                            <CardActionArea className="card-action-area" sx={{ "&:hover": { backgroundColor: "transparent" } }} disableRipple>
                                <Box className="icon-container">
                                    <CardMedia component="img" image={app.src} alt={app.appName} className="app-media" />
                                </Box>
                                <CardContent className="card-content">
                                    <Typography component="div" className="app-name">{app.appName}</Typography>
                                    <Typography variant="body2" className="app-id">{app.appId}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}