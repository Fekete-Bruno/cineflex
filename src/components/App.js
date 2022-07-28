import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react"
import Header from "./Header/Header";
import MainScreen from "./MainScreen/MainScreen";
import Sessions from "./Sessions/Sessions";
import Seats from "./Seats/Seats";
import Success from "./Success/Success";
import "../css/reset.css";
import "../css/style.css";

const dataHARD = {
    title:"Enola Holmes",
    date: "24/06/2021",
    time: "15:00",
    seats: [15,16,17],
    client: "João da Silva",
    cpf: "123.123.123-12"
}


export default function App(){
    const [orderData,setOrderData] = useState(dataHARD)
    console.log(orderData);
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<MainScreen />} />
                <Route path="/sessoes/:movieId" element={<Sessions />} />
                <Route path="/assentos/:sessionId" element={<Seats />} />
                <Route path="/sucesso" element={<Success orderData={orderData} setOrderData={setOrderData}/>} />
            </Routes>
        </BrowserRouter>
    )
}