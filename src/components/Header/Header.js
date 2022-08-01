import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Header({text, ...otherProps}){
    const navigate = useNavigate();

    return(
        <>
        <div className="header">
            {(!otherProps.home)?(<div className="back-button" onClick={()=>{navigate(-1);}}>🔙</div>):(<></>)}
            CINEFLEX
        </div>
        <div className={"inner-screen-header "+ otherProps.color}>
            {text}
        </div>
        </>
    );
}