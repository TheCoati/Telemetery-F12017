#### F1 2017 Telemetery data module
![alt text](https://img.shields.io/npm/v/f12017-telemetry.svg "NPM Version") ![alt text](https://img.shields.io/npm/l/f12017-telemetry.svg "License")
####
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
####
 **Documentation**
[Documentation page](https://kschreuder.github.io/Telemetery-F12017/)