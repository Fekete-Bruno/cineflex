import "./style.css";
import InnerHeader from "../InnerHeader/InnerHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Sessions(){
    const idHARD = 3;
    const apiURL= `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idHARD}/showtimes`
    const [movieInfo, setMovieInfo] = useState(null);

    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setMovieInfo(response.data);
        })
    },[])

    return(
        <div>
            <InnerHeader text={"Selecione o horário"} />
            {(movieInfo)?(
                <>
                <div className="dates">
                    {movieInfo.days.map((date)=>{
                        return(<Date date={date} key={date.id}/>);
                    })}
                </div>
                <div className="footer">
                    <img src={movieInfo.posterURL}/>
                    <div className="title">{movieInfo.title}</div>
                </div>
                </>
            ):('Carregando...')}
            
            
        </div>
    );
}

function Date({date}){
    
    return(<div className="date">
                        {date.date}
                        <div className="showtimes">
                        {date.showtimes.map((time)=>{return(<Showtime time={time} key={time.id}/>);})}
                        </div>
                        </div>
                        );
}

function Showtime({time}){
    return(
        <Link to={`/assentos/${time.id}`}>
        <div className="time" key={time.id}>{time.name}</div>
        </Link>
    );
}