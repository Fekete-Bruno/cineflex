import "./style.css";
import InnerHeader from "../InnerHeader/InnerHeader";
import ClientData from "../ClientData/ClientData";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

    function addSeats(){
        const newArrayIds = seatsInfo.seats.filter((seat)=>{return (seat.clicked)}).map((seat)=>{return(seat.id)});
        const newArrayNames = seatsInfo.seats.filter((seat)=>{return (seat.clicked)}).map((seat)=>{return(seat.name)});
        setSelectedSeats([...newArrayIds]);
        orderData.seats=newArrayNames;
    }

    return(
        <div>
        <InnerHeader text={"Selecione o(s) assento(s)"} />
        {(!seatsInfo)?(<div>Carregando...</div>):(
            <>
            <div className="seats">{
                seatsInfo.seats.map((seat,index)=>{return(
                <Seat key={seat.id} index={index} name={seat.name} available={(seat.isAvailable)?("available"):("unavailable")} seatsInfo={seatsInfo} addSeats={addSeats}/>
                )})}
            </div>

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
function Seat({name , available, index, seatsInfo,addSeats}){
    const [clicked,setClicked] = useState(false);

    function testaAssento(){
        if(available==="available"){
            setClicked(!clicked);    
            seatsInfo.seats[index].clicked=!clicked;
            addSeats();
        }else{
            alert("Esse assento não está disponível...");
        } 
    }

    return(
        <div onClick={testaAssento} className={"seat "+ available + " " + clicked}>{name}</div>
    );
}

function Examples(){
    return(
        <div className="examples">
            <div className="example">
            <div className="seat true"></div>
            Selecionado
            </div>

            <div className="example">
            <div className="seat available"></div>
            Disponível
            </div>

            <div className="example">
            <div className="seat unavailable"></div>
            Indisponível
            </div>
        </div>
    );
}