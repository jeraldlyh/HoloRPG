import React, { useEffect } from "react"
import { Line } from "react-chartjs-2"
import CardLight from "../cardLight"

const data = {
    labels: ["19 Jul", "20 Jul", "21 Jul", "22 Jul", "23 Jul", "24 Jul", "25 Jul"],
    datasets: [{
        label: "Price",
        data: [33, 53, 3, 41, 44, 65, 50], //add $ prefix
        fill: true,
        color: "#000000",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
    }]
}

const options = {
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
        }],
        yAxes: [
            {
                gridLines: {
                    color: "white"
                },
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    labelString: "Price",
                    display: true
                }
            }]
    }
    // legend:{
    //     display:false, //remove dataset label at top
    //     labels:{
    //         fontColor:"orange" //change font colour (& axis colours)
    //     }
    // }  
}

export default function Graph() {
    return (
        <div className="overflow-y-auto">
            <Line width="full" height="300" data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: "Stock Price"
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                color: "white"
                            }
                        }],
                        xAxes: [{

                            
                        }]
                    }
                }
                }>
            </Line>
        </div>
    )
}

