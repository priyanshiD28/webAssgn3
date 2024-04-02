import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import WatchlistCard from '../webComponents/WatchListCard';
import apiCallURL from '../index.js';

import Spinner from 'react-bootstrap/Spinner';
import { Button, Card, Container , Col} from 'react-bootstrap';


const WatchlistPage = () =>{

    const [wlLoading, setWLLoading] = useState(true);
    const [wlEmpty, setWLEmpty] = useState(false);

    const [wlResult, setWLResult] = useState([]);
    const [check, setCheck] = useState(0);
    
    const deleteStock = async (ticker) =>{
        const singleWLData = await axios.delete(apiCallURL+'watchlist/'+ticker)
        .then(singleWLData => {
            console.log('Stock Deleted');
            setWLResult([])
            setCheck(check+1)
        })
        .catch(error => {
            console.log("Error Deleting Stock")
        })
    }
    
    useEffect(()=>{
        const getWLStocks = async () =>{
            try{
                const wlData = await axios.get(apiCallURL+'watchlist');

                if(wlData.status == 200){
                    
                    if(wlData.data.length == 0)
                    {
                        setWLEmpty(false)
                    }
                    else{
                        setWLEmpty(true)
                    }
                    setWLResult(wlData.data)
                }
                else {
                    setWLEmpty(false)
                    setWLLoading(false)
                }
                setWLLoading(false)
              }
              catch(error){
                console.log("Error fetching Watchlist Data")
                setWLEmpty(false)
                setWLLoading(false)
              }
            }

        getWLStocks()
        console.log(wlEmpty)
        console.log(wlResult)
      },[check])

    

    return(
        <>
            <Container className='mx-auto' sx={{xs:12 , md: 8, lg: 8}}>
                <h3>My Watchlist</h3>
                {
                    wlLoading ? (<Spinner animation="border" variant="primary" />) :
                    (wlEmpty ? 
                        <Container>
                            {wlResult.map((item,idx) => (
                                <WatchlistCard wlDB={item} deleteFunction= {(e) => {
                                    e.preventDefault()
                                    deleteStock(item.ticker)
                                }} ></WatchlistCard>
                            ))}
                        </Container>:
                        <Card className='bg-warning text-center color-dark'>
                            Currently you don't have any stock in your watchlist
                        </Card>
                        )
                }
            </Container>
        </>
    )
}

export default WatchlistPage;
