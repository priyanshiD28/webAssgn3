import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.js'
import apiCallURL from '../index.js';
import AlertMessage from "./AlertMessage";

import { useData } from '../DataContext';
import Card from 'react-bootstrap/Card';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Container } from 'react-bootstrap';

const apiCallLocalHost = 'http://localhost:4000/api/';

const WatchListCard = () => {
    const {
        watchlistData, setWatchlistData,
        watchlistUpdater,
    } = useData();

    const [wlLoading, setWLLoading] = useState(true);
    const [wlEmpty, setWLEmpty] = useState(false);


    const [wlTicker, setWLTicker] = useState("");
    const [wlName, setWLName] = useState("");
    const [wlC, setWLC] = useState(0);
    const [wlD, setWLD] = useState(0);
    const [wlDP, setWLDP] = useState(0);

    useEffect(() => {
        watchlistUpdater();
    }, [])

    useEffect(() => {
        if(!watchlistData || watchlistData.length==0) {
            setWLEmpty(true)
        }
    },[watchlistData])

    function handleDeleteStock(ticker) {
        axios.delete(apiCallLocalHost + 'stocks/watchlist/' + ticker)
        .then(response => {
            console.log("Stock Deleted: ",response.data);
            watchlistUpdater();
        })
        .catch(error =>{
            console.error("Error Deleting Stock: ",error)
        })        
    }

    return (
        <>
            <Container>
                <h3>My Watchlist</h3>
            </Container>
            {wlEmpty ?
            <Container>
                {AlertMessage({isSuccess: false, isFail: true, setDisplay:true, message:"Currently you dont have any stock in your watchlist"})}
            </Container> : 
            <Container>
                {watchlistData.map((item,idx) => (
                    <Card
                    bg="light"
                    text='dark'
                    style={{ width: '80%'}}
                    className="mx-auto my-2"
                    >
                    {/* <Card.Header>Header</Card.Header> */}
                    <Card.Body>
                        <Button onClick = {()=> handleDeleteStock(item.ticker)}><ClearIcon></ClearIcon></Button>
                        <Card.Title>{item.ticker} </Card.Title>
                        <Card.Text>
                        {item.companyName}
                        </Card.Text>
                    </Card.Body>
                    </Card>
                ))}
            </Container> }
                
        </>
    );
}

export default WatchListCard;