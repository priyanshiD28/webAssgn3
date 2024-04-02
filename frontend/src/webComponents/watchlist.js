import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.js'
import apiCallURL from '../index.js';
import AlertMessage from "./AlertMessage";

import { useData } from '../DataContext';
import Card from 'react-bootstrap/Card';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Container } from 'react-bootstrap';

const WatchListCard = () => {
    const {
        watchlistData, setWatchlistData,
        watchlistUpdater,
    } = useData();

    const [wlLoading, setWLLoading] = useState(true);
    const [wlEmpty, setWLEmpty] = useState(false);


    const [wlTicker, setWLTicker] = useState("");
    const [wlName, setWLName] = useState("");
    const [wlStock, setWLStock] = useState([]);
    const [wlC, setWLC] = useState([]);
    const [wlD, setWLD] = useState([]);
    const [wlDP, setWLDP] = useState([]);

    useEffect(() => {
        watchlistUpdater();
    }, [])

    useEffect(() => {
        setWLLoading(true)
        if(!watchlistData || watchlistData.length==0) {
            setWLEmpty(true)
        }

        fetchData()
        setWLLoading(false)

    },[watchlistData])

    const fetchData = (item) => {
        const getStockData = axios.get(apiCallURL+'search/stock/'+item)
        setWLC(getStockData.data.c)
        setWLD(getStockData.data.d)
        setWLDP(getStockData.data.dp)
    }

    function handleDeleteStock(ticker) {
        const deleteWL = axios.delete(apiCallURL + 'stocks/watchlist/' + ticker);
        watchlistUpdater(deleteWL.data)        
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