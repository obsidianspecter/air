"use client"

import { useState, useEffect } from "react"
import { AirQualityOverview } from "./air-quality-overview"
import { Settings } from "./settings"
import { EmergencyAlerts } from "./emergency-alerts"
import { EmergencyContacts } from "./emergency-contacts"
import { CommunityMap } from "./community-map"
import { Maintenance } from "./maintenance"
import { HealthInsights } from "./health-insights"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { Mic, Moon, Sun, MessageCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Chatbot } from "./chatbot"

export function Dashboard() {
  const { setTheme, theme } = useTheme()
  const [voiceControlActive, setVoiceControlActive] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-16 py-6">
      <motion.header
        className="text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2">🌬 Smart Air Purifier Dashboard</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
          Your gateway to cleaner, safer air
        </p>
        <div className="flex justify-center space-x-4">
          <Button 
            onClick={() => {
              setVoiceControlActive(!voiceControlActive)
              alert("🎙 Voice control feature is under development!")
            }}
            variant="outline"
            aria-label="Toggle voice control"
          >
            <Mic className="mr-2 h-5 w-5" />
            Voice Control
          </Button>
          <Button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
            variant="outline" 
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </Button>
          <Button 
            onClick={() => setChatbotOpen(!chatbotOpen)} 
            variant="outline"
            aria-label="Open chatbot"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Chatbot
          </Button>
        </div>
      </motion.header>

      {[
        AirQualityOverview,
        Settings,
        EmergencyAlerts,
        EmergencyContacts,
        CommunityMap,
        Maintenance,
        HealthInsights
      ].map((Component, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        >
          <Component />
        </motion.div>
      ))}

      <AnimatePresence>
        {chatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Chatbot onClose={() => setChatbotOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
