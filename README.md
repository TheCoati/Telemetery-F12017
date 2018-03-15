#### F1 2017 Telemetery data module
NPM module to receive F1 2017 telemetry data in Node.JS
####
**Installation**
```shell
npm install --save f12017-telemetry
```
####
 **Example usage**
```javascript
const Telemetry = require("f12017-telemetry");
const telemetry = new Telemetry();

telemetry.on("data", (data) => {
    console.log("Speed: " + data.getKmhSpeed() + "Km/h");
});
```


