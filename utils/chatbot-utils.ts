type FAQ = {
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    question: "How do I change settings?",
    answer:
      "To change settings, go to the Settings section on the dashboard and select your desired profile. Click 'Apply Profile' to save your changes.",
  },
  {
    question: "What's the current air quality?",
    answer:
      "You can find the current air quality information in the Air Quality Overview section of the dashboard. It displays PM2.5 levels, humidity, temperature, and overall status.",
  },
  {
    question: "How often should I schedule maintenance?",
    answer:
      "It's recommended to schedule maintenance every 3-6 months, depending on usage. You can use the Maintenance section of the dashboard to schedule your next maintenance.",
  },
  {
    question: "What do I do in case of an emergency?",
    answer:
      "In case of an emergency, check the Emergency Alerts section for any active alerts. You can also find nearby hospitals and emergency contact information in the Emergency Contacts section.",
  },
  {
    question: "What do the heart rate and SpO2 readings mean?",
    answer:
      "The heart rate shows your current pulse in beats per minute (BPM). SpO2 is your blood oxygen saturation level, measured as a percentage. Normal SpO2 levels are usually above 95%.",
  },
]

export function getAirQualityAdvice(pm25: number): string {
  if (pm25 <= 12) {
    return "The air quality is good (PM2.5: " + pm25.toFixed(2) + " µg/m³). It's a great time for outdoor activities!"
  } else if (pm25 <= 35) {
    return (
      "The air quality is moderate (PM2.5: " +
      pm25.toFixed(2) +
      " µg/m³). Sensitive individuals should consider reducing prolonged outdoor exertion."
    )
  } else if (pm25 <= 55) {
    return (
      "The air quality is unhealthy for sensitive groups (PM2.5: " +
      pm25.toFixed(2) +
      " µg/m³). Consider staying indoors and running your air purifier."
    )
  } else if (pm25 <= 150) {
    return (
      "The air quality is unhealthy (PM2.5: " +
      pm25.toFixed(2) +
      " µg/m³). Avoid prolonged outdoor activities and use your air purifier indoors."
    )
  } else if (pm25 <= 250) {
    return (
      "The air quality is very unhealthy (PM2.5: " +
      pm25.toFixed(2) +
      " µg/m³). Stay indoors, close windows, and run your air purifier on high."
    )
  } else {
    return (
      "The air quality is hazardous (PM2.5: " +
      pm25.toFixed(2) +
      " µg/m³). Avoid all outdoor activities and stay indoors with air purifiers running."
    )
  }
}

export function getHealthAdvice(heartRate: number, spO2: number): string {
  let advice = "Based on your current readings:\n"

  if (heartRate < 60) {
    advice +=
      "Your heart rate is low. This could be normal if you're very fit or resting, but consult a doctor if you feel unwell.\n"
  } else if (heartRate > 100) {
    advice +=
      "Your heart rate is elevated. This could be due to exercise, stress, or other factors. If it persists at rest, consider consulting a doctor.\n"
  } else {
    advice += "Your heart rate is within a normal range.\n"
  }

  if (spO2 < 95) {
    advice +=
      "Your blood oxygen level is lower than normal. If this persists or you feel short of breath, please consult a healthcare professional.\n"
  } else {
    advice += "Your blood oxygen level is within a normal range.\n"
  }

  return advice
}

export function findFAQMatch(input: string): string | null {
  const lowercaseInput = input.toLowerCase()
  for (const faq of faqs) {
    if (lowercaseInput.includes(faq.question.toLowerCase())) {
      return faq.answer
    }
  }
  return null
}

