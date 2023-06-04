import "./Dashboard.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Defective from "./Defective";
import { useState } from "react";

import HomeLayout from "../HomeLayout";

const mdTheme = createTheme();

function DashboardPage() {
    const [byDate, setByDate] = useState("Daily");

    const handleChange = (event) => {
        setByDate(event.target.value);
    };

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
                        overflow: "auto",
                    }}
                >
                    <br />
                    <br />
                    <div
                        className="content"
                        style={{
                            width: "95%",
                            margin: "auto",
                            paddingTop: "3vmax",
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
                                        p: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: 300,
                                    }}
                                >
                                    <div>상품 생산 % 들어갈 곳</div>
                                </Paper>
                            </Grid>
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
                                    <Chart byDate={byDate} />
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
                        </Grid>
                    </div>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardPage />;
}
