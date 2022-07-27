import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header";
import MainScreen from "./MainScreen/MainScreen"
import Sessions from "./Sessions/Sessions";
import Seats from "./Seats/Seats";
import "../css/reset.css"
import "../css/style.css"


export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/sessoes/:idFilme" element={<Sessions />} />
                <Route path="/assentos/:idSessao" element={<Seats />} />
            </Routes>
        </BrowserRouter>
    )
}