import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainScreen from "./MainScreen"
import Header from "./Header/Header";
import "../css/reset.css"
import "../css/style.css"


export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainScreen />} />
            </Routes>
        </BrowserRouter>
    )
}