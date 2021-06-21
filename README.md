# siramsis.github.io
Web App untuk monitoring penyiraman otomatis tanaman

**Wiring dari alat**

Arduino Nano:
- Raindrop Sensor Module - A0


NodeMCU ESP8266:
- LDR - Resistor - A0
- Laser - D4
- Relay - D5


Arduino Nano to ESP8266
- Nano RX <-> TX ESP8266
- Nano TX <-> RX ESP8266

Untuk nomor pin NodeMCU ESP8266 bisa diakses pada link [berikut](https://lastminuteengineers.com/wp-content/uploads/arduino/ESP-12E-Development-Board-ESP8266-NodeMCU-Pinout.png).

**Kode Arduino**

Kode Arduino tersedia pada folder Arduino. Ubah sesuai kebutuhan. Install board NodeMCU di Arduino IDE terlebih dahulu agar dapat memrogram NodeMCU pada aplikasi Arduino IDE. Tutorial dapat diakses pada link [berikut](https://randomnerdtutorials.com/how-to-install-esp8266-board-arduino-ide/).

**Kode Web**

Silahkan unduh dan atur API Key dari Thingspeak.

