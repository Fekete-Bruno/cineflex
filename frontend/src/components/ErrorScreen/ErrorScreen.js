import "./style.css";
import { Link } from "react-router-dom";

export default function ErrorScreen({status}){
    return(
        <div className="error">
            <img src={`https://http.dog/${status}.jpg`} alt={"Status: "+status}/>

            <Link to="/">
                <div className="home">Voltar para home</div>
            </Link>
        </div>
    )
}