import React, { useState } from 'react';
import axios from 'axios';
import '../index.js'
import apiCallURL from '../index.js';

import { useData } from '../DataContext';
import Card from 'react-bootstrap/Card';
import ClearIcon from '@mui/icons-material/Clear';

const WatchListCard = () => {
    const {
        watchlistData, setWatchlistData,
        wlTicker, setWLTicker,
        wlName, setWLName,

        watchlistUpdater,
    } = useData();
    watchlistUpdater();

    const handleDeleteStock = (ticker) => {
        const delStock = axios.delete(apiCallURL+'stocks/watchlist'+ticker);
        watchlistUpdater();
    };

    return (
        <>
      {watchlistData.map((item,idx) => (
        <Card
          bg="light"
          text='dark'
          style={{ width: '80%'}}
          className="mx-auto my-2"
        >
          {/* <Card.Header>Header</Card.Header> */}
          <Card.Body>
            <ClearIcon onClick = {()=> handleDeleteStock(item.ticker)}></ClearIcon>
            <Card.Title>{item.ticker} </Card.Title>
            <Card.Text>
              {item.companyName}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
    );
}

export default WatchListCard;