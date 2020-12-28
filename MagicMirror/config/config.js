/* Magic Mirror Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
    address: "localhost", 	// Address to listen on, can be:

    port: 8080,
    basePath: "/",  // The URL path where MagicMirror is hosted. If you are using a Reverse proxy
                    // you must set the sub path here. basePath must end with a /
    ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],  // Set [] to allow all IP addresses
    useHttps: false,        // Support HTTPS or not, default "false" will use HTTP
    httpsPrivateKey: "",    // HTTPS private key path, only require when useHttps is true
    httpsCertificate: "",   // HTTPS Certificate path, only require when useHttps is true
    language: "en",
    logLevel: ["INFO", "LOG", "WARN", "ERROR"],
    timeFormat: 24,
    units: "metric",

// Start module list
    modules: [
        {
            module: "alert",
        },
		{
			module: "MMM-Test",
			position: "top_bar",
			config: {
				append: "Yo this shit works!"
			}
		},
        {
            module: "updatenotification",
            position: "top_bar"
        },
        {
            module: 'MMM-GoogleTasks',
            header: "Google Tasks",
            position: "top_right",
            config: {
                listID: "MDU1ODIxNzYyMDA5NDkxNDczMTY6MDow",
                maxResults: 20,
                tableClass: "medium"
            }
        },
        {
            disabled: false,
            module: 'MMM-BMW-OW',
            position: 'bottom_bar',
            config: {
                api: '409926904d27e87ba6ca87a43aae1de1',
                ownTitle: "Current Conditions | ",
                lat: '40.808090',
                lon: '-73.959750',
                css: '1',
                icons: '1',
                playSounds: 'no',
                useHeader: false,
                maxWidth: '100%',
                updateInterval: 5 * 60 * 1000,
            }
        },
        /*{
            module: 'MMM-nyc-transit',
            position: 'top_right',
            header: 'Next Train',
            config: {
                apiKey: '',
                displayType: 'list',
                mtaType: 'train',
                stations: [
                    {
                        stationID: 307,
                        walkingTime: 5,
                        dir: {
                            upTown: false,
                            downTown: true
                        }
                    },
                    {
                        stationID: 393,
                        walkingTime: 12,
                        dir: {
                            upTown: false,
                            downTown: true
                        }
                    }
                ]
            }
        },*/
        {
            module: "clock",
            position: "top_left",
            timeFormat: 12
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
