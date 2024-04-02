import React, {createContext, useContext, useEffect, useState} from 'react'
import axios from 'axios';
import './index.js'
import apiCallURL from './index.js';

const DataContext = createContext()

export const useData = () => useContext(DataContext);

export const DataReceiver = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [compProfile, setCompanyProfile] = useState([]);
    const [tickerSymbol, setTickerSymbol] = useState("");
    const [compName, setCompanyName] = useState("");
    const [exchName, setExchangeName] = useState("");
    const [ipoDate, setIPODate] = useState("");
    const [industryType, setIndustryType] = useState("");
    const [compWP, setCompanyWP] = useState("");
    const [compLogo, setCompanyLogo] = useState("");

    const [newsData, setNewsData] = useState([]);
    
    const [historicalCh, setHistoricalCharts] = useState([]);
    const [ohlc, setOhlc] = useState([]);
    const [vol, setVol] = useState([]);
    const [chartData, setChartData] = useState([]);

    const [recommendation, setRecommendation] = useState([]);
    const [strongBuy, setStrongBuy] = useState([]);
    const [buy, setBuy] = useState([]);
    const [hold, setHold] = useState([]);
    const [sell, setSell] = useState([]);
    const [strongSell, setStrongSell] = useState([]);
    const [insightPeriod, setInsightPeriod] = useState([]);

    const [earningChart, setEarningChart] = useState([]);
    const [actual, setActual] = useState([]);
    const [estimate, setEstimate] = useState([]);
    const [surprise, setSurprise] = useState([]);
    const [period, setPeriod] = useState([]);

    const [insiderTable, setInsiderTable] = useState({});
    const [posMspr, setPosMspr] = useState(0);
    const [negMspr, setNegMspr] = useState(0);
    const [posChange, setPosChange] = useState(0);
    const [negChange, setNegChange] = useState(0);

    const [stockQuote, setStockQuote] = useState([]);
    const [latestPrice, setLatestPrice] = useState(0);
    const [changedPrice, setChangePrice] = useState(0);
    const [percChangedPrice, setPerChangePrice] = useState(0);
    const [highPrice, setHighPrice] = useState(0);
    const [lowPrice, setLowPrice] = useState(0);
    const [openPrice, setOpenPrice] = useState(0);
    const [prevClosePrice, setPrevClosePrice] = useState(0);
    const [timeStamp, setTimeStamp] = useState(0);

    const [compPeers, setCompanyPeers] = useState([]);

    const[pData, setPData] = useState([]);
    const[hours, setHours] = useState([]);
    const[hourPrice, setHourPrice] = useState([]);

    const [dynamicColor, setDynamicColor] = useState('red');

    const [watchlistData, setWatchlistData] = useState([]);

    const dataUpdater = async (ticker) => {
        setSearchQuery(ticker)
        console.log(searchQuery, ticker)
        const companyprofile = await axios.get(apiCallURL+'search/company/'+ticker)
        const news = await axios.get(apiCallURL+'search/news/'+ticker) 
        const highChartsRes = await axios.get(apiCallURL+'search/charts/'+ticker)
        const recctrends = await axios.get(apiCallURL+'search/reccomendation/'+ticker)
        const earning = await axios.get(apiCallURL+'search/earnings/'+ticker)
        const insidersent = await axios.get(apiCallURL+'search/insidersentiment/'+ticker)
        const summChart = await axios.get(apiCallURL+'search/hourcharts/'+ticker)
        const stockquote = await axios.get(apiCallURL+'search/stock/'+ticker)
        const comppeer = await axios.get(apiCallURL+'search/peers/'+ticker)

        setCompanyProfile(companyprofile.data)
        setHistoricalCharts(highChartsRes.data.results)
        setRecommendation(recctrends.data)
        setEarningChart(earning.data)
        setNewsData(news.data)
        setInsiderTable(insidersent.data)
        setPData(summChart.data.results)
        setStockQuote(stockquote.data)
        setCompanyPeers(comppeer.data)
        //console.log(compPeers)
    };

    const watchlistUpdater = async() => {
        const wlData = await axios.get(apiCallURL+'stocks/watchlist');
        setWatchlistData(wlData.data)
    };

    

    // useEffect(() => {
    //     setWLTicker(watchlistData.ticker);
    //     setWLName(watchlistData.companyName);
    // },[watchlistData])

    useEffect(() => {
        if(stockQuote.d > 0) {
            setDynamicColor('green')
        }
        else{
            setDynamicColor('red')
        }
    },[stockQuote])


    useEffect(() => {
        setTickerSymbol(compProfile.ticker)
        setCompanyName(compProfile.name)
        setExchangeName(compProfile.exchange)
        setIPODate(compProfile.ipo)
        setIndustryType(compProfile.finnhubIndustry)
        setCompanyWP(compProfile.weburl)
        setCompanyLogo(compProfile.logo)
    },[compProfile])

    useEffect(() => {
        setOhlc(historicalCh.map(item => [
            item.t,
            item.o,
            item.h,
            item.l,
            item.c
        ]))

        setVol(historicalCh.map(item => [
            item.t,
            item.v
        ]))

        setChartData({ohlc,vol});

    },[historicalCh])

    useEffect(()=>{
        setStrongBuy(
          recommendation.map(item => item.strongBuy)
        );
        setBuy(
          recommendation.map(item => item.buy)
        );
        setHold(
          recommendation.map(item => item.hold)
        );
        setSell(
          recommendation.map(item => item.sell)
        );
        setStrongSell(
          recommendation.map(item => item.strongSell)
        );
        setInsightPeriod(
          recommendation.map(item => item.period.slice(0,7))
        );
      }, [recommendation])

      useEffect(()=>{
        setActual(
            earningChart.map(item => item.actual)
          
        );
        
        setEstimate(
            earningChart.map(item => item.estimate)
        );
    
        setPeriod(
            earningChart.map(item => item.period)
        );
    
        setSurprise(
            earningChart.map(item => item.surprise)
        )
    },[earningChart])

    useEffect(()=>{
        let newPosMspr = 0;
        let newNegMspr = 0;
        let newPosChange = 0;
        let newNegChange = 0;
        insiderTable.data && insiderTable.data.forEach(item => {
            if (item.mspr > 0) {
            newPosMspr += item.mspr;
            } else {
            newNegMspr += item.mspr;
            }
            if (item.change > 0) {
            newPosChange += item.change;
            } else {
            newNegChange += item.change;
            }
        });
        setPosMspr(newPosMspr);
        setNegMspr(newNegMspr);
        setPosChange(newPosChange);
        setNegChange(newNegChange);      
    },[insiderTable])

    useEffect(() => {
        setLatestPrice(stockQuote.c);
        setChangePrice(stockQuote.d);
        setPerChangePrice(stockQuote.dp);
        setHighPrice(stockQuote.h);
        setLowPrice(stockQuote.l);
        setOpenPrice(stockQuote.o);
        setPrevClosePrice(stockQuote.pc);
        setTimeStamp(stockQuote.t);
    },[stockQuote])
    
    useEffect(()=>{
        setHours(
          pData.map(item => new Date(item.t).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            timeZone: 'America/Los_Angeles'
          }))
        )
        setHourPrice(
          pData.map(item => item.c)
        )
      },[pData])

    const dataVal = {
        searchQuery, setSearchQuery,
        tickerSymbol, setTickerSymbol,
        compName, setCompanyName,
        exchName, setExchangeName,
        ipoDate, setIPODate,
        industryType, setIndustryType,
        compWP, setCompanyWP,
        compLogo, setCompanyLogo,

        newsData, setNewsData,

        historicalCh, setHistoricalCharts, 
        ohlc, setOhlc, 
        vol, setVol, 
        chartData, setChartData,

        recommendation, setRecommendation,
        strongBuy, setStrongBuy,
        buy, setBuy,
        hold, setHold,
        sell, setSell,
        strongSell, setStrongSell,
        insightPeriod, setInsightPeriod,
        
        earningChart, setEarningChart,
        actual, setActual,
        estimate, setEstimate,
        surprise, setSurprise,
        period, setPeriod,

        insiderTable, setInsiderTable,
        posMspr, setPosMspr,
        negMspr, setNegMspr,
        posChange, setPosChange,
        negChange, setNegChange,

        stockQuote, setStockQuote,
        latestPrice, setLatestPrice,
        changedPrice, setChangePrice,
        percChangedPrice, setPerChangePrice,
        highPrice, setHighPrice,
        lowPrice, setLowPrice,
        openPrice, setOpenPrice,
        prevClosePrice, setPrevClosePrice,
        timeStamp, setTimeStamp,

        compPeers, setCompanyPeers,

        pData, setPData,
        hours, setHours,
        hourPrice, setHourPrice,

        dynamicColor, setDynamicColor,

        watchlistData, setWatchlistData,

        watchlistUpdater,
        dataUpdater,
    };

    return (
        <DataContext.Provider value = {dataVal}>
            {children}
        </DataContext.Provider>
    )
}