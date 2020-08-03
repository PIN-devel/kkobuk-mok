#include <DHT.h>
#include <DHT_U.h>
#define DHT_PIN 7
#define DHTTYPE DHT11
DHT_Unified dht(DHT_PIN, DHTTYPE);

#include <Servo.h>
#define SERVO_PIN 3
Servo servo;


boolean b_new_data = false;
String s_data;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  servo.attach(SERVO_PIN);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  recData();
  function ();
}
void recData(){
  if(Serial.available() > 0) { 
    s_data = Serial.readString();
    Serial.print(s_data);
    b_new_data = true;
  }
}
void function(){
  if (b_new_data == true){

    if (s_data == "SR"){
        sensors_event_t event;
        dht.temperature().getEvent(&event);
        
        if (isnan(event.temperature)) {
          Serial.println(F("Error reading temperature!"));
        }
        else {
          Serial.print(F("온도: "));
          Serial.print(event.temperature);
          Serial.print(F("°C "));
        }
        // Get humidity event and print its value.
        dht.humidity().getEvent(&event);
        if (isnan(event.relative_humidity)) {
          Serial.println(F("Error reading humidity!"));
        }
        else {
          Serial.print(F("습도: "));
          Serial.print(event.relative_humidity);
          Serial.println(F("%"));
        }
    }else if(s_data == "MC1"){
      servo.write(0);
      Serial.println("자세 : 양호");
    }else if(s_data == "MC2"){
      servo.write(90);
      Serial.println("자세 : 주의");
    }else if(s_data == "MC3"){
      servo.write(180);
      Serial.println("자세 : 심각");      
    }
    
    b_new_data = false;
  }
}
