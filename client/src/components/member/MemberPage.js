import React from "react";
import "../dashboard/Dashboard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MemberDetail from "./MemberDetail";
import HomeLayout from "../HomeLayout";

const mdTheme = createTheme();

function MemberPage() {
    return (
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
                            paddingTop="10vmax"
                        >
                            {/* 멤버 */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 550,
                                    }}
                                >
                                    <MemberDetail />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MemberPage;
