import "./style.css";

export default function Examples(){
    return(
        <div className="examples">
            <div className="example">
            <div className="seat true"></div>
            Selecionado
            </div>

            <div className="example">
            <div className="seat available"></div>
            Disponível
            </div>

            <div className="example">
            <div className="seat unavailable"></div>
            Indisponível
            </div>
        </div>
    );
}