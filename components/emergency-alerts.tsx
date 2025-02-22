"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

interface AlertLogEntry {
  message: string;
  time: string;
}

type AlertVariant = "default" | "destructive";
type AlertType = "oxygen" | "temperature" | "connectivity";

export function EmergencyAlerts() {
  const [alertState, setAlertState] = useState<{
    message: string;
    variant: AlertVariant;
    activeTime: number;
    active: boolean;
  }>({
    message: "✅ No active alerts",
    variant: "default",
    activeTime: 0,
    active: false,
  })
  const [alertLog, setAlertLog] = useState<AlertLogEntry[]>([])

  // Blink effect for active alerts
  const blinkEffect = alertState.active ? "animate-pulse bg-red-800" : ""

  // Timer: update activeTime every second if an alert is active.
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (alertState.active) {
      timer = setInterval(() => {
        setAlertState(prev => ({
          ...prev,
          activeTime: prev.activeTime + 1
        }))
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [alertState.active])

  // Simulate an emergency alert
  const triggerEmergencyAlert = (type: AlertType) => {
    let msg = ""
    switch (type) {
      case "oxygen":
        msg = "🚨 Critical: Oxygen levels dangerously low!"
        break
      case "temperature":
        msg = "🚨 Alert: Temperature out of range!"
        break
      case "connectivity":
        msg = "🚨 Warning: Connectivity issues detected!"
        break
      default:
        msg = "🚨 Emergency! Unknown alert triggered!"
    }

    setAlertState({
      message: msg,
      variant: "destructive",
      activeTime: 0,
      active: true,
    })

    setAlertLog(prev => [...prev, { message: msg, time: new Date().toLocaleTimeString() }])

    setTimeout(() => clearAlert(), 10000)
  }

  // Clear alert
  const clearAlert = () => {
    setAlertState({
      message: "✅ No active alerts",
      variant: "default",
      activeTime: 0,
      active: false,
    })
  }

  return (
    <Card className={`p-4 transition-all duration-300 ${blinkEffect}`}>
      <CardHeader>
        <CardTitle>🚨 Emergency Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Alert variant={alertState.variant} className="text-white">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Alert Status</AlertTitle>
            <AlertDescription>
              {alertState.message}
              {alertState.active && (
                <span> (Active for {alertState.activeTime}s)</span>
              )}
            </AlertDescription>
          </Alert>
        </motion.div>

        {/* Alert Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Button variant="destructive" onClick={() => triggerEmergencyAlert("oxygen")}>
            🚨 Simulate Oxygen Alert
          </Button>
          <Button variant="destructive" onClick={() => triggerEmergencyAlert("temperature")}>
            🌡 Simulate Temperature Alert
          </Button>
          <Button variant="destructive" onClick={() => triggerEmergencyAlert("connectivity")}>
            📡 Simulate Connectivity Alert
          </Button>
          <Button variant="outline" onClick={clearAlert}>✅ Clear Alert</Button>
        </div>

        {/* Emergency Log */}
        {alertLog.length > 0 && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-800">
            <h3 className="text-lg font-semibold mb-2">📜 Alert History</h3>
            <ul className="max-h-40 overflow-auto">
              {alertLog.map((log, index) => (
                <li key={index} className="text-sm text-gray-300">
                  {log.time} - {log.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
