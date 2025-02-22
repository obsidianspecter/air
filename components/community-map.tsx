"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export function CommunityMap() {
  const [iframeKey, setIframeKey] = useState(0)
  const [loading, setLoading] = useState(true)

  const refreshMap = () => {
    setLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🗺 Community Air Quality Map (Chennai, Tamil Nadu)</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <p style={{ textAlign: "center", marginBottom: "8px" }}>Loading map...</p>
        )}
        <iframe
          key={iframeKey}
          // Chennai Coordinates: 13.0827° N, 80.2707° E
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.245530724982!2d80.2707!3d13.0827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267401f25e929%3A0xe58c0c0645c8f50b!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1708596147596!5m2!1sen!2sin"
          style={{ width: "100%", height: "300px", border: "none" }}
          title="Community Air Quality Map - Chennai, Tamil Nadu"
          onLoad={() => setLoading(false)}
        />
        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Button onClick={refreshMap}>Refresh Map</Button>
        </div>
      </CardContent>
    </Card>
  )
}
