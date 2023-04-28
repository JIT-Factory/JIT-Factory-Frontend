import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
import LiveStreamPage from "./components/livestream/LiveStreamPage";
import Member from "./components/member/MemberPage";
import DefectivePage from "./components/defective/DefectivePage";
import SalesPage from "./components/sales/SalesPage";

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
                <Route path="/stream" element={<LiveStreamPage />} />
            </Routes>
        </div>
    );
}

export default App;
