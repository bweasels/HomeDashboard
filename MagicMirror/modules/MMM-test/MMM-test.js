

Module.register("MMM-Test", {
	defaults: {
		append: "I'm alive!"
	},

	//Function that runs when module is loaded successfully
	start: function () {
		this.count = 0,
		this.ipAddr = "http://192.168.1.14"

	},

	//the manner in which MM and modules communicate with eachother
	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case "DOM_OBJECTS_CREATED":
				//console.log("this.ipAddr")
				this.sendSocketNotification('POLL_DEVICES', this.ipAddr)
				var timer = setInterval(()=>{
					this.sendSocketNotification("DO_YOUR_JOB", this.count)
					this.count++


					//If we want to update html in DOM
					//this.updateDom()

					//If we want to directly edit the html here instead of DOM
					//var countElm = document.getElementById("COUNT")
					//countElm.innerHTML = "Count: " + this.count
				}, 1000)
				break
		}
	},
	socketNotificationReceived: function(notification, payload) {
		switch(notification) {
			case "I_DID":
				var elem = document.getElementById("COUNT")
				elem.innerHTML = "Count: " + payload
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
	}
})

