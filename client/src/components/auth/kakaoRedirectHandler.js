// 리다이렉트될 화면
// KakaoRedirectHandeler.js

import React, { useEffect } from "react";
import axios from "axios";

const KakaoRedirectHandler = () => {
    useEffect(() => {
        let params = new URL(document.location.toString()).searchParams;
        let code = params.get("code"); // 인가코드 받는 부분

        axios
            .post("/api/login/oauth/kakao", {
                authorizationCode: code,
                factoryName: "carFactory",
            })
            .then((result) => {
                console.log("good");
                // 토큰을 활용한 로직을 적어주면된다.
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    return (
        <div>
            사실 이페이지는 크게 의미 없다. 첫화면으로 로직이 끝나면
            이동시켜주면 된다.
        </div>
    );
};

export default KakaoRedirectHandler;
