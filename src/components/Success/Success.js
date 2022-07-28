import InnerHeader from "../InnerHeader/InnerHeader";
import { Link } from "react-router-dom";
import "./style.css";

export  default function Success({orderData,setOrderData}){
    const blankOrder={}
    return(
        <div>
            <InnerHeader text={"Pedido feito com sucesso!"} color={"green"}/>
            <div className="success-content">
                <div className="strong">Filme e Sessão</div>
                <div>{orderData.title}</div>
                <div>{orderData.date} {orderData.time}</div>

                <div className="strong">Ingressos</div>
                {orderData.seats.map((seat)=>{
                    return(<div>Assento {seat}</div>)
                })}


                <div className="strong">Comprador</div>
                <div>{orderData.client}</div>
                <div>{orderData.cpf}</div>



                <Link to="/">
                <div className="home"onClick={()=>setOrderData({...blankOrder})}>Voltar pra home</div>
                </Link>
                
            </div>
        </div>
    );
}