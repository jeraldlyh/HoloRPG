import React from "react"
import ReactApexChart from "react-apexcharts"

function Graph(){
    const series= [{
        name: "STOCK ABC",
        data: [series.monthDataSeries1.prices]
      }];
      const options= {
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        
        title: {
          text: 'Fundamental Analysis of Stocks',
          align: 'left'
        },
        subtitle: {
          text: 'Price Movements',
          align: 'left'
        },
        labels: series.monthDataSeries1.dates,
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          opposite: true
        },
        legend: {
          horizontalAlign: 'left'
        }
      }
    

    return(
        <div>
            <ReactApexChart 
            options={options} 
            series={series} 
            type="area" 
            height={300}/>
        </div>
    )
}

export default Graph;