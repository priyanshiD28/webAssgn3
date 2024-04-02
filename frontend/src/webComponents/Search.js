import { Box, Tab, Tabs} from "@mui/material"; 
import axios from "axios";
import React, { useEffect, useState } from "react"; 
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClear } from "react-icons/md";
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {Spinner} from "react-bootstrap";
import {useData} from '../DataContext';
import AlertMessage from "./AlertMessage";
import '../index.js';
import apiCallURL from "../index.js";



function Search () {
    const [searchInput, setSearchInput] = useState("");
    const [autoCompleteData, setAutoCompleteData] = useState([]);
    const [autoCompleteDataBoolean, setAutoCompleteDataBoolean ] = useState(false);
    const [spinnerBoolean, setSpinnerBoolean ] = useState(false);
    const [alertBool, setAlertBool] = useState(false);
    const [loadBool, setLoadBool] = useState(false);
    var autoCompAPI = '';
    
    const {
        searchQuery, setSearchQuery
    } = useData();

    useEffect (() => {
        const fetchData = async () => {
            setSpinnerBoolean(true);
            setAutoCompleteDataBoolean(false)
            autoCompAPI = await axios.get(apiCallURL+'search/autocomplete/'+searchInput)
            setSpinnerBoolean(false);
            setAutoCompleteData(autoCompAPI.data.result);
            setAutoCompleteDataBoolean(true)
        }
        if (searchInput != '') {
            fetchData();

        }
    },[searchInput])

    const navigate = useNavigate();
    // const [query, setQuery] = useState("");

    const handleChange = (e) => {
        //e.preventDefault();
        setAlertBool(false)
        setSearchInput(e.target.value);
    };
    
    const submitButton = async(ticker) => {
        setLoadBool(true)
        if(!ticker || ticker=='' || ticker.length==0) {
            setAlertBool(true)
        }
        else{
            await dataUpdater(searchInput)
            navigate('/search/'+searchInput);
        }
        setLoadBool(false)
    }

    const clearButton = () => {
        navigate('/search/home');
        setSearchQuery('');
    }

    const autoSearch = (value) => {
        console.log(value);
    }
    
    const {
        dataUpdater
    } = useData();


    return(
        <div>
            <Stack direction="vertical" gap={5}>
            <Row xs sm md lg="25" className="mx-auto">
            <InputGroup className="border border-4 border-primary rounded-pill mx-auto" value={searchInput}>
                    <Form.Control
                    className="border-0 rounded-pill" placeholder="Enter Stock Ticker Symbol"
                    aria-label="Stock ticker with two button addons"
                    onChange={handleChange}
                    value={searchInput}
                    />
                    <Button variant="border-0 " onClick={()=>{
                        submitButton(searchInput)
                        console.log('SUBMIT',searchInput)
                        }}><AiOutlineSearch /></Button>
                    <Button variant="border-0" type="reset" onClick={()=>{clearButton()}}><MdClear /></Button>
            </InputGroup>
                
            <Container className = "autoDropdown shadow-sm rounded bg-white mb-5">
                {
                    spinnerBoolean ? <Spinner /> : (<span></span>)
                }
                {
                       
                    autoCompleteDataBoolean ?  autoCompleteData
                    .filter(item => item.type === 'Common Stock' && !item.symbol.includes('.'))
                    .map((item)=>(
                        <Container className="py-2" style={{ cursor: 'pointer' }} onClick={()=>submitButton(item.symbol)}>
                            {item.symbol} | {item.description}
                        </Container>
                    ))
                    :
                    <span></span>
                }
            </Container>
            </Row>

            {loadBool ? <Spinner /> : (<span></span>)}

            {alertBool ?
            <Container>
                {AlertMessage({isSuccess: false, isFail: true, setDisplay:true, message:"Please Enter a Valid Ticker"})}
            </Container> : null}

        </Stack>
        </div>
    )
}

export default Search;

