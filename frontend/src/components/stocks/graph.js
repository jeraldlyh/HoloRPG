import React, { useEffect } from "react"
import { Line } from "react-chartjs-2"
import CardLight from "../cardLight"

const data = {
    labels: ["19 Jul", "20 Jul", "21 Jul", "22 Jul", "23 Jul", "24 Jul", "25 Jul"],
    datasets: [
      {
        data: [33, 53, 85, 41, 44, 65, 50], //add $ prefix
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      }
    ]
  }

export default function Graph(){
    return(
        <div className="Graph">
            <Line width="full" height="300" data ={data} 
                options={{ 
                    maintainAspectRatio: false,
                    legend:{
                        display:false, //remove dataset label at top
                        labels:{
                            fontColor:"#D2D2D2" //change font colour (& axis colours)
                        }
                    } 
                }} />
        </div>
    )
}

