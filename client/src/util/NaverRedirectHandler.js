import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NaverRedirectHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URL(window.location.href).searchParams;
        const code = params.get("code"); // 인가코드 받는 부분
        const state = params.get("state");

        console.log(code);
        console.log(state);
        axios
            .post("/api/login/oauth/naver", {
                authorizationCode: code,
                state: state,
            })
            .then((result) => {
                if (result.data) {
                    localStorage.setItem("token", result.data.accessToken);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    });

    return (
        <div>
            사실 이 페이지는 크게 의미 없다. 첫 화면으로 로직이 끝나면
            이동시켜주면 된다.
        </div>
    );
}

export default NaverRedirectHandler;
