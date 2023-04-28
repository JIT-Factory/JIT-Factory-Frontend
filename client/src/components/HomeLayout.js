import * as React from "react";
import "./dashboard/Dashboard.css";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

import { useEffect, useState } from "react";

import LogoutListItems from "./dashboard/listItems";
import {
    HomeListItems,
    MemberListItems,
    SalesListItems,
    DefectiveListItems,
    productListItems,
} from "./dashboard/listItems";

import MuiAppBar from "@mui/material/AppBar";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;

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

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function HomeLayout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [factory, setFactory] = useState("");
    const [open] = useState(true);
    const [role, setRole] = useState("");
    const factoryName = useSelector((state) => state.auth.factoryName);

    useEffect(() => {
        const storedFactoryName = localStorage.getItem("factoryName");
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const tokenData = jwt_decode(storedToken);
            setFactory(storedFactoryName);
            setRole(tokenData.role.split("_")[1]);
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: "20px", // keep right padding when drawer closed
                    }}
                ></Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        px: [1],
                    }}
                >
                    <h3 style={{ margin: "auto" }}>Just-In-Time Factory</h3>
                </Toolbar>
                <br />
                <br />
                {open ? (
                    <div className="box">
                        <img
                            className="profile"
                            src={process.env.PUBLIC_URL + "/images/React.png"}
                            alt={1}
                        ></img>
                    </div>
                ) : (
                    void 0
                )}
                <p>{factory}</p>
                <Divider />
                <List component="nav">
                    <HomeListItems />
                    <Divider sx={{ my: 1 }} />
                    {role === "ADMIN" ? <MemberListItems /> : void 0}
                    {role === "ADMIN" ? <Divider sx={{ my: 1 }} /> : void 0}
                    <SalesListItems />
                    <Divider sx={{ my: 1 }} />
                    <DefectiveListItems />
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
        </div>
    );
}

export default HomeLayout;
