import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

import "./process.css";
function ProcessDetail() {
    const factoryName = localStorage.getItem("factoryName");
    const [processes, setProcesses] = useState(["default"]);
    const [selectedProcess, setSelectedProcess] = useState("");
    const [processStatus, setProcessStatus] = useState("");

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

    // http://localhost:8080/api/process?factoryName=carFactory&processName=default
    useEffect(() => {
        axios
            .get(
                `/api/process?factoryName=${factoryName}&processName=${selectedProcess}`
            )
            .then((response) => {
                if (response.data) {
                    console.log(response.data[0].processStatus);
                }
            });
    }, [selectedProcess]);
    /*
    "firstProcessMachineConveyorBelt": "stop",
    "secondProcessMachineConveyorBelt": "stop",
    "thirdProcessMachineConveyorBelt": "stop",
    "fourthProcessMachineConveyorBelt": "stop"
    */

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
                    <div className="in">
                        <h3>컨베이어 1</h3>
                        <br />
                        <h3>컨베이어 2</h3>
                        <br />
                        <h3>컨베이어 3</h3>
                        <br />
                        <h3>컨베이어 4</h3>
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default ProcessDetail;
