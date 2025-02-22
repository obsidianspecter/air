# Smart Air Purifier Dashboard

## Overview

The **Smart Air Purifier Dashboard** is a real-time air quality monitoring and visualization platform. It integrates multiple air quality data sources, providing users with insights into air pollution levels and trends. The dashboard features an intuitive UI, interactive graphs, emergency alerts, health insights, and a chatbot for user queries.

This project aims to help users make informed decisions about indoor and outdoor air quality, leveraging real-time data and futuristic visualizations.

## Features

- **Real-time Air Quality Monitoring**: Displays real-time AQI, PM2.5, and other air pollution metrics.
- **Multi-Source Data Integration**: Uses OpenWeatherMap, IQAir, BreezoMeter, AirNow, PurpleAir, and WAQI data.
- **Interactive Graphs**: Line charts, bar charts, and pie charts for trend analysis.
- **Emergency Alerts**: Notifies users of hazardous air conditions.
- **Health Insights**: Provides recommendations based on air quality.
- **Smart Home Integration**: Compatible with IoT-based air purifiers.
- **Dark Mode & Futuristic UI**: Aesthetic and modern interface.
- **Community Map**: View pollution levels in different areas.
- **Chatbot Support**: AI-powered assistant for user queries.
- **Customizable Dashboard**: Users can modify widgets and views.

## Tech Stack

### Frontend:

- **Next.js** (React framework)
- **TypeScript** (Strongly-typed JavaScript)
- **Tailwind CSS** (Styling & UI components)
- **Recharts** (Data visualization)
- **ShadCN UI** (UI components)

### Backend / API:

- **Air Quality APIs** (Live data sources)
- **Node.js** (Server-side operations if extended)

### Hardware (For IoT Integration):

- **Arduino Mega** (Microcontroller)
- **NodeMCU ESP8266** (Wi-Fi Module)
- **MAX30100 Pulse Oximeter Sensor** (Health monitoring sensor)

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18+ recommended)
- **Git**
- **pnpm/yarn/npm** (Package manager)

### Clone the Repository

```bash
git clone https://github.com/obsidianspecter/air.git
cd air
```

### Install Dependencies

Using `pnpm` (recommended):

```bash
pnpm install
```

Using `yarn`:

```bash
yarn install
```

Using `npm`:

```bash
npm install
```

or npm install --legacy-peer-deps

### Run the Development Server

```bash
pnpm dev
# OR
yarn dev
# OR
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
# OR
yarn build
# OR
npm run build
```

## How This Project Works

### Data Handling

This project retrieves **real-time air quality data** from various sources. Mock data was initially used to simulate realistic environmental conditions, ensuring proper visualization before API integration.

Each data provider reports different AQI standards, so the app normalizes values for consistency.

### Graphs & Charts

- **Live Line Chart**: Tracks air quality variations over time.
- **Multi-Source Comparison Graph**: Displays multiple data sources simultaneously.
- **Bar Chart**: Breaks down pollutant levels.
- **Pie Chart**: Represents overall AQI category distribution.

### Why We Used Mock Data Initially

1. **API Limitations**: Some APIs have request limits, and mock data helped test UI interactions without overloading APIs.
2. **Simulating Extreme Cases**: Ensured that emergency alerts trigger correctly for hazardous conditions.
3. **Frontend Testing**: Allowed us to develop without waiting for API responses.

### Real-World Applications

- **Personal Health Monitoring**: Helps individuals with respiratory issues (asthma, allergies, etc.).
- **Smart Home Automation**: Connects to air purifiers and HVAC systems.
- **Urban Planning & Research**: Analyzes pollution trends for city planning.
- **Community Awareness**: Users can report local air quality conditions.

## Future Enhancements

- **Machine Learning-Based Predictions**: Forecasting air quality trends.
- **Mobile App Version**: Cross-platform support.
- **IoT Device Control**: Automated air purifier activation.
- **Voice Assistant Integration**: Smart home voice commands.

## Contributors

- **ObsidianSpecter** (GitHub: [@obsidianspecter](https://github.com/obsidianspecter))

## License

This project is licensed under the MIT License.

