import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.js'
import apiCallURL from '../index.js';
import BuyStockModal from './BuyStockModal.js';
import SellStockModal from './SellStockModal.js';

import Card from 'react-bootstrap/Card';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

const PortfolioCard = (pDB) => {

    const [pTicker, setWLTicker] = useState("");
    const [pName, setWLName] = useState("");
    const [pStock, setPStock] = useState([]);
    const [pC, setPC] = useState([]);
    const [pQuantity, setPQuantity] = useState([]);
    const [pAvg, setPAvg] = useState([]);
    const [pTotal, setPTotal] = useState(0);

    const [buyModalState, setBuyModalState] = useState(false);
    const [sellModalState, setSellModalState] = useState(false);
    const [wallet,setWallet] = useState(0);

    const handleBuy = async()=> {
        const getWallet = await axios.get(apiCallURL+'/stocks/wallet')
        setWallet(getWallet.data)
    }

    const handleSell = async() => {
        const getWallet = await axios.get(apiCallURL+'/stocks/wallet')
        setWallet(getWallet.data)
    }



    useEffect(() => {
        console.log(pDB.pDB.ticker)
        setWLTicker(pDB.pDB.ticker)
        setWLName(pDB.pDB.companyName)
        setPQuantity(pDB.pDB.quantity)
        setPAvg(pDB.pDB.avgCostPSh)

        const fetchData = async(ticker) => {
            const getStockData = await axios.get(apiCallURL+'search/stock/'+ticker)
            const getWallet = await axios.get(apiCallURL+'/stocks/wallet')
            console.log(getWallet.data)
            setWallet(getWallet.data)
            setPStock(getStockData.data)
            console.log(getStockData.data)
        }
        console.log(pDB.pDB.ticker)
        fetchData(pDB.pDB.ticker)
        // console.log(wlStock)
    }, [pDB])

    useEffect(() => {
        setPC(pStock.c)
    },[pStock])


    return (
        <>
            <Card
                bg="light"
                text='dark'
                style={{ width: '90%'}}
                className="mx-auto my-2"
            >      
            <Card.Header><h4>{pTicker}</h4><h6>{pName}</h6></Card.Header>  
            <Card.Body>
                <Row>
                    <Col>
                        <Row><Card.Text>Quantity: </Card.Text></Row>
                        <Row><Card.Text>Avg. Cost / Share: </Card.Text></Row>
                        <Row><Card.Text>Total Cost: </Card.Text></Row>
                    </Col>
                    <Col>
                        <Row><Card.Text>{pQuantity} </Card.Text></Row>
                        <Row><Card.Text>{pAvg}</Card.Text></Row>
                        <Row><Card.Text>{Math.round(pQuantity*pAvg)}</Card.Text></Row>
                    </Col>
                    <Col>
                        <Row><Card.Text>Change: </Card.Text></Row>
                        <Row><Card.Text>Current Price: </Card.Text></Row>
                        <Row><Card.Text>Market Value: </Card.Text></Row>
                    </Col>
                    <Col>
                        <Row><Card.Text> </Card.Text></Row>
                        <Row><Card.Text>{pC}</Card.Text></Row>
                        <Row><Card.Text>{Math.round(pC*pQuantity)}</Card.Text></Row>
                    </Col>
                </Row>
                </Card.Body>
                <Card.Footer>
                        {buyModalState ? <BuyStockModal 
                            closeModal={()=>setBuyModalState(false)} 
                            isOpen={buyModalState} 
                            handleSubmit={handleBuy}
                            currentPrice={pC}
                            stock={pDB.pDB ? pDB.pDB : {
                                "ticker": pTicker,
                                "name": pName,
                                "costprice": 0,
                                "quantity": 0
                            }}
                            wallet={wallet}
                        /> : null}  

                        {sellModalState ? <SellStockModal 
                            closeModal={()=>setSellModalState(false)} 
                            isOpen={sellModalState} 
                            handleSubmit={handleSell}
                            currentPrice={pC}
                            stock={pDB.pDB}
                            wallet={wallet}
                        /> : null}

                </Card.Footer>
            </Card>
        </>
    );
}

export default PortfolioCard;