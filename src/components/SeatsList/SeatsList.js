import { useState } from "react";
import "./style.css"

export default function SeatsList({seats , setSelectedSeats, orderData}){

    function addSeats(){
        const newArrayIds = seats.filter((seat)=>{return (seat.clicked)}).map((seat)=>{return(seat.id)});
        const newArrayNames = seats.filter((seat)=>{return (seat.clicked)}).map((seat)=>{return(seat.name)});
        setSelectedSeats([...newArrayIds]);
        orderData.seats=newArrayNames;
    }

    return(
        <div className="seats">{
            seats.map((seat,index)=>{return(
            <Seat key={seat.id} index={index} name={seat.name} available={(seat.isAvailable)?("available"):("unavailable")} seats={seats} addSeats={addSeats}/>
            )})}
        </div>
    );
}

function Seat({name , available, index, seats,addSeats}){
    const [clicked,setClicked] = useState(false);

    function testaAssento(){
        if(available==="available"){
            setClicked(!clicked);    
            seats[index].clicked=!clicked;
            addSeats();
        }else{
            alert("Esse assento não está disponível...");
        } 
    }

    return(
        <div onClick={testaAssento} className={"seat "+ available + " " + clicked}>{name}</div>
    );
}