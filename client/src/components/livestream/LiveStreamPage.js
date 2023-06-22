import { Button } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";

function LiveStreamPage() {
  const [number, setNumber] = useState(1);
  const factoryName = localStorage.getItem("factoryName");

  useEffect(() => {
    axios
      .post("/api/camera/change", {
        factoryName: "CarFactory",
        cameraNumber: number,
      })
      .catch((error) => {
        console.log(error);
        // 로그인 실패 시 처리
      });
  }, [number]);

  useEffect(() => {
    if (factoryName != "CarFactory") {
      setNumber(5);
    }
  }, []);
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
        src="https://www.youtube.com/embed/yWJ1DE4MZEs"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => {
          if (factoryName === "PackagingFactory") {
            setNumber(5);
          } else {
            setNumber(1);
          }
        }}
        style={{ backgroundColor: "grey" }}
      >
        camera 1
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="contained"
        onClick={() => {
          if (factoryName === "PackagingFactory") {
            setNumber(6);
          } else {
            setNumber(2);
          }
        }}
        style={{ backgroundColor: "grey" }}
      >
        camera 2
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="contained"
        onClick={() => {
          if (factoryName === "PackagingFactory") {
            setNumber(7);
          } else {
            setNumber(3);
          }
        }}
        style={{ backgroundColor: "grey" }}
      >
        camera 3
      </Button>
      &nbsp;&nbsp;
      <Button
        variant="contained"
        onClick={() => {
          if (factoryName === "PackagingFactory") {
            setNumber(8);
          } else {
            setNumber(4);
          }
        }}
        style={{ backgroundColor: "grey" }}
      >
        camera 4
      </Button>
    </div>
  );
}

export default LiveStreamPage;
