#!/bin/bash
#Script to check that devices are working and start MM2

if [ -e /dev/ttyACM0 ]
then
	echo "Zigbee Bridge Detected"
	sudo systemctl start zigbee2mqtt
	sudo systemctl start home-assistant@homeassistant
	pm2 start mm.sh
fi
