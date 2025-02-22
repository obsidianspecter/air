"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { motion } from "framer-motion"
import { Sparkles, RefreshCcw, Bell, CheckCircle } from "lucide-react"
import { Button } from "./ui/button"

// Simulated air quality data generator
const generateAirQualityData = () => {
  const now = Date.now()
  return Array.from({ length: 10 }, (_, i) => ({
    timestamp: now - (10 - i) * 3600000, // Each point represents an hour
    AQI: Math.random() * 50 + 50, // Random AQI values between 50 and 100
    PM25: Math.random() * 20 + 10, // PM2.5 levels
    CO2: Math.random() * 300 + 400, // CO2 concentration
  }))
}

export function HealthInsights() {
  const [healthTip, setHealthTip] = useState("🔍 Analyzing air quality trends...")
  const [data, setData] = useState(generateAirQualityData())
  const [isHighlight, setIsHighlight] = useState(false)
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    const healthTips = [
      "🌬 Increase ventilation for fresher air.",
      "🛑 Avoid high pollution areas when possible.",
      "🍃 Indoor plants can help purify air naturally.",
      "💧 Stay hydrated to combat air dryness.",
      "⚡ Use an air purifier to maintain healthy air quality."
    ]

    const interval = setInterval(() => {
      setHealthTip(healthTips[Math.floor(Math.random() * healthTips.length)])
      setIsHighlight(true)
      setTimeout(() => setIsHighlight(false), 1500)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkAlerts = () => {
      const latestAQI = data[data.length - 1].AQI
      if (latestAQI > 90) {
        setAlerts((prev) => [...prev, "🚨 High AQI detected! Consider staying indoors."])
      }
    }

    checkAlerts()
  }, [data])

  const refreshData = () => {
    setData(generateAirQualityData())
  }

  return (
    <Card className="p-4">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="text-yellow-400 animate-pulse" size={24} />
        <CardTitle>💡 Personalized Health Insights</CardTitle>
        <Button onClick={refreshData} variant="outline" className="ml-auto">
          <RefreshCcw size={16} className="mr-2" /> Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <motion.p
          className={`text-lg font-medium ${isHighlight ? "text-green-500" : "text-white"}`}
          animate={{ opacity: [0, 1], scale: [0.95, 1] }}
          transition={{ duration: 0.5 }}
        >
          {healthTip}
        </motion.p>

        {/* Alerts Section */}
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">🔔 Alerts</h2>
          <ul className="space-y-2">
            {alerts.length === 0 ? (
              <li className="flex items-center text-green-500">
                <CheckCircle className="mr-2" size={18} /> No active alerts
              </li>
            ) : (
              alerts.map((alert, index) => (
                <li key={index} className="flex items-center text-red-500">
                  <Bell className="mr-2" size={18} /> {alert}
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Air Quality Trend Graph */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📊 Air Quality Index (AQI) Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleTimeString()}
              />
              <YAxis domain={[50, 100]} label={{ value: "AQI", angle: -90, position: "insideLeft" }} />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey="AQI"
                stroke="#FFA500"
                strokeWidth={2}
                dot={{ r: isHighlight ? 6 : 4, fill: isHighlight ? "#FFD700" : "#FFA500" }}
              />
              <Line type="monotone" dataKey="PM25" stroke="#00BFFF" strokeWidth={2} />
              <Line type="monotone" dataKey="CO2" stroke="#FF4500" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
