"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export function EmergencyContacts() {
  const [hospitals, setHospitals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hospitalList = [
    "Apollo Hospital, Greams Road",
    "Fortis Malar Hospital, Chennai",
    "Kauvery Hospital, Luz Church Road",
    "Rajiv Gandhi Government General Hospital, Opp. Chennai Central",
    "Sankara Nethralaya, College Road"
  ]

  const findNearbyHospitals = () => {
    setLoading(true)
    setTimeout(() => {
      setHospitals(hospitalList)
      setLoading(false)
    }, 1000) // Simulated delay
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>🏥 Emergency Contacts & Nearby Hospitals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Emergency Contacts:</h3>
          <p>Local Emergency: 911</p>
          <p>Poison Control: 1-800-222-1222</p>
        </div>
        <Button onClick={findNearbyHospitals} disabled={loading}>
          {loading ? "Finding hospitals..." : "Find Nearby Hospitals"}
        </Button>
        {error && <p className="mt-2 text-red-600">{error}</p>}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Nearby Hospitals:</h3>
          {hospitals.length > 0 ? (
            <ul>
              {hospitals.map((hospital, index) => (
                <li key={index}>{hospital}</li>
              ))}
            </ul>
          ) : (
            !loading && <p>Click the button to find nearby hospitals</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
