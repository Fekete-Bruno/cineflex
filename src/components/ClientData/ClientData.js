import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function ClientData({selectedSeats, orderData, seatsInfo}){
    const[name,setName] = useState("");
    const[cpf,setCpf] = useState("");
    const postURL ="https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many";
    const navigate = useNavigate();
    
    const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    
    function login (event) {
		event.preventDefault();
        if(!regex.test(cpf)){
            alert("Escreva o CPF novamente (na forma 12345678900 ou 123.456.789-00)");
        } else if (selectedSeats.length===0){
            alert("Selecione pelo menos um assento...");
        }else{
            const request = axios.post(postURL,
                {
                   ids:selectedSeats,
                   name:name,
                   cpf:cpf, 
                });
            request.then(()=>{
                orderData.title = seatsInfo.movie.title;
                orderData.date = seatsInfo.day.date;
                orderData.time = seatsInfo.name;
                orderData.client = name;
                orderData.cpf = cpf;
                navigate('/sucesso');
            });
            request.catch(()=>alert("Ocorreu um erro durante a requisição."))
            console.log(name,cpf,selectedSeats);
        }
    }

    
    return (
		<form className="form" onSubmit={login}>
            <div>Nome do comprador:</div>
		    <input type="text" required value={name} onChange={e => setName(e.target.value)} />
            <div>CPF do comprador:</div>
		    <input type="text" required value={cpf} onChange={e => setCpf(e.target.value)} />
            <div></div>
		    <button type="submit">Reservar Assento(s)</button>
		</form>
	);
}