"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Mic, Send, X } from "lucide-react"
import { findFAQMatch, getAirQualityAdvice, getHealthAdvice } from "@/utils/chatbot-utils"

type Message = { role: "user" | "assistant"; content: string }
type SensorData = { pm25: number; humidity: number; temperature: number; heartRate: number; spO2: number }

export function Chatbot({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [latestData, setLatestData] = useState<SensorData | null>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  let ws = useRef<WebSocket | null>(null)

  // Auto-scroll on new messages
  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  // WebSocket connection handling
  useEffect(() => {
    const connectWebSocket = () => {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
      const host = process.env.NEXT_PUBLIC_WEBSOCKET_HOST || window.location.hostname
      const port = process.env.NEXT_PUBLIC_WEBSOCKET_PORT || "81"

      ws.current = new WebSocket(`${protocol}//${host}:${port}`)

      ws.current.onopen = () => console.log("Connected to ESP8266")
      ws.current.onmessage = (event) => setLatestData(JSON.parse(event.data))
      ws.current.onerror = (error) => console.error("WebSocket error:", error)
      ws.current.onclose = () => setTimeout(connectWebSocket, 5000)
    }

    connectWebSocket()
    return () => ws.current?.close()
  }, [])

  // Handles sending messages
  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")

    const lowerInput = input.toLowerCase()

    // Predefined Responses
    const responses = {
      "air quality advice": latestData ? getAirQualityAdvice(latestData.pm25) : "No air quality data available.",
      "health advice": latestData ? getHealthAdvice(latestData.heartRate, latestData.spO2) : "No health data available.",
      "sensor data": latestData
        ? `PM2.5: ${latestData.pm25.toFixed(2)} µg/m³
          Humidity: ${latestData.humidity.toFixed(1)}%
          Temperature: ${latestData.temperature.toFixed(1)}°C
          Heart Rate: ${latestData.heartRate.toFixed(0)} BPM
          SpO2: ${latestData.spO2.toFixed(1)}%`
        : "No sensor data available."
    }

    if (findFAQMatch(input)) {
      setMessages([...newMessages, { role: "assistant", content: findFAQMatch(input) }])
      return
    }

    for (const key in responses) {
      if (lowerInput.includes(key)) {
        setMessages([...newMessages, { role: "assistant", content: responses[key as keyof typeof responses] }])
        return
      }
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await response.json()
      setMessages([...newMessages, { role: "assistant", content: data.message.content }])
    } catch (error) {
      console.error("Error:", error)
      setMessages([...newMessages, { role: "assistant", content: "Error fetching response. Try again." }])
    }
  }

  // Handles voice input
  const handleVoiceInput = useCallback(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.")
      return
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.onstart = () => setIsListening(true)
      recognitionRef.current.onend = () => setIsListening(false)
      recognitionRef.current.onresult = (event: any) => setInput(event.results[0][0].transcript)
    }

    recognitionRef.current.start()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 right-4 w-[22rem] h-[500px] bg-background border border-border rounded-lg shadow-lg flex flex-col"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Air Quality Assistant</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] p-2 rounded-lg ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input Field */}
      <div className="p-4 border-t flex items-center space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleVoiceInput} variant="outline" size="icon">
          <Mic className={`h-4 w-4 ${isListening ? "text-red-500 animate-pulse" : ""}`} />
        </Button>
        <Button onClick={handleSend} variant="default" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
