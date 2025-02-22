#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include "MAX30100_PulseOximeter.h"

#define REPORTING_PERIOD_MS 1000

const char* ssid = "192.168.146.245";
const char* password = "root";

WebSocketsServer webSocket = WebSocketsServer(81);
PulseOximeter pox;

float temperature = 0;
float humidity = 0;
float pm25 = 0;

uint32_t tsLastReport = 0;

void onBeatDetected() {
    Serial.println("Beat!");
}

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
    switch(type) {
        case WStype_DISCONNECTED:
            Serial.printf("[%u] Disconnected!\n", num);
            break;
        case WStype_CONNECTED:
            {
                IPAddress ip = webSocket.remoteIP(num);
                Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
            }
            break;
        case WStype_TEXT:
            Serial.printf("[%u] get Text: %s\n", num, payload);
            break;
    }
}

void setup() {
    Serial.begin(115200);
    
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    
    webSocket.begin();
    webSocket.onEvent(webSocketEvent);

    if (!pox.begin()) {
        Serial.println("FAILED");
        for(;;);
    } else {
        Serial.println("SUCCESS");
    }

    pox.setOnBeatDetectedCallback(onBeatDetected);
}

void loop() {
    webSocket.loop();
    pox.update();
    
    if (millis() - tsLastReport > REPORTING_PERIOD_MS
    webSocket.loop();
    pox.update();
    
    if (millis() - tsLastReport > REPORTING_PERIOD_MS) {
        // Read sensor data
        temperature = readTemperature();  // Implement this function to read from your temperature sensor
        humidity = readHumidity();        // Implement this function to read from your humidity sensor
        pm25 = readPM25();                // Implement this function to read from your PM2.5 sensor

        // Create JSON object
        StaticJsonDocument<200> doc;
        doc["temperature"] = temperature;
        doc["humidity"] = humidity;
        doc["pm25"] = pm25;
        doc["heartRate"] = pox.getHeartRate();
        doc["spO2"] = pox.getSpO2();
        doc["timestamp"] = millis();

        // Serialize JSON to string
        String jsonString;
        serializeJson(doc, jsonString);

        // Send data to all connected clients
        webSocket.broadcastTXT(jsonString);

        tsLastReport = millis();
    }
}

void readTemperature() {
    // Implement temperature reading logic here
    // This is a placeholder, replace with actual sensor reading
    return random(20, 30);  // Returns a random value between 20 and 30
}

void readHumidity() {
    // Implement humidity reading logic here
    // This is a placeholder, replace with actual sensor reading
    return random(30, 70);  // Returns a random value between 30 and 70
}

void readPM25() {
    // Implement PM2.5 reading logic here
    // This is a placeholder, replace with actual sensor reading
    return random(0, 100);  // Returns a random value between 0 and 100
}

