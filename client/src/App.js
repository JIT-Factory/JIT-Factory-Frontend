import "./App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/dashboard/Dashboard";
import LoginPage from "./components/auth/LoginPage";
import SignUpPage from "./components/auth/SignUpPage";
function App() {
    // const [hello, setHello] = useState("");
    // useEffect(() => {
    //     axios
    //         .get("/api/ping")
    //         .then((response) => setHello(response.data))
    //         .catch((error) => console.log(error));
    // }, []);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<SignUpPage />} />
            </Routes>
        </div>
    );
}

export default App;
