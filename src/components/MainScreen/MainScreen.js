import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InnerHeader from "../InnerHeader/InnerHeader";
import Loading from "../Loading/Loading";
import ErrorScreen from "../ErrorScreen/ErrorScreen"; 

export default function MainScreen(){
    const apiURL = 'https://mock-api.driven.com.br/api/v7/cineflex/movies';
    const [movies,setMovies]=useState(null);
    const [errorState,setErrorState]=useState({state:false});

    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setMovies(response.data);
        });
        promise.catch((error)=>{
            const errorObj = {status: error.response.status};
            setErrorState({...errorObj, state:true})});
    },[]);

    if(errorState.state){
        return(
            <ErrorScreen status={errorState.status} />
        );
    }

    return(
        <div>
            <InnerHeader text={"Selecione o filme"} />
            <div className="movies">
                {(movies)?(movies.map((movie) => {
                    return(<Movie key={movie.id} movieId={movie.id} posterURL={movie.posterURL} title={movie.title} />);
                    })):(<Loading />)
                }
            </div>
        </div>
    );
}

function Movie({movieId,title,posterURL}){
    return(
        <Link to={`/sessoes/${movieId}`}>
        <div className="movie">
            <img src={posterURL} alt={title}/>
        </div>
        </Link>
    );
}