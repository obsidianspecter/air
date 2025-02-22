"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

// Define the type for an air quality data point.
type AirQualityData = {
  timestamp: number
  openweathermap: number
  iqair: number
  breezometer: number
  airnow: number
  purpleair: number
  waqi: number
}

// Function to generate dynamic mock data.
const generateMockData = (): AirQualityData => ({
  timestamp: Date.now(),
  openweathermap: Math.random() * 50 + 10,  // Simulating PM2.5 values (10-60)
  iqair: Math.random() * 50 + 12,
  breezometer: Math.random() * 50 + 15,
  airnow: Math.random() * 50 + 18,
  purpleair: Math.random() * 50 + 20,
  waqi: Math.random() * 50 + 22,
})

// Generate initial mock data (30 data points, 1 minute apart).
const initialMockData: AirQualityData[] = Array.from({ length: 30 }, (_, i) => ({
  ...generateMockData(),
  timestamp: Date.now() - (30 - i) * 2000, // Spaced every 2 seconds for a live effect
}))

// Define metric mapping for dropdown selection.
const metricMapping: Record<
  string,
  { label: string; dataKey: keyof AirQualityData; stroke: string }
> = {
  pm25: { label: "PM2.5", dataKey: "openweathermap", stroke: "#8884d8" },
  aqi: { label: "AQI", dataKey: "airnow", stroke: "#ff8042" },
}

export function AirQualityComparison() {
  const [data, setData] = useState<AirQualityData[]>(initialMockData)
  const [selectedMetric, setSelectedMetric] = useState<string>("pm25")

  useEffect(() => {
    // Simulate live data updates every 2 seconds
    const interval = setInterval(() => {
      const newDataPoint = generateMockData()

      setData((prevData) => {
        const updatedData = [...prevData.slice(1), newDataPoint] // Keep last 30 points
        return updatedData
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const currentMetric = metricMapping[selectedMetric] || metricMapping.pm25

  return (
    <Card>
      <CardHeader>
        <CardTitle>🌎 Air Quality Comparison (Live)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger>
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pm25">PM2.5</SelectItem>
              <SelectItem value="aqi">AQI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(unixTime) => new Date(unixTime).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey={currentMetric.dataKey}
                stroke={currentMetric.stroke}
                name={currentMetric.label}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No data available yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
