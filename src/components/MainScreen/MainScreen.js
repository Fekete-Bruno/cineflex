import "./style.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InnerHeader from "../InnerHeader/InnerHeader";

export default function MainScreen(){
    const apiURL = 'https://mock-api.driven.com.br/api/v5/cineflex/movies'
    const [movies,setMovies]=useState(null);

    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setMovies(response.data);
        });
        promise.catch((error)=>{
            setMovies([{id:-1, title:error.message, posterURL:`https://http.dog/${error.response.status}.jpg`}])});
    },[]);

   

    return(
        <div>
            <InnerHeader text={"Selecione o filme"} />
            <div className="movies">
                {(movies)?(movies.map((movie) => {
                    return(<Movie key={movie.id} id={movie.id} posterURL={movie.posterURL} title={movie.title} />);
                    })):('Carregando...')
                }
            </div>
        </div>
    );
}

function Movie({id,title,posterURL}){
    return(
        <Link to={{pathname:`/sessoes/${id}`,idMovie:{id}}}>
        <div className="movie">
            <img src={posterURL} alt={title}/>
        </div>
        </Link>
    );
}