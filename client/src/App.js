import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import TestPage from "./components/test/TestPage";
import LoginPage from "./components/auth/LoginPage";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
function App() {
    const [hello, setHello] = useState("");
    // useEffect(() => {
    //     async function fetchdata() {
    //         const { data } = await axios.get("/api/ping");
    //         console.log(data);
    //     }
    //     fetchdata();
    // });
    useEffect(() => {
        axios
            //.get("http://localhost:8080/ping")
            .get("/api/ping")
            .then((response) => setHello(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
