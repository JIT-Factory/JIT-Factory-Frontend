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

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFactory, setToken } from "../redux/authSlice";

import axios from "axios";

export function HomeListItems() {
    const navigate = useNavigate();
    return (
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
    );
}

export function MemberListItems() {
    const navigate = useNavigate();
    return (
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
    );
}

export function SalesListItems() {
    const navigate = useNavigate();
    return (
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
    );
}

export function DefectiveListItems() {
    const navigate = useNavigate();
    return (
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
    );
}

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

export const productListItems = (
    <React.Fragment>
        <ListItemButton>
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