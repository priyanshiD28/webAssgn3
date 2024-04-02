import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import PortfolioCards from './portfolioCard.js';
import apiCallURL from '../index.js';

import Spinner from 'react-bootstrap/Spinner';
import { Button, Card, Container , Col} from 'react-bootstrap';


const PortfolioPage = () =>{

    const [pLoading, setPLoading] = useState(true);
    const [pEmpty, setPEmpty] = useState(false);
    const [check, setCheck] = useState(0);

    const [pResult, setPResult] = useState([]);
    const [walletResult, setWalletResult] = useState([]);
    const [walletVal, setWalletVal] = useState(0);

    const rerender = () =>{
        setCheck(check+1)    
    }
    
    useEffect(()=>{
        const getPStocks = async () =>{
            try{
                const pData = await axios.get(apiCallURL+'stocks/portfolio');
                const pWallet = await axios.get(apiCallURL+'stocks/wallet');
                setWalletResult(pWallet.data)

                if(pData.status == 200){
                    
                    if(pData.data.length == 0)
                    {
                        setPEmpty(false)
                    }
                    else{
                        setPEmpty(true)
                    }
                    setPResult(pData.data)
                }
                else {
                    setPEmpty(false)
                    setPLoading(false)
                }
                setPLoading(false)
              }
              catch(error){
                console.log("Error fetching Watchlist Data")
                setPEmpty(false)
                setPLoading(false)
              }
            }

        getPStocks()
    },[check])

    useEffect(() => {
        walletResult.map(item => setWalletVal(item.amount))
    },[walletResult])



    

    return(
        <>
            <Container className='mx-auto' sx={{xs:12 , md: 8, lg: 8}}>
                <h3>My Portfolio</h3>
                <h5>Money in Wallet: ${walletVal}</h5>
                {
                    pLoading ? (<Spinner animation="border" variant="primary" />) :
                    (pEmpty ? 
                        <Container>
                            {pResult.map((item,idx) => (
                                // console.log(item),
                                <PortfolioCards pDB={item} rerenderFunction={(e)=> {
                                    e.preventDefault();
                                    rerender();
                                }}></PortfolioCards>
                            ))}
                        </Container>:
                        <Card className='bg-warning text-center color-dark'>
                            Currently you don't have any stock in your portfolio
                        </Card>
                        )
                }
            </Container>
        </>
    )
}

export default PortfolioPage;
