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

import "./process.css";
function ProcessDetail() {
    const factoryName = localStorage.getItem("factoryName");
    const [processes, setProcesses] = useState(["default"]);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [processStatus, setProcessStatus] = useState("");

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

    useEffect(() => {
        /* 전체 process 조회 API 생성시 사용
        axios.get("/api/process").then((response) => {
            setProcesses([response.data.processName, ...processes]);
        });
        */
    }, []);

    // 전체 process, 해당 process 컨베이어 벨트의 작동 여부를 10초마다 조회
    useEffect(() => {
        const interval = setInterval(() => {
            axios
                .get(
                    `/api/process?factoryName=${factoryName}&processName=${selectedProcess}`
                )
                .then((response) => {
                    if (response.data) {
                        setProcessStatus(response.data[0].processStatus);
                        setConveyorBeltStatus({
                            firstProcessMachineConveyorBelt:
                                response.data[0]
                                    .firstProcessMachineConveyorBelt,
                            secondProcessMachineConveyorBelt:
                                response.data[0]
                                    .secondProcessMachineConveyorBelt,
                            thirdProcessMachineConveyorBelt:
                                response.data[0]
                                    .thirdProcessMachineConveyorBelt,
                            fourthProcessMachineConveyorBelt:
                                response.data[0]
                                    .fourthProcessMachineConveyorBelt,
                        });
                    }
                });
        }, 10000);

        return () => clearInterval(interval);
    }, [selectedProcess]);

    // 프로세스
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
                <div className="text">
                    <h2>현재 공정 상태: {processStatus}</h2>
                    {Object.keys(conveyorBeltStatus).map((key, i) => {
                        return (
                            <div className="in" key={i}>
                                <br />
                                <h3>
                                    컨베이어 {i} : {conveyorBeltStatus[key]}
                                </h3>
                                <Box
                                    sx={{ width: "80%", paddingLeft: "5vmax" }}
                                >
                                    <LinearProgressWithLabel value={progress} />
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