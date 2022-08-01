import "./style.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Sessions(){
    const {movieId} = useParams();
    const apiURL= `https://mock-api.driven.com.br/api/v7/cineflex/movies/${movieId}/showtimes`;
    const [movieInfo, setMovieInfo] = useState(null);
    const [errorState,setErrorState]=useState({state:false});

    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setMovieInfo(response.data);
        })
        promise.catch((error)=>{
            const errorObj = {status: error.response.status};
            setErrorState({...errorObj, state:true})});
    },[apiURL]);

    if(errorState.state){
        return(
            <ErrorScreen status={errorState.status} />
        );
    }

    return(
        <div>
            <Header text={"Selecione o horário"} />
            {(movieInfo)?(
                <>
                <div className="dates">
                    {movieInfo.days.map((date)=>{
                        return(<Date date={date} key={date.id}/>);
                    })}
                </div>
                <Footer img={movieInfo.posterURL} title={movieInfo.title} />
                </>
            ):(<Loading />)}
            
            
        </div>
    );
}

function Date({date}){
    return(
        <div className="date">
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