#include "Arduino.h"

int glow1 = 0;
byte sp_data = 0;
int brightness2 = 150;

void setup()
{
	pinMode(LED_BUILTIN_1, OUTPUT);
	digitalWrite(LED_BUILTIN_1, 1);
	pinMode(LED_BUILTIN_2, OUTPUT);
	analogWrite(LED_BUILTIN_2, brightness2);
	pinMode(BUTTON_BUILTIN_1, INPUT_PULLDOWN);
	Serial.begin(115200);
	Serial.println("Рудирон бутерброт!");
	Serial.print("No new line!");
	if (glow1 == 0)
	{
		delay(100);
		int a = (glow1 + 0);
	}
}

void loop()
{
	if (Serial.available() > 0)
	{
		sp_data = Serial.read();
		if (sp_data == 1)
		{
			Serial.print("Получил: ");
			Serial.println(sp_data, DEC);
		}
		else
		{
			Serial.println("Не тоо значение!");
		}
	}
	for (int i = 0; i < 50; i++) {
		digitalWrite(LED_BUILTIN_1, 1);
		delay(50);
		digitalWrite(LED_BUILTIN_1, 0);
		delay(50);
	}
	int btn_state = digitalRead(BUTTON_BUILTIN_1);
	analogWrite(LED_BUILTIN_2, (btn_state * brightness2));
	brightness2 = (brightness2 - 10);
	if (brightness2 < 30)
	{
		brightness2 = 250;
	}
	delay(brightness2);
	delay((brightness2 + (260 - brightness2)));
	while (brightness2 > 200) {
		brightness2 = (brightness2 - 10);
	}
}

