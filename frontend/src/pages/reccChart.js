import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import {useData} from '../DataContext';


const ReccCharts = () => {
    const {
        searchQuery, setSearchQuery,
        recommendation, setRecommendation,
        strongBuy, setStrongBuy,
        buy, setBuy,
        hold, setHold,
        sell, setSell,
        strongSell, setStrongSell,
        insightPeriod, setInsightPeriod
    } = useData()

    var fetchData = {  

        chart: {
            type: 'column',
            backgroundColor: '#f5f5f5'
        },
        title: {
            text: 'Recommendation Trends',
            align: 'center'
        },
        xAxis: {
            categories: insightPeriod
        },
        yAxis: {
            min: 0,
            title: {
            text: '#Analysis'
            },
            stackLabels: {
            enabled: true
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
            
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
            }
        },
        series: [{
            name: 'Strong Buy',
            data: strongBuy,
            color: '#195f32'
        }, {
            name: 'Buy',
            data: buy,
            color: '#23af50'
        }, {
            name: 'Hold',
            data: hold,
            color:'#af7d28'
        },  {
            name: 'Sell',
            data: sell,
            color:'#f05050'
        },  {
            name: 'Strong Sell',
            data: strongSell,
            color:'#732828'
        }]}
  
    
        return (
            <div>
                <HighchartsReact highcharts={Highchart} options={fetchData} /></div>
        )
}

export default ReccCharts;