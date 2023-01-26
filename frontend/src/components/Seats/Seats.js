import Header from "../Header/Header";
import ClientData from "../ClientData/ClientData";
import Examples from "../Examples/Examples";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SeatsList from "../SeatsList/SeatsList";
import Loading from "../Loading/Loading";
import ErrorScreen from "../ErrorScreen/ErrorScreen";

export default function Seats({orderData}){
    const {sessionId} = useParams();
    const apiURL= `https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${sessionId}/seats`
    const [seatsInfo, setSeatsInfo] = useState(null);
    const [selectedSeats,setSelectedSeats] = useState([]);
    const [errorState,setErrorState]=useState({state:false});

    useEffect(()=>{
        const promise = axios.get(apiURL);
        promise.then((response)=>{
            setSeatsInfo(response.data);
        })
        promise.catch((error)=>{
            const errorObj = {status: error.response.status};
            setErrorState({...errorObj, state:true})});
    },[apiURL]);

    if(errorState.state){
        return(
            <ErrorScreen status={errorState.status} />
        );
    }

    return(
        <div>
        <Header text={"Selecione o(s) assento(s)"} />
        {(!seatsInfo)?(<Loading />):(
            <>
            <SeatsList seats={seatsInfo.seats} setSelectedSeats={setSelectedSeats} orderData={orderData}/>
            <Examples/>
            <ClientData selectedSeats={selectedSeats} orderData={orderData} seatsInfo={seatsInfo}/>
            <Footer img={seatsInfo.movie.posterURL} title={seatsInfo.movie.title}>
                {seatsInfo.day.weekday} - {seatsInfo.name}
            </Footer>
            </>
        )}
        </div>
    );
}
