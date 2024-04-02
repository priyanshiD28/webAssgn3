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

    const [pResult, setPResult] = useState([]);
    
    useEffect(()=>{
        const getPStocks = async () =>{
            try{
                const pData = await axios.get(apiCallURL+'stocks/portfolio');

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
      },[])

    

    return(
        <>
            <Container className='mx-auto' sx={{xs:12 , md: 8, lg: 8}}>
                <h3>My Portfolio</h3>
                {
                    wlLoading ? (<Spinner animation="border" variant="primary" />) :
                    (wlEmpty ? 
                        <Container>
                            {wlResult.map((item,idx) => (
                                <PortfolioCards pDB={item}></PortfolioCards>
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
