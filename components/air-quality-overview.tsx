"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { AirQualityComparison } from "./air-quality-comparison"

type SensorData = {
  pm25: number
  humidity: number
  temperature: number
  heartRate: number
  spO2: number
  timestamp: number
}

export function AirQualityOverview() {
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [latestData, setLatestData] = useState<SensorData | null>(null)

  useEffect(() => {
    // Generate realistic mock data for Chennai
    const generateChennaiData = () => ({
      pm25: 30 + Math.random() * 50, // PM2.5 fluctuates between 30-80 µg/m³
      humidity: 60 + Math.random() * 25, // Humidity between 60-85%
      temperature: 26 + Math.random() * 10, // Temperature between 26-36°C
      heartRate: 65 + Math.random() * 15, // Heart rate in a normal range
      spO2: 94 + Math.random() * 4, // SpO2 between 94-98%
      timestamp: Date.now(),
    })

    const initialData = Array.from({ length: 30 }, generateChennaiData)
    setSensorData(initialData)
    setLatestData(initialData[initialData.length - 1])

    // Update data dynamically every 2 seconds
    const interval = setInterval(() => {
      const newEntry = generateChennaiData()

      setSensorData((prevData) => {
        const updatedData = [...prevData.slice(1), newEntry] // Keep last 30 data points
        setLatestData(newEntry)
        return updatedData
      })
    }, 2000)

    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const getAirQualityStatus = (pm25: number) => {
    if (pm25 <= 12) return { status: "Good", color: "text-green-500" }
    if (pm25 <= 35) return { status: "Moderate", color: "text-yellow-500" }
    if (pm25 <= 55) return { status: "Unhealthy for Sensitive Groups", color: "text-orange-500" }
    if (pm25 <= 150) return { status: "Unhealthy", color: "text-red-500" }
    if (pm25 <= 250) return { status: "Very Unhealthy", color: "text-purple-500" }
    return { status: "Hazardous", color: "text-pink-500" }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🌱 Air Quality Overview (Chennai, Live)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6 text-lg">
            <div>PM2.5: <span className="font-semibold">{latestData?.pm25.toFixed(2) || "N/A"} µg/m³</span></div>
            <div>Humidity: <span className="font-semibold">{latestData?.humidity.toFixed(1) || "N/A"}%</span></div>
            <div>Temperature: <span className="font-semibold">{latestData?.temperature.toFixed(1) || "N/A"}°C</span></div>
            <div>Heart Rate: <span className="font-semibold">{latestData?.heartRate.toFixed(0) || "N/A"} BPM</span></div>
            <div>SpO2: <span className="font-semibold">{latestData?.spO2.toFixed(1) || "N/A"}%</span></div>
            <div className={`font-semibold ${latestData ? getAirQualityStatus(latestData.pm25).color : ""}`}>
              Status: {latestData ? getAirQualityStatus(latestData.pm25).status : "N/A"}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">📊 Real-time Sensor Data</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()} 
                />
                <YAxis />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
                <Legend />
                <Line type="monotone" dataKey="pm25" stroke="#8884d8" name="PM2.5" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="temperature" stroke="#ffcc00" name="Temperature" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="heartRate" stroke="#ff6666" name="Heart Rate" dot={false} strokeWidth={2} />
                <Line type="monotone" dataKey="spO2" stroke="#42a5f5" name="SpO2" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <AirQualityComparison />
    </div>
  )
}
