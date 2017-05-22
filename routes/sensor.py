#!/usr/local/bin/python
import sys
import RPi.GPIO as GPIO
import time
from pymongo import MongoClient

GPIO.setmode(GPIO.BOARD)
#define the pin that goes to the circuit
pin_to_circuit = 7

def rc_time (pin_to_circuit):
    count = 0
    #Output on the pin for 
    GPIO.setup(pin_to_circuit, GPIO.OUT)
    GPIO.output(pin_to_circuit, GPIO.LOW)
    time.sleep(0.1)
    #Change the pin back to input
    GPIO.setup(pin_to_circuit, GPIO.IN)
  
    #Count until the pin goes high
    while (GPIO.input(pin_to_circuit) == GPIO.LOW):
       count += 1
    return count
#Catch when script is interrupted, cleanup correctly
light = False
Client = MongoClient()
db = Client["meanauth"]
collection = db["sensors"]
sensor = {}
sensor ["Light"] = False 
collection.insert(sensor)
print collection.find()
try:
    # Main loop
    while True:
	
	if rc_time(pin_to_circuit) < 800 and light == False:
		print ("Light is ON!")
		collection.remove()
		sensor ["Light"] = True
		collection.insert(sensor)			
		light = True		
		time.sleep(2.5)	
	if rc_time(pin_to_circuit) > 800 and light == True:
		print ("Light is OFF!")
		collection.remove()
                sensor ["Light"] = False
                collection.insert(sensor)
		light = False
		time.sleep(2.5)

#      print rc_time(pin_to_circuit)
except KeyboardInterrupt:
    pass
finally:
	GPIO.cleanup()

