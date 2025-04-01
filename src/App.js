import Header from "./component/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BriseStake from "./pages/BriseStake";

function App() {
return (
    <div>
        <Routes>
        <Route
            exact
            path="/"
            element={
            <>
                <Header/>
                <Home/>
            </>
            }
        />
        <Route
            exact
            path="/briseStake"
            element={
            <>
                <Header/>
                <BriseStake/>
            </>
            }
        />
        </Routes>
    </div>
);
}

export default App;
