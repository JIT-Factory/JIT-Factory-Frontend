import * as React from "react";
import "./Dashboard.css";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Chart from "./Chart";
import Deposits from "./Deposits";
import Defective from "./Defective";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import LogoutListItems from "./listItems";
import {
    homeListItems,
    memberListItems,
    salesListItems,
    defectiveListItems,
    productListItems,
} from "./listItems";

const drawerWidth = 240;

// function Copyright(props) {
//     return (
//         <Typography
//             variant="body2"
//             color="text.secondary"
//             align="center"
//             {...props}
//         >
//             {"Copyright © "}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{" "}
//             {new Date().getFullYear()}
//             {"."}
//         </Typography>
//     );
// }

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const mdTheme = createTheme();

function DashboardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userName, setUserName] = React.useState("");
    const [byDate, setByDate] = React.useState("Daily");
    // const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            dispatch(setToken(storedToken));
            const tokenData = jwt_decode(storedToken);
            setUserName(tokenData.email.split("@")[0]);
        } else {
            navigate("/login");
        }
    }, [dispatch, navigate]);

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleChange = (event) => {
        setByDate(event.target.value);
        console.log(byDate);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: [1],
                        }}
                    >
                        <h3 style={{ margin: "auto" }}>Welcome JIT Factory</h3>
                    </Toolbar>
                    <br />
                    <br />
                    {open ? (
                        <div className="box">
                            <img
                                className="profile"
                                src={
                                    process.env.PUBLIC_URL + "/images/React.png"
                                }
                                alt={1}
                            ></img>
                        </div>
                    ) : (
                        void 0
                    )}
                    <p>{userName}</p>
                    <Divider />
                    <List component="nav">
                        {homeListItems}
                        <Divider sx={{ my: 1 }} />
                        {memberListItems}
                        <Divider sx={{ my: 1 }} />
                        {salesListItems}
                        <Divider sx={{ my: 1 }} />
                        {defectiveListItems}
                        <Divider sx={{ my: 1 }} />
                        {productListItems}
                        <Divider sx={{ my: 1 }} />
                    </List>
                    <br />
                    <br />
                    <br />
                    <List component="nav">
                        <Stack
                            spacing={3}
                            direction="row"
                            style={{
                                justifyContent: "center",
                                display: "flex",
                            }}
                        >
                            <Button
                                className="PositiveBtn"
                                variant="contained"
                                style={{ background: "#5A95EC" }}
                            >
                                RUN
                            </Button>
                            <Button
                                className="NegativeBtn"
                                variant="contained"
                                style={{ background: "#F47979" }}
                            >
                                STOP
                            </Button>
                        </Stack>
                        <br />
                        <br />
                        <Divider sx={{ my: 1 }} />
                        <LogoutListItems />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    <div
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
                        >
                            {/* Chart */}
                            <Grid item xs={12} md={8} lg={9}>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={byDate}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel
                                        value="Daily"
                                        control={<Radio />}
                                        label="Daily"
                                    />
                                    <FormControlLabel
                                        value="Weekly"
                                        control={<Radio />}
                                        label="Weekly"
                                    />
                                    <FormControlLabel
                                        value="Monthly"
                                        control={<Radio />}
                                        label="Monthly"
                                    />
                                </RadioGroup>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 400,
                                    }}
                                >
                                    <Chart />
                                </Paper>
                            </Grid>
                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <FormControlLabel
                                    control={<Radio />}
                                    style={{ visibility: "hidden" }}
                                />
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 400,
                                    }}
                                >
                                    <Deposits byDate={byDate} />
                                </Paper>
                            </Grid>
                            {/* Recent Orders */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 600,
                                    }}
                                >
                                    <Defective />
                                </Paper>
                            </Grid>
                        </Grid>
                        {/* <Copyright sx={{ pt: 4 }} /> */}
                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardPage />;
}
