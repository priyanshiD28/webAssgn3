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

const PortfolioCard = ({pDB}) => {

    const [pTicker, setPTicker] = useState("");
    const [pName, setPName] = useState("");
    const [pStock, setPStock] = useState([]);
    const [pC, setPC] = useState([]);
    const [pQuantity, setPQuantity] = useState([]);
    const [pAvg, setPAvg] = useState([]);
    const [pTotal, setPTotal] = useState(0);

    const [buyModalState, setBuyModalState] = useState(false);
    const [sellModalState, setSellModalState] = useState(false);
    const [wallet,setWallet] = useState(0);

    const handleBuy = async(stockQuantity, stockPrice)=> {
        const updatedWallet = wallet - (stockQuantity*stockPrice)
        const updatedQuantity = pDB.quantity + stockQuantity
        const updatedCostPrice = (pDB.costprice + stockPrice)/2
        axios.patch(apiCallURL+'stocks/wallet')
        .then ((patchWallet) =>
            {
                console.log("Wallet Updated")
                setWallet(patchWallet.amount)
            }
        )
        .catch((error) => {
            console.log("Error Updating Wallet: ", error)
        }
        )
        if(updatedQuantity!=0) {
            const newQuantity = await axios.patch(apiCallURL+'search/portfolio/'+pDB.ticker, {
                quantity: updatedQuantity,
                avgCostPSh: updatedCostPrice
            })
            if(newQuantity.status == 200) {
                // update portfolio page
            }
        }

    }

    const handleSell = async(stockQuantity, stockPrice) => {
        const updatedWallet = wallet + (stockQuantity*stockPrice)
        const updatedQuantity = pDB.quantity - stockQuantity
        axios.patch(apiCallURL+'stocks/wallet')
        .then ((patchWallet) =>
            {
                console.log("Wallet Updated")
                setWallet(patchWallet.amount)
            }
        )
        .catch((error) => {
            console.log("Error Updating Wallet: ", error)
        }
        )
        if(updatedQuantity!=0) {
            const newQuantity = await axios.patch(apiCallURL+'search/portfolio/'+pDB.ticker, {
                quantity: updatedQuantity
            })
            if(newQuantity.status == 200) {
                let newStockVal = pDB
                newStockVal.quantity = updatedQuantity
                // update portfolio page
            }
        }
        else {
            const newQuantity = await axios.delete(apiCallURL+'search/portfolio/'+pDB.ticker)
            if(newQuantity.status == 200) {
                //update portfolio page
            }
        }

    }



    useEffect(() => {
        console.log(pDB.ticker)
        setPTicker(pDB.ticker)
        setPName(pDB.companyName)
        setPQuantity(pDB.quantity)
        setPAvg(pDB.avgCostPSh)

        const fetchData = async(ticker) => {
            const getStockData = await axios.get(apiCallURL+'search/stock/'+ticker)
            const getWallet = await axios.get(apiCallURL+'stocks/wallet')
            // console.log(getWallet.data)
            setWallet(getWallet.data)
            setPStock(getStockData.data)
            // console.log(getStockData.data)
        }
        // console.log(pDB.ticker)
        fetchData(pDB.ticker)
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
                    <Button onClick={()=>{setBuyModalState(true)}} className='mx-1'>Buy</Button> 
                    <Button onClick={()=>{setSellModalState(true)}} className='mx-1 bg-danger border-0'>Sell</Button>
                        {buyModalState ? <BuyStockModal 
                            shutModal={()=>setBuyModalState(false)} 
                            modalOpenState={buyModalState} 
                            submitFunct={handleBuy}
                            currPrice={pC}
                            stock={pDB ? pDB : {
                                "ticker": pTicker,
                                "name": pName,
                                "costprice": 0,
                                "quantity": 0
                            }}
                            wallet={wallet}
                        /> : null}  

                        {sellModalState ? <SellStockModal 
                            shutModal={()=>setSellModalState(false)} 
                            modalOpenState={sellModalState} 
                            submitFunct={handleSell}
                            currPrice={pC}
                            stock={pDB}
                            wallet={wallet}
                        /> : null}

                </Card.Footer>
            </Card>
        </>
    );
}

export default PortfolioCard;