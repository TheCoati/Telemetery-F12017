const Telemetry = require("telemetry");

const telemetry = new Telemetry();

telemetry.on("data", (data) => {

    console.log("Speed: " + data.getKmhSpeed() + "Km/h");

});