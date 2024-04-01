import { Box, Tab, Tabs} from "@mui/material"; 
import React, { useState } from "react"; 
import {useNavigate} from 'react-router-dom';
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

import HistoricalCharts from "../pages/historicalCharts";
import ReccCharts from "../pages/reccChart";
import SurpriseCharts from "../pages/surpriseChart";
import SummaryChart from "../pages/summaryChart";
import InsightTable from '../webComponents/insiderTable';
import SearchResultArea from "./searchResultArea";
import Search from "./Search";
import GridExample from "./newsCard";
import SummaryTab from "./summaryTab";
import {useData} from '../DataContext';



function DisplayTab () {
    const [val, setVal] = useState('one'); 
    const navigate = useNavigate();
    // const [query, setQuery] = useState("");

    const {
        dataUpdater,
        searchQuery, setSearchQuery, 
    } = useData();
    // const showHistChart = async(ticker) => {
    //     console.log('tab pressed')
    //     // await dataUpdater(searchInput);
    // }
    // const showReccChart = async(ticker) => {
    //     console.log('tab pressed')
    //     // await dataUpdater(searchInput);
    // }

    const handleTab = (e, newVal) => { 
        setVal(newVal); 
    }; 

    return(
        <div>
            <Stack direction="vertical" gap={5}>
            <Row xs sm md lg="20" className="mx-auto">
                <Search />
            </Row>
                <center className="Results"> 
                    <SearchResultArea />
                    <div> 
                        <TabContext value={val}>
                        <Box sx={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', maxWidth: 900, marginTop: 10}}> 
                            <Tabs 
                                value={val} 
                                onChange={handleTab} 
                                textColor="primary"
                                indicatorColor="secondary"
                                variant="scrollable"
                                scrollButtons={true}
                                allowScrollButtonsMobile
                            > 
                                <Tab value="one" label="Summary" sx={{minWidth:100, width:200, textTransform: 'capitalize', xs:"1", md:"2",lg:"3"}} /> 
                                <Tab value="two" label="Top News" sx={{minWidth:100, width:200, textTransform: 'capitalize', xs:"1", md:"2",lg:"3"}} /> 
                                <Tab value="three" label="Charts" sx={{minWidth:100, width:200, textTransform: 'capitalize', xs:"1", md:"2",lg:"3"}} /> 
                                <Tab value="four" label="Insights" sx={{minWidth:100, width:200, textTransform: 'capitalize', xs:"1", md:"2",lg:"3"}} />
                            </Tabs>
                        </Box>
                        <TabPanel value="one" index={0}>
                                <Col xs md lg="10">
                                    <Row>
                                        <Col><SummaryTab /></Col>
                                        <Col xs md lg="5">
                                            <SummaryChart />
                                        </Col>
                                    </Row>
                                </Col>
                            </TabPanel>
                            <TabPanel value="two" index={1}>
                                <div>
                                    <GridExample />
                                </div>
                            </TabPanel>
                            <TabPanel value="three" index={2}>
                                <div>
                                <Box>
                                    <Col xs md lg="10">
                                        <HistoricalCharts />
                                    </Col>
                                </Box>
                                    
                                </div>
                            </TabPanel> 
                            <TabPanel value="four" index={3}>
                                <div className="mx-auto">
                                    <InsightTable />
                                    <Container>
                                        <Row className="justify-content-md-center">
                                            <Col xs md lg="5"><ReccCharts /></Col>
                                            <Col xs md lg="1"></Col>
                                            <Col xs md lg="5">
                                            <SurpriseCharts />
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </TabPanel> 
                        </TabContext>
                    </div> 
                </center>

            </Stack>
        </div>
    )
}

export default DisplayTab;

