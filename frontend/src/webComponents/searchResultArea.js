import React from 'react';
import {useData} from '../DataContext';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import moment from 'moment';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import {FaStar} from "react-icons/fa";
import {CiStar} from "react-icons/ci";


const SearchResultArea = () => {

    const {
        tickerSymbol, setTickerSymbol,
        compName, setCompanyName,
        exchName, setExchangeName,
        compLogo, setCompanyLogo,

        stockQuote, setStockQuote,
        latestPrice, setLatestPrice,
        changedPrice, setChangePrice,
        percChangedPrice, setPerChangePrice,
        timeStamp, setTimeStamp,
    } = useData();

    const addToWL =  async(ticker,companyName) => {
        console.log("Adding To Watchlist")
    }

    const marketStatus = (unixTime) => {
        const currTime = Math.floor(Date.now() / 1000); 
        const secDiff = currTime - unixTime;
        const minDiff = secDiff / 60;
        return minDiff <=5;
    }

    const colorChange = (item) => {
        return (item > 0 ? 'text-success' : 'text-danger')
    }

    const formatDateTime = (unixTime) => {
        const date = new Date(unixTime * 1000); // Convert Unix timestamp to milliseconds
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
        const day = ('0' + date.getDate()).slice(-2);
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        return (year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds);

    }

    const getCurrentDate = (separator='-') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let minutes = newDate.getMinutes();
        let seconds = newDate.getSeconds();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date} ${hour}:${minutes}:${seconds}`
    }

    const currDate = getCurrentDate();


    return (
        // <Container>
        //     <Row>
        //         {tickerSymbol}
        //     </Row>
        //     <Row>
        //         {compName}
        //     </Row>
        //     <Row>
        //         {exchName}
        //     </Row>
        //     <Row>
        //         {compLogo}
        //     </Row>
        // </Container>
        <div className='companyInfo'>
            <div className='container my-5 text-center'>
                <div className='row align-items-center'>
                    <div className='col-4'>
                        <h2>{tickerSymbol}</h2> 
                        <Button variant='btn-primary-outline' onClick={()=> addToWL(tickerSymbol, compName)}><CiStar /></Button>
                        <Button variant='btn-primary-outline'><FaStar /></Button>
                        <h5>{compName}</h5>
                        <h6>{exchName}</h6>
                        {/* <button type="button" className="btn btn-success" onClick={() => handleBuyModalShow({companySymbol: tickerSymbol ,currentPrice: latestPrice, moneyInWallet:"100",companyName: compName })}>Buy</button> */}
                        <button type="button" className="btn btn-danger">Sell</button>
                    </div>
                    <div className='col-4'>
                        <div className='img-fluid mx-auto d-block'>
                            <img className='logo' src={compLogo} alt="Not visible" width={100}></img>
                        </div>
                    </div>
                    <div className='col-4'>
                        <h2 className={colorChange(changedPrice)}>{latestPrice}</h2>
                        <h4 className={colorChange(changedPrice)} >
                        {changedPrice > 0 ?  (
                            <BiSolidUpArrow />
                            ) : (
                            <BiSolidDownArrow />
                            )}{changedPrice}
                        ({percChangedPrice})</h4>
                        <p CL>{currDate}</p>
                    </div>
                </div>
                <div className='my-3 row align-items-center'>
                    <h5>
                    {
                        marketStatus(timeStamp) ? 
                        <h5 className='text-success'>
                            "Market is open"
                        </h5>
                        :
                        <h5 className='text-danger'>
                            Market is closed on {formatDateTime(timeStamp)} 
                        </h5>
                    }
                    </h5>
                </div>
            </div>
        </div>
    );

}

export default SearchResultArea;