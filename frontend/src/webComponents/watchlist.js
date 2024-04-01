import React, { useState } from 'react';
import { useData } from '../DataContext';
import Card from 'react-bootstrap/Card';

const WatchListCard = () => {
    const {
        watchlistData, setWatchlistData,
        wlTicker, setWLTicker,
        wlName, setWLName,

        watchlistUpdater,
    } = useData();
    watchlistUpdater();
    return (
        <>
      {watchlistData.map((item,idx) => (
        <Card
          bg="light"
          text='dark'
          style={{ width: 600}}
          className="mx-auto"
        >
          <Card.Header>Header</Card.Header>
          <Card.Body>
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