"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

export function Settings() {
  const [profile, setProfile] = useState("general")

  const applyProfile = () => {
    alert(`Profile applied: ${profile}`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>⚙ Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Select value={profile} onValueChange={setProfile}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="asthma">Asthma-Friendly</SelectItem>
              <SelectItem value="copd">COPD-Optimized</SelectItem>
              <SelectItem value="pediatric">Pediatric Safe</SelectItem>
              <SelectItem value="senior">Senior Care</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={applyProfile}>Apply Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}

