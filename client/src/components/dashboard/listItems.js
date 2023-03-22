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

export const homeListItems = (
    <React.Fragment>
        <ListItemButton>
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
    </React.Fragment>
);

export const memberListItems = (
    <React.Fragment>
        <ListItemButton>
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
    </React.Fragment>
);

export const salesListItems = (
    <React.Fragment>
        <ListItemButton>
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
    </React.Fragment>
);

export const defectiveListItems = (
    <React.Fragment>
        <ListItemButton>
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
    </React.Fragment>
);

export const logoutListItems = (
    <React.Fragment>
        <ListItemButton>
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
    </React.Fragment>
);

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