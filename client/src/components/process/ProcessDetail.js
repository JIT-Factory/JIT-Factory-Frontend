import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

import "./process.css";
function ProcessDetail() {
    const factoryName = localStorage.getItem("factoryName");
    const [processes, setProcesses] = useState(["default"]);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [processStatus, setProcessStatus] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // 여러개의 컨베이어 벨트 state 선언
    const [conveyorBeltStatus, setConveyorBeltStatus] = useState({
        firstProcessMachineConveyorBelt: "",
        secondProcessMachineConveyorBelt: "",
        thirdProcessMachineConveyorBelt: "",
        fourthProcessMachineConveyorBelt: "",
    });

    const handleProcessChange = (event) => {
        setSelectedProcess(event.target.value);
    };

    useEffect(() => {
        axios
            .get(`/api/process/show/factory?factoryName=${factoryName}`)
            .then((response) => {
                response.data.map((a, i) => {
                    setProcesses([response.data[i].processName, ...processes]);
                });
                console.log(response.data);
            });
    }, []);

    // 전체 process, 해당 process 컨베이어 벨트의 작동 여부를 5초마다 조회
    useEffect(() => {
        SetUp();
        const intervalSetUp = setInterval(SetUp, 5000);

        return () => clearInterval(intervalSetUp);
    }, [selectedProcess]);

    const SetUp = () => {
        axios
            .get(
                `/api/process/show/factory/process?factoryName=${factoryName}&processName=${selectedProcess}`
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

    const buttonTimer = () => {
        setTimeout(() => {
            setButtonDisabled(false);
        }, 2000);
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
                                    {conveyorBeltStatus[key] === "run" ? (
                                        <LinearProgress />
                                    ) : (
                                        <LinearProgress
                                            variant="determinate"
                                            value={0}
                                        />
                                    )}
                                </Box>
                            </div>
                        );
                    })}
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