import "./style.css";
import InnerHeader from "../InnerHeader/InnerHeader";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Sessions(){
    const {movieId} = useParams();
    const apiURL= `https://mock-api.driven.com.br/api/v7/cineflex/movies/${movieId}/showtimes`
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
                    <div className="img-container"><img src={movieInfo.posterURL}/></div>
                    <div className="title">{movieInfo.title}</div>
                </div>
                </>
            ):('Carregando...')}
            
            
        </div>
    );
}

function Date({date}){
    
    return(<div className="date">
                        {date.weekday} - {date.date}
                        <div className="showtimes">
                        {date.showtimes.map((time)=>{return(<Showtime time={time} key={time.id}/>);})}
                        </div>
                        </div>
                        );
}

function Showtime({time}){
    return(
        <Link to={`/assentos/${time.id}`} state={time.id}>
        <div className="time" key={time.id}>{time.name}</div>
        </Link>
    );
}