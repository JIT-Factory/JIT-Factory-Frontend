import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import axios from "axios";

import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import CircularProgress from "@mui/material/CircularProgress";
import { Button, Stack } from "@mui/material";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const getToday = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const createTime = `${year}-${month}-${day}`;
    return createTime;
};

function Progress() {
    const token = localStorage.getItem("token");
    const factoryName = localStorage.getItem("factoryName");
    const [selectedProcess, setSelectedProcess] = useState("default");
    const [processStatus, setProcessStatus] = useState("");
    const [orderList, setOrderList] = useState([]);
    const [orderCount, setOrderCount] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [productionCounts, setProductionCounts] = useState({});
    const [targetCount, setTargetCount] = useState(0);

    // 프로세스 바 진행사항
    const [progress, setProgress] = useState(0);
    // progress Bar
    useEffect(() => {
        const timer = setInterval(() => {
            const totalCount = Object.keys(productionCounts).length; // 200
            const createCount = Object.values(productionCounts).reduce(
                (sum, count) => sum + count,
                0
            );
            console.log(createCount);
            console.log(totalCount);

            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : (1 / 2) * 100
            );
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // 전체 process, 해당 process 컨베이어 벨트의 작동 여부를 10초마다 조회
    useEffect(() => {
        SetUp();
        checkSuccessProduct();

        // 10초마다 progressBar 갱신
        const intervalSetUp = setInterval(SetUp, 10000);

        // 10초마다 success 조회
        const intervalCheckSuccessProduct = setInterval(
            checkSuccessProduct,
            10000
        );

        return () => clearInterval(intervalSetUp, intervalCheckSuccessProduct);
    }, []);

    const SetUp = () => {
        axios
            .get(
                `/api/process/show/factory/process?factoryName=${factoryName}&processName=${selectedProcess}`
            )
            .then((response) => {
                if (response.data) {
                    setProcessStatus(response.data[0].processStatus);
                }
            });
    };

    const checkSuccessProduct = () => {
        axios
            .get(`/api/product/${factoryName}/${getToday()}`)
            .then((response) => {
                const responseData = response.data;
                const counts = {};

                responseData.forEach((product) => {
                    const { productName } = product;
                    if (counts[productName]) {
                        counts[productName]++;
                    } else {
                        counts[productName] = 1;
                    }
                });
                setProductionCounts(counts);
            });
    };

    const buttonTimer = () => {
        setTimeout(() => {
            setButtonDisabled(false);
        }, 1000);
    };

    return (
        <div>
            <Box sx={{ minWidth: 120, padding: "5px" }}>
                <h2>상품생산 진행정보</h2>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={6}>
                            <Item sx={{ height: 300 }}>
                                <h3>
                                    현재 공장 가동 상태:{" "}
                                    {processStatus === "run" ? "RUN" : "STOP"}
                                </h3>
                                <div
                                    className="in"
                                    key={1}
                                    style={{ paddingTop: "10px" }}
                                >
                                    <Box>
                                        <Box
                                            sx={{
                                                position: "relative",
                                                margin: "auto",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: 200,
                                                height: 200,
                                            }}
                                        >
                                            <CircularProgress
                                                variant="determinate"
                                                value={progress}
                                                size={200}
                                                sx={{
                                                    position: "absolute",
                                                    top: "0",
                                                    left: "0",
                                                    right: "0",
                                                    bottom: "0",
                                                    margin: "auto",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform:
                                                        "translate(-50%, -50%)",
                                                }}
                                            >
                                                <Typography
                                                    variant="h6"
                                                    component="div"
                                                    color="textSecondary"
                                                >
                                                    {`${Math.round(progress)}%`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </div>
                            </Item>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Item sx={{ height: 300 }}>
                                <TableContainer>
                                    <Table
                                        sx={{
                                            minWidth: 500,
                                            maxWidth: 700,
                                            border: 1,
                                            margin: "auto",
                                        }}
                                        aria-label="customized table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>
                                                    상품 이름
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    목표 생산량
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    현재 생산량
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Object.entries(
                                                productionCounts
                                            ).map(([productName, count]) => (
                                                <StyledTableRow
                                                    key={productName}
                                                >
                                                    <StyledTableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        <h4 className="tbText">
                                                            {productName}
                                                        </h4>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <h4 className="tbText">
                                                            100
                                                        </h4>
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">
                                                        <h4 className="tbText">
                                                            {count}
                                                        </h4>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>

                <br />
                <Stack
                    spacing={3}
                    direction="row"
                    style={{
                        justifyContent: "center",
                        display: "flex",
                        paddingTop: "10px",
                    }}
                >
                    <Button
                        className="PositiveBtn"
                        variant="contained"
                        style={{ background: "#5A95EC" }}
                        onClick={() => {
                            setButtonDisabled(true);
                            processHandler(factoryName, selectedProcess, "run");
                            buttonTimer();
                        }}
                        disabled={buttonDisabled}
                    >
                        RUN
                    </Button>
                    <Button
                        className="NegativeBtn"
                        variant="contained"
                        style={{ background: "#F47979" }}
                        onClick={() => {
                            setButtonDisabled(true);
                            processHandler(
                                factoryName,
                                selectedProcess,
                                "stop"
                            );
                            buttonTimer();
                        }}
                        disabled={buttonDisabled}
                    >
                        STOP
                    </Button>
                </Stack>
                <br />
                <br />
            </Box>
        </div>
    );
}

export default Progress;

function processHandler(factoryName, selectedProcess, status) {
    axios.post(
        `/api/process/updateStatus?factoryName=${factoryName}&processName=${selectedProcess}&status=${status}`
    );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 1,
    },
}));
