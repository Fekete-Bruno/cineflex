import "./style.css";
import loading from "./Loading-Movies.gif";


export default function Loading(){
    return(
        <div className="loading">
            Carregando...
            <img src={loading} alt="Carregando..."/>
        </div>
    );
}