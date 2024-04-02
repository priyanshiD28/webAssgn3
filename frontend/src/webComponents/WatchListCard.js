import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.js'
import apiCallURL from '../index.js';

import Card from 'react-bootstrap/Card';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

const WatchListCard = (wlDB, deleteFunction) => {

    const [wlTicker, setWLTicker] = useState("");
    const [wlName, setWLName] = useState("");
    const [wlStock, setWLStock] = useState([]);
    const [wlC, setWLC] = useState([]);
    const [wlD, setWLD] = useState([]);
    const [wlDP, setWLDP] = useState([]);

    const colorChange = (item) => {
        return (item > 0 ? 'text-success' : 'text-danger')
    }

    useEffect(() => {
        console.log(wlDB.wlDB.ticker)
        setWLTicker(wlDB.wlDB.ticker)
        setWLName(wlDB.wlDB.companyName)
        const fetchData = async(ticker) => {
            const getStockData = await axios.get(apiCallURL+'search/stock/'+ticker)
            setWLStock(getStockData.data)
            console.log(getStockData.data)
        }
        console.log(wlDB.wlDB.ticker)
        fetchData(wlDB.wlDB.ticker)
        console.log(wlStock)
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
                <Button onClick = {deleteFunction} variant="border-0 "><ClearIcon></ClearIcon></Button>
                <Row>
                    <Col>
                        <h4>{wlTicker}</h4>
                        <h5>{wlName}</h5>
                    </Col>
                    <Col>
                        <h3 className={colorChange(wlD)}>{wlC}</h3>
                        <h5 className={colorChange(wlD)} >
                        {wlD > 0 ?  (
                            <BiSolidUpArrow />
                            ) : (
                            <BiSolidDownArrow />
                            )}{wlD}
                        ({wlDP})</h5>
                    </Col>
                </Row>
                
                </Card.Body>
            </Card>
        </>
    );
}

export default WatchListCard;