#include <ESP8266WiFi.h>
#include <Wire.h> 
#include <WiFiClient.h>
#include <ArduinoJson.h>

const int ldrPin = A0;
const int laserPin = 17;
const int RELAY_PIN = 5;
const int rainPin = 4;

int valve_status = 0;
int fog_status = 0;
int rain = 0;
int ldrStatus = 0;
int fog_status_before = 0;
int isFogTime = 0;
int toSend = 0;

String apiKey = "Y563W1GMENH8M9Z3";
const char *ssid = "Wono_Home";
const char *pass = "19451945OK";
//const char *ssid = "Sy";
//const char *pass = "12345678";
const char* server = "api.thingspeak.com";

WiFiClient client;

void setup() {
  Serial.begin(115200);
  
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  pinMode(ldrPin, INPUT);
  pinMode(rainPin,INPUT);
  pinMode(laserPin , OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  
  digitalWrite(laserPin , HIGH);
}

void loop() {
  ldrStatus = analogRead(ldrPin);
  //int rain = digitalRead(rainPin);

  StaticJsonDocument<1000> doc;
  deserializeJson(doc, Serial);
  JsonObject root = doc.as<JsonObject>(); // get the root object
  auto error = deserializeJson(doc, Serial);
  if (error)
  {
    return;
  }

  Serial.println();
  Serial.println("JSON received and parsed");
  serializeJsonPretty(doc, Serial);
  Serial.println();
  rain = doc["rain"];

  if (ldrStatus < 860) {
    fog_status = 1;
    digitalWrite(RELAY_PIN, HIGH);
  } else {
    fog_status = 0;
    Serial.print(fog_status_before);
    Serial.print(fog_status);
    Serial.println("");
      
    if(fog_status_before == 1){
      if(isFogTime < 240){
        Serial.println("MENGALIR");
        digitalWrite(RELAY_PIN, LOW);  
        valve_status = 1;
        isFogTime++;
      } else {
        Serial.println("TIDAK MENGALIR");
        digitalWrite(RELAY_PIN, HIGH);
        fog_status = 0;
        valve_status = 0;
      }
    }
  }
  
  fog_status_before = fog_status;
    Serial.print("Hujan: ");
    Serial.print(rain);
    Serial.print(", Fog: ");
    Serial.print(fog_status);
    Serial.print(", Valve: ");
    Serial.print(valve_status);
    Serial.print(", LDR: ");
    Serial.print(ldrStatus);

  Serial.println("");
  Serial.println(toSend);
  delay(5000);

  //180

  if(toSend == 3){
    if (client.connect(server, 80)) {
      String postStr = apiKey;
      postStr += "&field1=";
      postStr += String(rain);
      postStr += "&field2=";
      postStr += String(fog_status);
      postStr += "&field3=";
      postStr += String(valve_status);
      client.print("POST /update HTTP/1.1\n");
      client.print("Host: api.thingspeak.com\n");
      client.print("Connection: close\n");
      client.print("X-THINGSPEAKAPIKEY: " + apiKey + "\n");
      client.print("Content-Type: application/x-www-form-urlencoded\n");
      client.print("Content-Length: ");
      client.print(postStr.length());
      client.print("\n\n");
      client.print(postStr);
      Serial.print(". Send to Thingspeak.");
    }
    
    client.stop();
    Serial.println(" Waiting...");
  
    toSend = 0;
  } else {
    toSend++;  
  }
  
}
