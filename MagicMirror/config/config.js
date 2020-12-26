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
            module: "clock",
            position: "top_left"
        },
        {
            module: "calendar",
            header: "US Holidays",
            position: "top_left",
            config: {
                calendars: [
                    {
                        symbol: "calendar-check",
                        url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"					}
                ]
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
