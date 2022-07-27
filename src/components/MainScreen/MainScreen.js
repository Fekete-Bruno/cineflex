import "./style.css"
import { useState, useEffect } from "react";
import axios from "axios";

export default function MainScreen(){
    const apiURL = 'https://mock-api.driven.com.br/api/v5/cineflex/movies'
    const [movies,setMovies]=useState(null);

    useEffect(()=>{
        const promise = axios.get('apiURL');
        promise.then((response)=>{
            setMovies(response.data);
        });
        promise.catch((error)=>{
            const errorStatus = (error.response.status);
            setMovies([{id:-1, title:'Error '+errorStatus, posterURL:`https://http.dog/${errorStatus}.jpg`}])});
    },[]);

    return(
        <div>
            <div className="inner-screen-header">
                Selecione o filme
            </div>
            <div className="movies">
                {(movies)?(movies.map((movie) => {
                    return(<Movie key={movie.id} posterURL={movie.posterURL} title={movie.title} />);
                    })):('Carregando...')
                }
            </div>
        </div>
    );
}

function Movie({title,posterURL}){
    return(
        <div className="movie">
            <img src={posterURL} alt={title}/>
        </div>
    );
}