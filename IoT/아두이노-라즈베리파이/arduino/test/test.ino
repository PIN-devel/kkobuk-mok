#include <DHT.h>
#include <DHT_U.h>
#include <Servo.h>

#define DHT_PIN 7
#define SERVO_PIN 3
#define SPEAKER_PIN 8
#define RELAY_PIN 12

#define DHTTYPE DHT11
DHT_Unified dht(DHT_PIN, DHTTYPE);

int Tones[7] = {261, 294, 330, 349, 392, 440, 494};

Servo servo;


boolean b_new_data = false;
String s_data;
boolean humidifier_state = false;

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
          
          Serial.print(event.temperature);
          Serial.print(",");
        }
        // Get humidity event and print its value.
        dht.humidity().getEvent(&event);
        if (isnan(event.relative_humidity)) {
          Serial.println(F("Error reading humidity!"));
        }
        else {
          Serial.println(event.relative_humidity);
        }
    }
    
    else if(s_data == "MC1"){
      servo.write(0);
      Serial.println("1");
    }
    
    else if(s_data == "MC2"){
      servo.write(90);
      Serial.println("2");
    }
    
    else if(s_data == "MC3"){
      servo.write(180);
      Serial.println("3");      
    }
    
    else if(s_data == "SP"){
      tone(SPEAKER_PIN,1865);
      delay(2000);
      
      tone(SPEAKER_PIN,988);
      delay(500);
      tone(SPEAKER_PIN,1175);
      delay(500);
      tone(SPEAKER_PIN,1480);
      delay(500);
      tone(SPEAKER_PIN,1175);
      delay(500);

      tone(SPEAKER_PIN,932);
      delay(500);
      tone(SPEAKER_PIN,1109);
      delay(500);
      tone(SPEAKER_PIN,1319);
      delay(500);
      tone(SPEAKER_PIN,932);
      delay(500);

            tone(SPEAKER_PIN,988);
      delay(500);
      tone(SPEAKER_PIN,1175);
      delay(500);
      tone(SPEAKER_PIN,1480);
      delay(500);
      tone(SPEAKER_PIN,1175);
      delay(500);

      tone(SPEAKER_PIN,932);
      delay(500);
      tone(SPEAKER_PIN,1109);
      delay(500);
      tone(SPEAKER_PIN,1319);
      delay(500);
      tone(SPEAKER_PIN,932);
      delay(500);
      
   
      noTone(SPEAKER_PIN);
      Serial.println("알람");      
    }
    else if(s_data == "RON"){
      if (!humidifier_state){
        digitalWrite(RELAY_PIN,1);
        delay(200);
        digitalWrite(RELAY_PIN,0);
         
        humidifier_state = true;
      }
      Serial.println("가습기 : on");     
    }
    else if(s_data == "ROF"){
      if (humidifier_state){
        digitalWrite(RELAY_PIN,1);
        delay(200);
        digitalWrite(RELAY_PIN,0);
        delay(200);
        digitalWrite(RELAY_PIN,1);
        delay(200);
        digitalWrite(RELAY_PIN,0);
        
        humidifier_state = false;
      }
      digitalWrite(RELAY_PIN,0);
      Serial.println("가습기 : off");      
    }

    b_new_data = false;
  }
}