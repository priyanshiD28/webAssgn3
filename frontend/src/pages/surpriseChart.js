import HighchartsReact from 'highcharts-react-official';
import Highchart from 'highcharts';
import {useData} from '../DataContext';


const SurpriseCharts = () => {
    const {
        searchQuery, setSearchQuery,
        earningChart, setEarningChart,
        actual, setActual,
        estimate, setEstimate,
        surprise, setSurprise,
        period, setPeriod,
    } = useData()

    var xLabel = period.map(function(period, index) {
      
        return period + '<br> Surprise: ' + surprise[index];
    });

    var fetchData = {  
        
        chart: {
            type: 'spline',
            backgroundColor: '#f5f5f5',
            events: {
              render: function() {
                var chart = this;
                chart.customLine = chart.renderer.path(['M', chart.plotLeft, chart.plotTop + chart.plotHeight + 60, 'L', chart.plotLeft + chart.plotWidth, chart.plotTop + chart.plotHeight + 60])
                    .attr({
                      'stroke-width': 2,
                      stroke: 'black'
                    })
                    .add();
                  
                
              }
            }
          },
          title: {
            text: 'Historical EPS Surprises',
            align: 'center'
          },
          xAxis: {
            categories: xLabel, 
            title: {
              text: ''
            },
            lineWidth: 2,
          },
          yAxis: {
            title: {
              text: 'Quarterly EPS'
            }
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          series: [{
            name: 'Actual',
            data: actual
          }, {
            name: 'Estimate',
            data: estimate
        }]
    }
        return (
            <div>
                <HighchartsReact highcharts={Highchart} options={fetchData} /></div>
        )
}

export default SurpriseCharts;