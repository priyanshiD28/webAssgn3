import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.js'
import apiCallURL from '../index.js';

import Card from 'react-bootstrap/Card';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Container } from 'react-bootstrap';

const WatchListCard = (wlDB, deleteFunction) => {

    const [wlTicker, setWLTicker] = useState("");
    const [wlName, setWLName] = useState("");
    const [wlStock, setWLStock] = useState([]);
    const [wlC, setWLC] = useState([]);
    const [wlD, setWLD] = useState([]);
    const [wlDP, setWLDP] = useState([]);

    useEffect(() => {
        setWLTicker(wlDB.ticker)
        setWLName(wlDB.companyName)
        const fetchData = (ticker) => {
            const getStockData = axios.get(apiCallURL+'search/stock/'+ticker)
            setWLStock(getStockData.data)
        }
        fetchData(wlDB.ticker)
    }, [wlDB])

    useEffect(() => {
        setWLC(wlStock.c)
        setWLD(wlStock.d)
        setWLDP(wlStock.dp)
    },[wlStock])
    return (
        <>
            <Card
                bg="light"
                text='dark'
                style={{ width: '80%'}}
                className="mx-auto my-2"
            >        
            <Card.Body>
                <Button onClick = {deleteFunction}><ClearIcon></ClearIcon></Button>
                <Card.Title>{wlTicker} </Card.Title>
                <Card.Text>
                    {wlName}
                </Card.Text>
                <Card.Text>{wlC}</Card.Text>
                <Card.Text>{wlD}</Card.Text>
                <Card.Text>{wlDP}</Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default WatchListCard;