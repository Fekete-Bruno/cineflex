import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./style.css";

export  default function Success({orderData,setOrderData}){
    const blankOrder={};
    const cpf=maskCpf();

    function maskCpf(){
        let cpf = orderData.cpf.replace(/[^0-9]/g,'');
        const cpfarr=cpf.split('');
        const newArr=[];
        for(let i=0;i<cpfarr.length;i++){
        if(i===3||i===6){
            newArr.push('.');
        } else if (i===9){
            newArr.push('-');
        }
        newArr.push(cpfarr[i]);
        }
        return(newArr.join(''));
    }
    
    return(
        <div>
            <Header text={"Pedido feito com sucesso!"} color={"green"}/>
            <div className="success-content">
                <div className="strong">Filme e Sessão</div>
                <div>{orderData.title}</div>
                <div>{orderData.date} {orderData.time}</div>

                <div className="strong">Ingressos</div>
                {orderData.seats.map((seat,index)=>{
                    return(<div key={index}>Assento {seat}</div>);
                })}

                <div className="strong">Comprador</div>
                <div>Nome: {orderData.client}</div>
                <div>CPF: {cpf}</div>

                <Link to="/">
                <div className="home"onClick={()=>setOrderData({...blankOrder})}>Voltar pra home</div>
                </Link>
                
            </div>
        </div>
    );
}