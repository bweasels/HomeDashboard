const mqtt = require('mqtt')
const NodeHelper = require("node_helper")
var obj

module.exports = NodeHelper.create({
	defaults:{
		client: [],
		ipAddress: ""
	},

	start: function() {
		this.countDown = 10000000
	},
	socketNotificationReceived: function(notification, payload) {
		const _this = this
		switch(notification) {

			//Original tutorial notification
			case "DO_YOUR_JOB":
				this.sendSocketNotification('I_DID', (this.countDown - payload))
				break

			//Get the list of devices upon startup
			case "POLL_DEVICES":

				//Connect to the ip address & subscribe to the topic with output
				this.ipAddress = payload
				this.client = mqtt.connect(this.ipAddress)
				console.log(typeof(this.client))
				this.client.subscribe('zigbee2mqtt/bridge/config/devices')

				//If connected, publish to the topic to induce output
				this.client.on('connect', () => {
					_this.client.publish('zigbee2mqtt/bridge/config/devices/get',
						'{"type":"devices","message":"N/A"}')
				})

				//When receiving message, parse it and send it back and make a copy of _this for the client.on scope
				this.client.on('message', function(topic, message) {
					obj = JSON.parse(message)
					_this.sendSocketNotification("AVAIL_DEVICES", obj)
					console.log(obj)
				})
				break

			case "GET_STATE":
				let states = []
				//let client_state = mqtt.connect(this.ipAddress)
				console.log(payload)
				for(let i=0; i < payload.length; i++){
					_this.client.subscribe('zigbee2mqtt/'+payload[i].name)
					//_this.client.on('connect', () => {
					_this.client.publish('zigbee2mqtt/'+payload[i].name+'/get', '{"state":""}')
						//console.log('zigbee2mqtt/'+payload[i].name+'/get', '{"state":""}')
					//})
					//client_state.on('message', function(topic, message) {
					//	console.log(message)
					//	obj = JSON.parse(message)
						//console.log(obj)
					//})
				}
				//client_state.end()
				break
			default:
				break;
		}
	},
})
