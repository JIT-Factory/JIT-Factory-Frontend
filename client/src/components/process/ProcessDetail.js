import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

import { Button, Stack } from "@mui/material";

import "./process.css";
function ProcessDetail() {
    const token = localStorage.getItem("token");
    const factoryName = localStorage.getItem("factoryName");
    const [processes, setProcesses] = useState(["default"]);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [processStatus, setProcessStatus] = useState("");
    const [orderList, setOrderList] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // 여러개의 컨베이어 벨트 state 선언
    const [conveyorBeltStatus, setConveyorBeltStatus] = useState({
        firstProcessMachineConveyorBelt: "",
        secondProcessMachineConveyorBelt: "",
        thirdProcessMachineConveyorBelt: "",
        fourthProcessMachineConveyorBelt: "",
    });

    // 프로세스 바 진행사항
    const [progress, setProgress] = useState(0);

    const handleProcessChange = (event) => {
        setSelectedProcess(event.target.value);
    };

    // progress Bar
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress
            );
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [selectedProcess]);

    useEffect(() => {
        /* 전체 process 조회 API 생성시 사용
        axios.get("/api/process").then((response) => {
            setProcesses([response.data.processName, ...processes]);
        });
        */
    }, []);

    // 전체 process, 해당 process 컨베이어 벨트의 작동 여부를 10초마다 조회
    useEffect(() => {
        SetUp();
        checkOrder();

        // 1초마다 progressBar 갱신
        const intervalSetUp = setInterval(SetUp, 1000);

        // 1분마다 오더 조회
        const intervalCheckOrder = setInterval(checkOrder, 60000);

        return () => clearInterval(intervalSetUp, intervalCheckOrder);
    }, [selectedProcess]);

    const SetUp = () => {
        axios
            .get(
                `/api/process?factoryName=${factoryName}&processName=${selectedProcess}`
            )
            .then((response) => {
                if (response.data) {
                    setProcessStatus(response.data[0].processStatus);
                    setConveyorBeltStatus({
                        firstProcessMachineConveyorBelt:
                            response.data[0].firstProcessMachineConveyorBelt,
                        secondProcessMachineConveyorBelt:
                            response.data[0].secondProcessMachineConveyorBelt,
                        thirdProcessMachineConveyorBelt:
                            response.data[0].thirdProcessMachineConveyorBelt,
                        fourthProcessMachineConveyorBelt:
                            response.data[0].fourthProcessMachineConveyorBelt,
                    });
                }
            });
    };

    const checkOrder = () => {
        axios
            .get(`/api/orders/name/${factoryName}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((response) => {
                if (response.data) {
                    setOrderList(response.data);
                }
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
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="process-select-label">공정</InputLabel>
                    <Select
                        labelId="process-select-label"
                        id="process-select"
                        value={selectedProcess}
                        onChange={handleProcessChange}
                    >
                        {processes.map((item, i) => (
                            <MenuItem key={i} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
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

                <div className="text">
                    <h2>현재 공정 상태: {processStatus}</h2>
                    {Object.keys(conveyorBeltStatus).map((key, i) => {
                        return (
                            <div
                                className="in"
                                key={i}
                                style={{ paddingTop: "10px" }}
                            >
                                <h3>
                                    컨베이어 {i + 1} : {conveyorBeltStatus[key]}
                                </h3>
                                <Box
                                    sx={{ width: "80%", paddingLeft: "5vmax" }}
                                >
                                    <LinearProgressWithLabel value={progress} />
                                </Box>
                            </div>
                        );
                    })}

                    <br />
                    <h3>잔여 생산량</h3>
                    {orderList.map((order, index) => (
                        <div key={index}>
                            <p>
                                제품명: {order.productName}, 수량: {order.count}
                            </p>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );
}

export default ProcessDetail;

function processHandler(factoryName, selectedProcess, status) {
    axios.post(
        `/api/process/updateStatus?factoryName=${factoryName}&processName=${selectedProcess}&status=${status}`
    );
}

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};