import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ErrorIcon from "@mui/icons-material/Error";
import LogoutIcon from "@mui/icons-material/Logout";
import InventoryIcon from "@mui/icons-material/Inventory";
import FireTruckIcon from "@mui/icons-material/FireTruck";
import MemoryIcon from "@mui/icons-material/Memory";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { ListSubheader } from "@mui/material";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFactory, setToken } from "../redux/authSlice";

import axios from "axios";

export default function LogoutListItems() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .post("/api/auth/logout", null, {
                headers: { Authorization: `${localStorage.getItem("token")}` },
            })
            .then(function (response) {
                dispatch(setToken(""));
                dispatch(setFactory(""));
                console.log(response, "로그아웃 성공");
                localStorage.removeItem("token");
                localStorage.removeItem("factoryName");
                navigate("/login");
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
                <LogoutIcon sx={{ color: "#000" }} fontSize="large" />
            </ListItemIcon>
            <ListItemText
                disableTypography
                primary={
                    <Typography
                        style={{
                            color: "black",
                            fontSize: "0.9vmax",
                            fontWeight: "600",
                        }}
                    >
                        LOGOUT
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

export function UserListItems() {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <ListSubheader component="div" style={{ textAlign: "left" }}>
                일반 사용자
            </ListSubheader>
            <ListItemButton
                onClick={() => {
                    navigate("/");
                }}
            >
                <ListItemIcon>
                    <HomeIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            HOME
                        </Typography>
                    }
                />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigate("/sales");
                }}
            >
                <ListItemIcon>
                    <AttachMoneyIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            SALES
                        </Typography>
                    }
                />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigate("/defective");
                }}
            >
                <ListItemIcon>
                    <ErrorIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            DEFECTIVE
                        </Typography>
                    }
                />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigate("/product");
                }}
            >
                <ListItemIcon>
                    <InventoryIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            PRODUCT
                        </Typography>
                    }
                />
            </ListItemButton>
        </React.Fragment>
    );
}

export function AdminListItems() {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <ListSubheader component="div" style={{ textAlign: "left" }}>
                관리자
            </ListSubheader>
            <ListItemButton
                onClick={() => {
                    navigate("/member");
                }}
            >
                <ListItemIcon>
                    <GroupsIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            MEMBER
                        </Typography>
                    }
                />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigate("/process");
                }}
            >
                <ListItemIcon>
                    <MemoryIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            PROCESS
                        </Typography>
                    }
                />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigate("/Material");
                }}
            >
                <ListItemIcon>
                    <FireTruckIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            METERIAL
                        </Typography>
                    }
                />
            </ListItemButton>
            <ListItemButton
                onClick={() => {
                    navigate("/stream");
                }}
            >
                <ListItemIcon>
                    <YouTubeIcon sx={{ color: "#000" }} fontSize="large" />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            style={{
                                color: "black",
                                fontSize: "0.9vmax",
                                fontWeight: "600",
                            }}
                        >
                            STREAM
                        </Typography>
                    }
                />
            </ListItemButton>
        </React.Fragment>
    );
}