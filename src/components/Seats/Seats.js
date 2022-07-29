import InnerHeader from "../InnerHeader/InnerHeader";
import ClientData from "../ClientData/ClientData";
import Examples from "../Examples/Examples";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatsList from "../SeatsList/SeatsList";

export default function Seats({orderData}){
    const {sessionId} = useParams();
    const apiURL= `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${sessionId}/seats`
    const [seatsInfo, setSeatsInfo] = useState(null);
    const [selectedSeats,setSelectedSeats] = useState([]);
    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setSeatsInfo(response.data);
        })
    },[apiURL])

    return(
        <div>
        <InnerHeader text={"Selecione o(s) assento(s)"} />
        {(!seatsInfo)?(<div>Carregando...</div>):(
            <>
            <SeatsList seats={seatsInfo.seats} setSelectedSeats={setSelectedSeats} orderData={orderData}/>
            <Examples/>
            <ClientData selectedSeats={selectedSeats} orderData={orderData} seatsInfo={seatsInfo}/>

            <div className="footer">
                <div className="img-container"><img src={seatsInfo.movie.posterURL} alt={seatsInfo.movie.title} /></div>
                <div className="title">
                    {seatsInfo.movie.title} <br/>
                    {seatsInfo.day.weekday} - {seatsInfo.name}
                </div>
            </div>
            </>
        )}
        </div>
    );
}
