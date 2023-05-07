import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import "../dashboard/Dashboard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import HomeLayout from "../HomeLayout";

const mdTheme = createTheme();

function ProcessPage() {
    const [process, setProcess] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const storedFactory = localStorage.getItem("factoryName");
        axios
            .get(`/api/process?factoryName=${storedFactory}&processName=${""}`)
            .then((response) => {
                console.log(response.data);
            });
    }, []);

    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <HomeLayout />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: "100vh",
                        }}
                    >
                        <div
                            className="content"
                            style={{
                                width: "95%",
                                margin: "auto",
                                paddingTop: "1vmax",
                            }}
                            sx={{ mt: 4, mb: 4 }}
                        >
                            <Grid
                                container
                                spacing={3}
                                style={{
                                    width: "100%",
                                }}
                                paddingTop="5vmax"
                            >
                                {/* 멤버 */}
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            height: 700,
                                        }}
                                    >
                                        {/* 페이지 넣기 */}
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
}

// /api/process?factoryName=carFactory&processName=frontProcess

export default ProcessPage;

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "left",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,

        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

/*
<Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                공정 선택
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    More
                </MenuItem>
            </StyledMenu>
 */
