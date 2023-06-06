import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import axios from "axios";
import { Button } from "@mui/material";

function CustomFormControl(props) {
    return (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
            &nbsp;&nbsp;
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

function AddProduct() {
    const token = localStorage.getItem("token");
    const factoryName = localStorage.getItem("factoryName");
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState("");
    const [count] = useState([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
    ]);
    const [selectedCount1, setSelectedCount1] = useState(0);
    const [selectedCount2, setSelectedCount2] = useState(0);
    const [inputOrder, setInputOrder] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/orders/name/${factoryName}`, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            .then((response) => {
                setOrders(response.data.map((item) => item.productName));
            });
    }, []);

    const handleOrderChange = (event) => {
        setSelectedOrder(event.target.value);
    };
    const handleCountChange1 = (event) => {
        setSelectedCount1(event.target.value);
    };
    const handleCountChange2 = (event) => {
        setSelectedCount2(event.target.value);
    };
    const handleInputOrder = (event) => {
        setInputOrder(event.target.value);
    };

    const clearHandler = () => {
        setSelectedOrder("");
        setInputOrder("");
        setSelectedCount1(0);
        setSelectedCount2(0);
    };

    const buttonTimer = () => {
        setTimeout(() => {
            setButtonDisabled(false);
        }, 1000);
    };

    return (
        <React.Fragment>
            <div>
                <h2 style={{ paddingBottom: "1vmax", textAlign: "left" }}>
                    기존 상품 주문
                </h2>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <CustomFormControl
                        choose="상품 이름"
                        handleChange={handleOrderChange}
                        selected={selectedOrder}
                        data={orders}
                    />
                    <CustomFormControl
                        choose="상품 개수"
                        handleChange={handleCountChange1}
                        selected={selectedCount1}
                        data={count}
                    />
                    <Button
                        variant="contained"
                        style={{ background: "#222" }}
                        size="small"
                        sx={{ height: 40, left: 15, top: 20 }}
                        onClick={() => {
                            setButtonDisabled(true);
                            orderHandler(
                                factoryName,
                                selectedOrder,
                                selectedCount1,
                                token
                            );
                            buttonTimer();
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
                <h2 style={{ paddingBottom: "1vmax", textAlign: "left" }}>
                    신규 상품 주문
                </h2>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "15ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-basic"
                            label="추가할 상품입력"
                            variant="standard"
                            value={inputOrder}
                            onChange={handleInputOrder}
                        />
                    </Box>
                    <CustomFormControl
                        choose="상품 개수"
                        handleChange={handleCountChange2}
                        selected={selectedCount2}
                        data={count}
                    />
                    <Button
                        variant="contained"
                        style={{ background: "#222" }}
                        size="small"
                        sx={{ height: 40, left: 15, top: 20 }}
                        onClick={() => {
                            setButtonDisabled(true);
                            orderHandler(
                                factoryName,
                                inputOrder,
                                selectedCount2,
                                token
                            );
                            buttonTimer();
                            clearHandler();
                        }}
                        disabled={buttonDisabled}
                    >
                        주문하기
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AddProduct;

function orderHandler(factoryName, productName, selectedCount, token) {
    const requestBody = {
        factoryName: factoryName,
        productName: productName,
        count: selectedCount,
    };

    if (productName === "" || productName === null) {
        alert("상품 이름이 누락되어있습니다.");
    } else if (selectedCount === 0) {
        alert("상품 개수를 확인해주세요.");
    } else {
        axios.post("/api/orders/new", requestBody, {
            headers: {
                Authorization: token,
            },
        });
    }
}
