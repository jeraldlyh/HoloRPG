import React, { useEffect, useState } from "react"
import _ from "lodash"
import moment from "moment"
import { connect } from "react-redux"
import ReactApexChart from "react-apexcharts"
import { getStockData } from "../store/actions/Stock"

function Stock(props) {
    const [candleData, setCandleData] = useState([])
    const [volumeData, setVolumeData] = useState([])

    const populateVolume = (response) => {
        const data = _.map(response.data, data => (
            {
                x: moment(data.date, "YYYY-MM-DD").toDate(),
                y: data.volume
            }
        ))

        if (data.length !== 50) {
            const difference = 50 - data.length
            var startDate = moment(data[0].x, "YYYY-MM-DD")
            var endDate = moment(data[0].x, "YYYY-MM-DD").add(difference, "days")

            while (startDate.add(1, "days").diff(endDate) < 0) {
                data.push({
                    x: startDate.clone().toDate(),
                    y: 0
                })
            }
        }
        return data
    }

    const populateCandles = (response) => {
        const data = _.map(response.data, data => (
            {
                x: moment(data.date, "YYYY-MM-DD").toDate(),
                y: [data.open, data.open, data.close, data.close]
            }
        ))

        if (data.length !== 50) {
            const difference = 50 - data.length
            var startDate = moment(data[0].x, "YYYY-MM-DD")
            var endDate = moment(data[0].x, "YYYY-MM-DD").add(difference, "days")

            while (startDate.add(1, "days").diff(endDate) < 0) {
                data.push({
                    x: startDate.clone().toDate(),
                    y: [0, 600, 400, 0]
                })
            }
        }
        return data
    }

    useEffect(() => {
        props.getStockData("Bitcoin").then(response => {
            console.log(response)

            const populatedCandleData = populateCandles(response)
            setCandleData(populatedCandleData)

            const populatedVolumeData = populateVolume(response)
            setVolumeData(populatedVolumeData)
        })
    }, [])

    const candleStick = {
        series: [{
            data: candleData
        }],
        options: {
            chart: {
                type: "candlestick",
                height: 290,
                id: "candles",
                toolbar: {
                    autoSelected: "pan",
                    show: false
                },
                zoom: {
                    enabled: false
                },
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#3C90EB',
                        downward: '#DF7D46'
                    }
                }
            },
            xaxis: {
                type: 'datetime'
            }
        },
    }


    return (
        <div>
            <ReactApexChart options={candleStick.options} series={candleStick.series} type="candlestick" height={290} />
        </div>
    )
}

const mapDispatchToProps = () => {
    getStockData
}

export default connect(null, { getStockData })(Stock)