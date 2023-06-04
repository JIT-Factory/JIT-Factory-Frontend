import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import LiveStreamPage from "./components/livestream/LiveStreamPage";
import Member from "./components/member/MemberPage";
import DefectivePage from "./components/defective/DefectivePage";
import SalesPage from "./components/sales/SalesPage";
import ProcessPage from "./components/process/ProcessPage";
import ProductPage from "./components/product/ProductPage";
import KakaoRedirectHandler from "./util/kakaoRedirectHandler";
import NaverRedirectHandler from "./util/NaverRedirectHandler";
import StreamPage from "./components/livestream/StreamPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
                <Route path="/member" element={<Member />} />
                <Route path="/defective" element={<DefectivePage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/stream" element={<StreamPage />} />
                <Route path="/process" element={<ProcessPage />} />
                <Route path="/product" element={<ProductPage />} />

                <Route path="/oauth/kakao" element={<KakaoRedirectHandler />} />
                <Route path="/oauth/naver" element={<NaverRedirectHandler />} />
            </Routes>
        </div>
    );
}

export default App;
