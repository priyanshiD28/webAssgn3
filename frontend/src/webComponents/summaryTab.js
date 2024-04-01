import React, { useState } from 'react';
import {NavLink, Navigate} from 'react-router-dom';
import {useData} from '../DataContext';
import Container from '@mui/material/Container';
import { Row } from 'react-bootstrap';
import {Col} from 'react-bootstrap';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



function SummaryTab() {
    const {
        ipoDate, setIPODate,
        industryType, setIndustryType,
        compWP, setCompanyWP,

        highPrice, setHighPrice,
        lowPrice, setLowPrice,
        openPrice, setOpenPrice,
        prevClosePrice, setPrevClosePrice,

        compPeers, setCompanyPeers,

        dataUpdater,

    } = useData();

    const [peerPath, setPeerPath] = useState('');

    const newCompany = async(ticker) => {
        
        setPeerPath(ticker)
        console.log(peerPath)
        await dataUpdater(ticker)
        
    };

    return (
        <Container className='mb-4'>
            <Row >
                <Col md="auto">
                    <Row>High Price: {highPrice}</Row>
                    <Row>Low Price: {lowPrice}</Row>
                    <Row>Open Price: {openPrice}</Row>
                    <Row>Prev. Close: {prevClosePrice}</Row>
                </Col>
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Col md="auto">
                <Row className="justify-content-md-center"><h5>About the Company</h5></Row>
                <Row className="justify-content-md-center">IPO Start Date: {ipoDate}</Row>
                <Row className="justify-content-md-center">Industry: {industryType}</Row>
                <Row className="justify-content-md-center">Webpage: {compWP}</Row>
                <Row className="justify-content-md-center">Company Peers:</Row>
                <Row className="justify-content-md-center">
                    <div>
                        {compPeers.map((item, idx) => (
                            <NavLink to={`/search/${item}`} onClick={()=>newCompany(item)}>{item}, </NavLink>
                        ))}
                    </div>
                </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default SummaryTab;