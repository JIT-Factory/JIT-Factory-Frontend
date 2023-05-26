import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function KakaoRedirectHandler() {
    const navigate = useNavigate();
    useEffect(() => {
        const params = new URL(window.location.href).searchParams;
        const code = params.get("code"); // 인가코드 받는 부분
        const inputFName = prompt("공장 입력");

        axios
            .post("/api/login/oauth/kakao", {
                authorizationCode: code,
                factoryName: inputFName,
            })
            .then((result) => {
                if (result.data) {
                    localStorage.setItem("token", result.data.accessToken);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            사실 이 페이지는 크게 의미 없다. 첫 화면으로 로직이 끝나면
            이동시켜주면 된다.
        </div>
    );
}

export default KakaoRedirectHandler;
