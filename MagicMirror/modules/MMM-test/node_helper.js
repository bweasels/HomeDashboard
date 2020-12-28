const mqtt = require('mqtt')
const NodeHelper = require("node_helper")

module.exports = NodeHelper.create({
	start: function() {
		this.countDown = 10000000
	},
	socketNotificationReceived: function(notification, payload) {
		switch(notification) {

			case "DO_YOUR_JOB":
				//var client = mqtt.connect("http://192.168.1.14")
				//client.on("connect", function(){console.log(payload)})
				this.sendSocketNotification("I_DID", (this.countDown - payload))
				break
			case "POLL_DEVICES":
				var client = mqtt.connect(payload)
				client.subscribe('zigbee2mqtt/bridge/log')
				client.on('connect', () => {
					client.publish('zigbee2mqtt/bridge/config/devices',
						'{"type":"devices","message":"N/A"')
				})
				client.on('message', function(topic, message) {
					//console.log(message.toString())
					var obj = JSON.parse(message)
					console.log(obj.message[0].friendly_name)
					client.end()
				})
				//console.log(client.message.toString())
				//console.log(payload)
				break
		}
	},
})
