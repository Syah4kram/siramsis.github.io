#include <SoftwareSerial.h>
#include <ArduinoJson.h>

#define rainPin A0
int isRain = 0;
int rainval2 = 0;

void setup() {
  Serial.begin(115200);
  while (!Serial) continue;
}

StaticJsonDocument<1000> doc;

void loop(){
  int rainval = analogRead(rainPin);
  if(rainval2 == 0) {
  rainval2 = rainval;
  }
  int diff = rainval2 - rainval;
  if(rainval < 450) {
    isRain = 1;
  } else {
    isRain = 0;  
  }
  Serial.println(rainval);
  doc["rain"] = isRain;
  if (Serial.available() > 0){
    serializeJson(doc, Serial);
  }
  serializeJsonPretty(doc, Serial);
  int rainval2 = rainval;
  delay (1000);
}
