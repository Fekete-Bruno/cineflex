import "./style.css";
import InnerHeader from "../InnerHeader/InnerHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Seats(){
    const {sessionId} = useParams();
    const apiURL= `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`
    const [seatsInfo, setSeatsInfo] = useState(null);
    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setSeatsInfo(response.data);
        })
    },[])

    return(
        <div>
        <InnerHeader text={"Selecione o(s) assento(s)"} />
        {(!seatsInfo)?(<div>Carregando...</div>):(
            <>
            <div className="seats">{
                seatsInfo.seats.map((seat)=>{return(
                <Seat key={seat.id} name={seat.name}/>
                )})}
            </div>
            <Link to="/sucesso"> {/* TEMPORARIOS PARA TESTES DE LAYOUT*/}
            <div className="footer">
                <div className="img-container"><img src={seatsInfo.movie.posterURL} alt={seatsInfo.movie.title} /></div>
                <div className="title">
                    {seatsInfo.movie.title} <br/>
                    {seatsInfo.day.weekday} - {seatsInfo.name}
                </div>
            </div>
            </Link>
            </>
        )}
        </div>
    );
}
function Seat({name}){
    return(
        <div className="seat">{name}</div>
    );
}