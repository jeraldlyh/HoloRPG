import React, { useEffect } from 'react'
import Chart from 'chart.js'

export default function Graph() {
    useEffect(() => {
        const canvas = document.getElementById("chart").getContext('2d')
        window.myLine = new Chart(canvas, {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                responsive: true,
            }
        })
    }, [])

    return (
        <div className="w-11/12 mx-auto mt-10">
            <canvas id="chart" />
        </div>
    )
}


