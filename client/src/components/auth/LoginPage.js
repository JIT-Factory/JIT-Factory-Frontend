import * as React from "react";
import "./auth.css";

import { useNavigate } from "react-router-dom";

import { authSlice } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function LoginPage() {
    const { setToken } = authSlice.actions;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const dataForLogin = {
            email: data.get("email"),
            password: data.get("password"),
        };
        const { email, password } = dataForLogin;
        const postData = { email, password };

        axios
            .post("/api/auth/login", postData)
            .then(function (response) {
                dispatch(setToken(response.headers["authorization"]));
                const authorizationHeader = response.headers["authorization"];
                if (authorizationHeader) {
                    localStorage.setItem("token", authorizationHeader);
                } else {
                    console.error("Authorization header not found in response");
                }
                console.log(response, "성공");
                navigate("/");
            })
            .catch(function (err) {
                alert("로그인할 수 없습니다. 계정을 확인해주세요!");
                console.log(err);
            });
    };

    return (
        <div className="back">
            <div
                style={{
                    position: "relative",
                    paddingTop: "20vh",
                }}
            >
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                JIT Factory
                            </Typography>
                            <Box
                                component="form"
                                onSubmit={handleSubmit}
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    LOGIN
                                </Button>
                                <Grid container>
                                    {/* <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid> */}
                                    <Grid item xs>
                                        <Link href="/register" variant="body2">
                                            {"계정이 없으신가요? 회원가입"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>
        </div>
    );
}
