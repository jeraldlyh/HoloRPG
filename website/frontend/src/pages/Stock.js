import React, { useEffect, useState } from "react"
import _ from "lodash"
import moment from "moment"
import { connect } from "react-redux"
import ReactApexChart from "react-apexcharts"
import { getStockData } from "../store/actions/Stock"
import { seriesData } from "./dummyStock"


function Stock(props) {
    const [priceData, setPriceData] = useState([])
    const [datesData, setDatesData] = useState([])


    const populateData = (response) => {
        const tempPriceData = []
        const tempDatesData = []

        response.data.forEach(data => {
            tempPriceData.push(data.price)
            tempDatesData.push(data.date)
        })

        if (response.data.length !== 30) {
            const difference = 30 - response.data.length
            
            var startDate = moment(tempDatesData[0], "YYYY-MM-DD")
            var endDate = startDate.clone().add(difference, 'days')
            console.log("start", startDate, "end", endDate)

            while (startDate.add(1, 'days').diff(endDate) < 0) {
                tempDatesData.push(startDate.clone().format("YYYY-MM-DD"))
            }
        }
        console.log(tempDatesData)
        setPriceData(tempPriceData)
        setDatesData(tempDatesData)
    }

    useEffect(() => {
        props.getStockData("Bitcoin").then(response => {
            populateData(response)
        })
    }, [])

    const candleStick = {
        series: [{
            name: 'XXX',
            data: priceData
        }],
        options: {
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
                text: 'Stock Price of XXX',
                align: 'middle',
                style: {
                    // insert text styles here
                }
            },
            labels: datesData,
            xaxis: {
                type: 'datetime',
                labels: {
                    format: 'dd MMM yyyy',
                    showDuplicates: false
                }
            },
            tooltip: {
                style: {
                    background: black,
                    color: black,
                },
                x: {
                    show: false
                }
            },
            noData: {
                text: "There's no data for XXX",
                align: "center",
                verticalAlign: "middle",
                style: {
                    // insert text styles here
                }
            }
        },
    }

    return (
        <div>
            <ReactApexChart options={candleStick.options} series={candleStick.series} type="area" height={350} />
        </div>
    )
}

const mapDispatchToProps = () => {
    getStockData
}

export default connect(null, { getStockData })(Stock)