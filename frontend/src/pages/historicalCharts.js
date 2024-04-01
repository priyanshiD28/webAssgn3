import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts/highstock';

import HC_more from 'highcharts/highcharts-more';
import HC_indicatorsAll from 'highcharts/indicators/indicators-all';
import HC_vbp from 'highcharts/indicators/volume-by-price';

import {useData} from '../DataContext'

HC_more(Highchart);
HC_indicatorsAll(Highchart);
HC_vbp(Highchart);

<head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js"></script>
<script src="https://code.highcharts.com/modules/stock.js"></script>
<script src="https://code.highcharts.com/highstock.js"></script>
</head>

const HistoricalCharts = () => {
    const {
        searchQuery, setSearchQuery,
        historicalCh, setHistoricalCharts, 
        ohlc, setOhlc, 
        vol, setVol, 
        chartData, setChartData,
    } = useData()

    var fetchData = {  

        chart: {
            height: 700, // or whatever height you prefer
            backgroundColor: '#f6f6f6'
          },
          
          rangeSelector: {
            selected: 2,
            buttons: [
              { type: 'month', count: 1, text: '1m' },
              { type: 'month', count: 1, text: '3m' },
              { type: 'month', count: 1, text: '6m' },
              { type: 'ytd',text: 'YTD', title: 'View year to date' },
              { type: 'year', count: 1, text: '1y' },
              { type: 'all', text: 'All' }
            ],
            inputEnabled: true
          },
        
        title: {
          text: `${searchQuery} Historical`
        },
        subtitle: {
          text: 'With SMA and Volume by Price technical indicators'
        },
        xAxis: {
            type: 'datetime',
            labels: {
                format: '{value: %e %b}'
            }
          },
        yAxis: [{
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
            enabled: true
          }
        }, {
          labels: {
            align: 'right',
            x: -3
          },
          title: {
            text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
        }],
        series: [{
            type: 'candlestick',
            name: searchQuery,
            id: `${searchQuery}-ohlc`, // unique id for ohlc series
            zIndex: 2,
            data: ohlc
          }, {
            type: 'column',
            name: 'Volume',
            id: 'volume',
            data: vol,
            yAxis: 1
          }, {
            type: 'vbp',
            linkedTo: `${searchQuery}-ohlc`, // linking to ohlc series
            params: { volumeSeriesID: 'volume' },
            dataLabels: { enabled: false },
            zoneLines: { enabled: false }
          }, {
            type: 'sma',
            linkedTo: `${searchQuery}-ohlc`, // linking to ohlc series
            zIndex: 1,
            marker: { enabled: false }
            }]
        };
    
        return (
            <div>
                <HighchartsReact highcharts={Highchart} options={fetchData} constructorType={'stockChart'}/>
              </div>
        )
}

export default HistoricalCharts;