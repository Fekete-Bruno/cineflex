import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./MainScreen"
import "../css/reset.css"

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainScreen />} />
            </Routes>
        </BrowserRouter>
    )
}