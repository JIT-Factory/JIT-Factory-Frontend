import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Button } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";

function CustomFormControl(props) {
    return (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="select-label">{props.choose}</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    value={props.selected}
                    onChange={props.handleChange}
                >
                    {props.data.map((item, i) => (
                        <MenuItem key={i} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

function MaterialCheck() {
    const token = localStorage.getItem("token");
    const factoryName = localStorage.getItem("factoryName");
    const [materials, setMaterials] = useState([]);
    const [materialNames, setMaterialNames] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [inputMaterial, setInputMaterial] = useState("");
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/material/name/${factoryName}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((response) => {
                const filteredMaterials = response.data.map((item) => ({
                    materialName: item.materialName,
                    stock: item.stock,
                }));
                setMaterials(filteredMaterials);
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(materials);
    }, [buttonDisabled]);

    useEffect(() => {
        const names = materials.map((item) => item.materialName);
        setMaterialNames(names);
    }, [materials]);

    const handleSelectedMaterialChange = (event) => {
        setSelectedMaterial(event.target.value);
    };
    const handleInputMaterialChange = (event) => {
        setInputMaterial(event.target.value);
    };
    const handleCountChange1 = (event) => {
        setCount1(event.target.value);
    };
    const handleCountChange2 = (event) => {
        setCount2(event.target.value);
    };

    const clearHandler = () => {
        setSelectedMaterial("");
        setInputMaterial("");
        setCount1(0);
        setCount2(0);
    };

    const buttonTimer = () => {
        setTimeout(() => {
            setButtonDisabled(false);
        }, 1000);
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6} md={6}>
                    <div>
                        <h2
                            style={{
                                paddingBottom: "1vmax",
                                textAlign: "left",
                            }}
                        >
                            기존 재료 주문
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <CustomFormControl
                                choose="재료 이름"
                                handleChange={handleSelectedMaterialChange}
                                selected={selectedMaterial}
                                data={materialNames}
                            />
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": { m: 1, width: "14ch" },
                                    "& input": {
                                        textAlign: "center",
                                    },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="standard-basic"
                                    label="재료 개수"
                                    variant="standard"
                                    value={count1}
                                    onChange={handleCountChange1}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                style={{ background: "#222" }}
                                size="small"
                                sx={{ height: 40, left: 15, top: 20 }}
                                onClick={() => {
                                    setButtonDisabled(true);
                                    buttonTimer();
                                    orderHandler(
                                        factoryName,
                                        selectedMaterial,
                                        count1,
                                        token
                                    );
                                    clearHandler();
                                }}
                                disabled={buttonDisabled}
                            >
                                주문하기
                            </Button>
                        </div>
                    </div>

                    <br />
                    <br />

                    <div>
                        <h2
                            style={{
                                paddingBottom: "1vmax",
                                textAlign: "left",
                            }}
                        >
                            신규 재료 주문
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": { m: 1, width: "14ch" },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="standard-basic"
                                    label="재료 이름"
                                    variant="standard"
                                    value={inputMaterial}
                                    onChange={handleInputMaterialChange}
                                />
                            </Box>
                            <Box
                                component="form"
                                sx={{
                                    "& > :not(style)": {
                                        m: 1,
                                        width: "14ch",
                                    },
                                    "& input": {
                                        textAlign: "center",
                                    },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    id="standard-basic"
                                    label="재료 개수"
                                    variant="standard"
                                    value={count2}
                                    onChange={handleCountChange2}
                                />
                            </Box>
                            <Button
                                variant="contained"
                                style={{ background: "#222" }}
                                size="small"
                                sx={{ height: 40, left: 15, top: 20 }}
                                onClick={() => {
                                    setButtonDisabled(true);
                                    buttonTimer();
                                    orderHandler(
                                        factoryName,
                                        inputMaterial,
                                        count2,
                                        token
                                    );
                                    clearHandler();
                                }}
                                disabled={buttonDisabled}
                            >
                                주문하기
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6} md={6}>
                    <h2 style={{ textAlign: "left" }}>재료 조회</h2>
                    <TableContainer sx={{ maxHeight: 300 }}>
                        <Table
                            sx={{
                                minWidth: 600,
                                maxWidth: 600,
                                overflowY: "auto",
                                border: 1,
                            }}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">
                                        재료 이름
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        재료 개수
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map(({ materialName, stock }) => (
                                    <StyledTableRow key={materialName}>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                            align="center"
                                        >
                                            <h4 className="tbText">
                                                {materialName}
                                            </h4>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <h4 className="tbText">{stock}</h4>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
}

export default MaterialCheck;

function orderHandler(factoryName, materialName, count, token) {
    const requestBody = {
        factoryName: factoryName,
        materialName: materialName,
        stock: count,
    };

    if (materialName === "" || materialName === null) {
        alert("재료 이름이 누락되어있습니다.");
    } else if (count === 0 || count > 500) {
        alert("재료 개수는 1~500까지의 숫자만 허용됩니다.");
    } else {
        axios.post("/api/material/new", requestBody, {
            headers: {
                Authorization: token,
            },
        });
    }
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
