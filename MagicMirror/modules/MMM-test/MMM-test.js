

Module.register("MMM-Test", {
	defaults: {
		append: "I'm alive!",
		devices: [
			{"vendor":"Sengled", "model":"E11-N1EA", "type":"A19-Bulb.png"},
			{"vendor":"Sengled", "model":"E1F-N5E", "type":"E12-Bulb.png"}
		]
	},

	//Function that runs when module is loaded successfully
	start: function () {
		this.count = 0,
		this.ipAddr = "http://192.168.1.14",
		this.devData = []
	},

	//the manner in which MM and modules communicate with eachother
	notificationReceived: function(notification, payload, sender) {
		_this = this
		switch(notification) {
			case "DOM_OBJECTS_CREATED":
				this.sendSocketNotification('POLL_DEVICES', this.ipAddr)
				let timer_tutorial = setInterval(()=>{
					_this.sendSocketNotification("DO_YOUR_JOB", this.count)
					_this.count++


					//If we want to update html in DOM
					//this.updateDom()

					//If we want to directly edit the html here instead of DOM
					//var countElm = document.getElementById("COUNT")
					//countElm.innerHTML = "Count: " + this.count
				}, 100)
				let timer = setInterval(()=>{
					this.sendSocketNotification("GET_STATE", _this.devData)
				}, 1000)
				break
		}
	},
	socketNotificationReceived: function(notification, payload) {
		switch(notification) {
			case "I_DID":
				let elem = document.getElementById("COUNT")
				elem.innerHTML = "Count: " + payload
				break
			case "AVAIL_DEVICES":
				//For each returned device strip to essential ID info
				for (let i=1; i < payload.length; i++) {
					let temp = {
						"name": payload[i].friendly_name,
						"model": payload[i].model,
						"vendor": payload[i].vendor
					}
					this.devData.push(temp)
				}
				break
		}
	},

	getDom: function() {
		// Main element
		var element = document.createElement('div')
		element.className = 'myContent'
		element.innerHTML = 'Hello, World! | ' + this.config.append

		// sub element within main element
		var subElement = document.createElement('p')
		subElement.innerHTML = 'Count: ' + this.count
		subElement.id = "COUNT"

		//make sub element a child of main element
		element.appendChild(subElement)
		return(element)
	},

	addDevices: function() {

		//I'm so sorry, but this contains the entire database of zigbee devices.....

	}
})

