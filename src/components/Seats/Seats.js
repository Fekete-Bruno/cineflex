import "./style.css";
import InnerHeader from "../InnerHeader/InnerHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Seats(){
    const {sessionId} = useParams();
    const apiURL= `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sessionId}/seats`
    const [seatsInfo, setSeatsInfo] = useState(null);
    const [selectedSeats,setSelectedSeats] = useState([]);
    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setSeatsInfo(response.data);
        })
    },[])

    function testedeseats(){
        const newArray = seatsInfo.seats.filter((seat)=>{return (seat.clicked)}).map((seat)=>{return(Number(seat.name))});
        setSelectedSeats([...newArray]);
    }

    return(
        <div>
        <InnerHeader text={"Selecione o(s) assento(s)"} />
        {(!seatsInfo)?(<div>Carregando...</div>):(
            <>
            <div className="seats">{
                seatsInfo.seats.map((seat,index)=>{return(
                <Seat key={seat.id} index={index} name={seat.name} available={(seat.isAvailable)?("available"):("unavailable")} seatsInfo={seatsInfo}/>
                )})}
            </div>

            <div className="examples">
                <div className="example">
                <Seat  available={"true"} />
                Selecionado
                </div>

                <div className="example">
                <Seat  available={"available"} />
                Disponível
                </div>

                <div className="example">
                <Seat  available={"unavailable"} />
                Indisponível
                </div>
            </div>

            <div onClick={testedeseats}>BOTAOTESTETETSTE</div>

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
function Seat({name , available, index, seatsInfo}){
    const [clicked,setClicked] = useState(false);

    function testaAssento(){
        if(available==="available"){
            setClicked(!clicked);    
            seatsInfo.seats[index].clicked=!clicked;
        }else{
            alert("Esse assento não está disponível...");
        } 
    }

    return(
        <div onClick={testaAssento} className={"seat "+ available + " " + clicked}>{name}</div>
    );
}