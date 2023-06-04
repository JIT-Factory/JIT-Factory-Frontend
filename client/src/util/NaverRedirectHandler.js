import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function NaverRedirectHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URL(window.location.href).searchParams;
        const code = params.get("code"); // 인가코드 받는 부분
        const state = params.get("state");

        axios
            .post("/api/login/oauth/naver", {
                authorizationCode: code,
                state: state,
            })
            .then((result) => {
                if (result.data) {
                    localStorage.setItem("token", result.data.accessToken);
                    const tokenData = jwt_decode(result.data.accessToken);
                    localStorage.setItem("factoryName", tokenData.factoryName);
                }
                navigate("/");
            })
            .catch((e) => {
                console.log(e);
            });
    });

    return <div></div>;
}

export default NaverRedirectHandler;
