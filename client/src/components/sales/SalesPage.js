import React from "react";
import "../dashboard/Dashboard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import HomeLayout from "../HomeLayout";
import { WeeklyChart, MonthlyChart, AllTimeChart } from "../dashboard/Chart";
import Deposits from "../dashboard/Deposits";
const mdTheme = createTheme();

function SalesPage() {
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
                        }}
                        sx={{ mt: 4, mb: 4 }}
                    >
                        <Grid
                            container
                            spacing={3}
                            style={{
                                width: "60%",
                            }}
                            paddingTop="5vmax"
                        >
                            {/* 최근 7일 차트 */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 270,
                                    }}
                                >
                                    <WeeklyChart />
                                </Paper>
                            </Grid>

                            {/* 최근 28일 차트 */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 270,
                                    }}
                                >
                                    <MonthlyChart />
                                </Paper>
                            </Grid>

                            {/* 모든 기간 차트 */}
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        p: 0,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 270,
                                    }}
                                >
                                    <AllTimeChart />
                                </Paper>
                            </Grid>

                            {/* Recent Deposits */}
                            <Grid item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 400,
                                    }}
                                >
                                    <Deposits />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default SalesPage;
