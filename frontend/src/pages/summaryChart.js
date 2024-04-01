import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts/highstock';

import {useData} from '../DataContext'

const SummaryChart = () => {
    const {
        tickerSymbol, setTickerSymbol,
        dynamicColor, setDynamicColor,
        pData, setPData,
        hours, setHours,
        hourPrice, setHourPrice,
    } = useData();

    var fetchData = {
        chart: {
              type: 'line',
              backgroundColor: '#f5f5f5',
          },
          title: {
              text: `${tickerSymbol} Hourly Price Variation`,
              align: 'center'
          },
          xAxis: {
            type: 'datetime',
            categories: hours,
            tickInterval: 5,
            tickWidth: 1, // Set the tick line width
            tickLength: 10, // Set the length of the tick marks
            tickColor: '#666',
        },
        plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2
          }
      },
          yAxis: {
            title: {
                text: '' 
            },
            opposite: true 
          },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle',
              enabled: false 
          },
          series: [{
              data: hourPrice,
              color: dynamicColor,
              marker: {
                enabled: false 
            }
          }],
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      legend: {
                          layout: 'horizontal',
                          align: 'center',
                          verticalAlign: 'bottom'
                      }
                  }
              }]
          }
      };

  return(
    <div>
        <HighchartsReact highcharts={Highchart} options={fetchData} />
    </div>
  )
}

export default SummaryChart;
  
  
  
  
  