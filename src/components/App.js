import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"
import Header from "./Header/Header";
import MainScreen from "./MainScreen/MainScreen";
import Sessions from "./Sessions/Sessions";
import Seats from "./Seats/Seats";
import Success from "./Success/Success";
import "../css/reset.css";
import "../css/style.css";

export default function App(){
    const [orderData,setOrderData] = useState({seats:[]})

    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/sessoes/:movieId" element={<Sessions />} />
                <Route path="/assentos/:sessionId" element={<Seats orderData={orderData}/>} />
                <Route path="/sucesso" element={<Success orderData={orderData} setOrderData={setOrderData}/>} />
            </Routes>
        </BrowserRouter>
    )
}