import React from "react";
import LiveStreamPage from "./LiveStreamPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import HomeLayout from "../HomeLayout";

const mdTheme = createTheme();

function StreamPage() {
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
                        paddingTop: "4vmax",
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
                                width: "100%",
                            }}
                        >
                            <Grid item xs={12}>
                                <Paper
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 800,
                                    }}
                                >
                                    <LiveStreamPage />
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default StreamPage;
