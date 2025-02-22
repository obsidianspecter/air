"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
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
import { motion } from "framer-motion" // Animation library

// Generate random predictive maintenance data
const generateMockData = () => {
  const now = Date.now()
  return Array.from({ length: 10 }, (_, i) => ({
    timestamp: now - (10 - i) * 86400000, // Each data point represents a day
    degradation: Math.random() * 50 + 50, // Random degradation %
  }))
}

export function Maintenance() {
  const [maintenanceInfo, setMaintenanceInfo] = useState("Predictive maintenance data loading...")
  const [data, setData] = useState(generateMockData())
  const [isMaintenanceScheduled, setIsMaintenanceScheduled] = useState(false)

  useEffect(() => {
    // Simulate predictive data updates every 10 seconds
    const interval = setInterval(() => {
      setData((prevData) => [
        ...prevData.slice(-9),
        { timestamp: Date.now(), degradation: Math.random() * 50 + 50 },
      ])
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const scheduleMaintenance = () => {
    const newDate = new Date(Date.now() + 7 * 86400000).toDateString()
    setMaintenanceInfo(`✅ Maintenance scheduled for ${newDate}`)

    // Apply maintenance effect by resetting degradation level
    setData((prevData) => [
      ...prevData.slice(-9),
      { timestamp: Date.now(), degradation: 80 + Math.random() * 10 }, // Reset degradation to a better state
    ])

    setIsMaintenanceScheduled(true)

    // Reset animation effect after 2 seconds
    setTimeout(() => setIsMaintenanceScheduled(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🔧 Maintenance Status</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.p
          className="mb-4"
          animate={{ opacity: [0, 1], scale: [0.9, 1] }}
          transition={{ duration: 0.5 }}
        >
          {maintenanceInfo}
        </motion.p>

        <motion.div whileTap={{ scale: 0.9 }}>
          <Button onClick={scheduleMaintenance} className="mb-4">
            Schedule Maintenance
          </Button>
        </motion.div>

        {/* Maintenance Prediction Graph */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">📊 Equipment Degradation Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
              />
              <YAxis domain={[50, 100]} />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
              <Legend />
              <Line
                type="monotone"
                dataKey="degradation"
                stroke={isMaintenanceScheduled ? "#4CAF50" : "#ff4d4d"} // Change color on maintenance
                dot={isMaintenanceScheduled} // Show dots when maintenance is scheduled
                strokeWidth={isMaintenanceScheduled ? 3 : 2} // Highlight stroke
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
