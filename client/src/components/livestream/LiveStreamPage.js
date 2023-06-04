import { Button } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

function LiveStreamPage() {
    const [number, setNumber] = useState(1);

    useEffect(() => {
        axios
            .post("/api/camera/change", {
                factoryName: localStorage.getItem("factoryName"),
                cameraNumber: number,
            })
            .then((response) => {
                console.log(response);
                // 로그인 성공 시 처리
            })
            .catch((error) => {
                console.log(error);
                // 로그인 실패 시 처리
            });
    }, [number]);
    return (
        <div
            style={{
                verticalAlign: "center",
                paddingTop: "2vmax",
            }}
        >
            <iframe
                width="1280"
                height="640"
                src="https://www.youtube.com/embed/VWyNjD5G95I"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
            <br />
            <br />
            <Button
                variant="contained"
                onClick={() => {
                    setNumber(1);
                }}
                style={{ backgroundColor: "grey" }}
            >
                camera 1
            </Button>
            &nbsp;&nbsp;
            <Button
                variant="contained"
                onClick={() => {
                    setNumber(2);
                }}
                style={{ backgroundColor: "grey" }}
            >
                camera 2
            </Button>
            &nbsp;&nbsp;
            <Button
                variant="contained"
                onClick={() => {
                    setNumber(3);
                }}
                style={{ backgroundColor: "grey" }}
            >
                camera 3
            </Button>
            &nbsp;&nbsp;
            <Button
                variant="contained"
                onClick={() => {
                    setNumber(4);
                }}
                style={{ backgroundColor: "grey" }}
            >
                camera 4
            </Button>
        </div>
    );
}

export default LiveStreamPage;
