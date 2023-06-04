import * as React from "react";
import "./dashboard/Dashboard.css";
import axios from "axios";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";

import LogoutListItems from "./dashboard/listItems";
import { AdminListItems, UserListItems } from "./dashboard/listItems";

import MuiAppBar from "@mui/material/AppBar";

import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

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
    const [factory, setFactory] = useState("");
    const [userName, setUserName] = useState("");
    const [open] = useState(true);
    const [role, setRole] = useState("");

    useEffect(() => {
        let storedFactoryName = localStorage.getItem("factoryName");
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const tokenData = jwt_decode(storedToken);

            if (
                tokenData.factoryName === "" ||
                tokenData.factoryName === null
            ) {
                const userInput = window.prompt(
                    "소속된 공장이 없습니다. 공장 이름을 입력해주세요."
                );
                if (userInput) {
                    axios
                        .post(
                            `/api/login/oauth/factory?email=${tokenData.email}&factoryName=${userInput}`
                        )
                        .then(() => {
                            alert("다시 로그인해주세요");
                            localStorage.removeItem("token");
                            localStorage.removeItem("factoryName");
                            navigate("/login");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    console.log("사용자가 입력을 취소했습니다.");
                }
            }
            setFactory(storedFactoryName);
            setRole(tokenData.role.split("_")[1]);
            setUserName(tokenData.userName[0].name);
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
                    <h3 style={{ margin: "auto" }}>{factory}</h3>
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
                <p>{userName}</p>
                <Divider />
                <List component="nav">
                    <UserListItems />

                    {role === "ADMIN" ? (
                        <>
                            <Divider />
                            <AdminListItems />
                        </>
                    ) : (
                        void 0
                    )}
                </List>
                <List component="nav"></List>
                <List component="nav">
                    <Divider />
                    <LogoutListItems />
                </List>
            </Drawer>
        </div>
    );
}

export default HomeLayout;

{
    /* <List component="nav">
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
    <Divider sx={{ my: 1 }} />
    <LogoutListItems />
</List>; */
}