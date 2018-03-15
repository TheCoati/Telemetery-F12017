"use strict";

/**
 * @author Kevin Schreuder
 * @licence MIT <https://opensource.org/licenses/MIT>
 * @type {module.Packet} Contains all telemetry data
 */

module.exports = class Packet {

    /**
     * Construct a new data packet
     * @param buffer {Buffer} raw buffer data
     */

    constructor(buffer) {

        this._buffer = buffer;

        this._data = typeof this._buffer !== "undefined" && this._buffer !== null;

    }

    /**
     * Current speed in meters per second
     * @param floor {boolean} Floor value to no decimals
     * @param speed {number} Fallback value if no buffer data is present
     * @returns {number} The current speed in Mp/s
     */

    getSpeed(floor = true, speed = 0) {

        if (this._data) {

            speed = this._buffer.readFloatLE(28);
            speed = (floor ? Math.floor(speed) : speed);

        }

        return speed;

    }

    /**
     * Current speed in kilometers per hour
     * @param floor {boolean} Floor value to no decimals
     * @param speed {number} Fallback value if no buffer data is present
     * @returns {number} The current speed in Km/h
     */

    getKmhSpeed(floor = true, speed = 0) {

        if (this._data) {

            speed = this.getSpeed();
            speed = speed * 3.6;
            speed = (floor ? Math.floor(speed) : speed);

        }

        return speed;

    }

    /**
     * Get the current engine RPM
     * @param floor {boolean} Floor value to no decimals
     * @param rpm {number} Fallback value if no buffer data is present
     * @returns {number} The current engine RPM
     */

    getRPM(floor = true, rpm = 0) {

        if (this._data) {

            rpm = this._buffer.readFloatLE(148);
            rpm = (floor ? Math.round(rpm) : rpm);

        }

        return rpm;

    }

    /**
     * The current lap time in milliseconds
     * @param lapTime {number} Fallback value if no buffer data is present
     * @returns {number} Current lap time in milliseconds
     */

    getLapTime(lapTime = 0) {

        if (this._data) {

            lapTime = Math.floor(this._buffer.readFloatLE(4) * 1000);

        }

        return lapTime;

    }

    /**
     * The best lap time in milliseconds
     * @param bestLapTime {number} Fallback value if no buffer data is present
     * @returns {number} Best lap time in milliseconds
     */

    getBestLapTime(bestLapTime = 0) {

        if (this._data) {

            bestLapTime = Math.floor(this._buffer.readFloatLE(357) * 1000);

        }

        return bestLapTime;

    }

    /**
     * The latest lap time in milliseconds
     * @param lastLapTime {number} Fallback value if no buffer data is present
     * @returns {number} Latest lap time in milliseconds
     */

    getLastLapTime(lastLapTime = 0) {

        if (this._data) {

            lastLapTime = this._buffer.readFloatLE(349) * 1000;

        }

        return lastLapTime;

    }

    /**
     * Current position relative to other drivers
     * @param position {number} Fallback value if no buffer data is present
     * @returns {number} Current driver position
     */

    getPosition(position = 20) {

        if (this._data) {

            position = this._buffer.readFloatLE(156);

        }

        return position;

    }

    /**
     * Remaining fuel level of the car
     * @param fuel {number} Fallback value if no buffer data is present
     * @returns {number} Current fuel level
     */

    getFuel(fuel = 0) {

        if (this._data) {

            fuel = this._buffer.readFloatLE(180);

        }

        return fuel;

    }

    /**
     * Current throttle pressure percentage
     * @param throttle {number} Fallback value if no buffer data is present
     * @returns {number} Current throttle pressure
     */

    getThrottle(throttle = 0) {

        if (this._data) {

            throttle = this._buffer.readFloatLE(116) * 100;

        }

        return throttle;

    }

    /**
     * Current break pressure percentage
     * @param breaks {number} Fallback value if no buffer data is present
     * @returns {number} Current break pressure
     */

    getBreaks(breaks = 0) {

        if (this._data) {

            breaks = this._buffer.readFloatLE(124) * 100;

        }

        return breaks;

    }

    /**
     * The current gear
     * -1: Reverse
     * 0: Neutral
     * 1: 1st gear
     * 2: 2nd gear
     * 3: 3th gear
     * 4: 4th gear
     * 5: 5th gear
     * 6: 6th gear
     * 7: 7th gear
     * 8: 8th gear
     * @param gear {number} Fallback value if no buffer data is present
     * @return {number} Current gear
     */

    getGear(gear = 0) {

        if (this._data) {

            gear = this._buffer.readFloatLE(132)-1;

        }

        return gear;

    }

    /**
     * If car is using DRS
     * @param drs {boolean} Fallback value if no buffer data is present
     * @return {boolean} if the car is using DRS
     */

    getDRS(drs = false) {

        if (this._data) {

            let rawDrs = this._buffer.readFloatLE(168);
            drs = rawDrs === 1;

        }

        return drs;

    }


    /**
     * If DRS is allowed in current session
     * @param drsAllowed {boolean} Fallback value if no buffer data is present
     * @return {boolean} if the car is using DRS
     */

    getDRSAllowed(drsAllowed = false) {

        if (this._data) {

            let rawDrsAllowed = this._buffer.readFloatLE(268);
            drsAllowed = rawDrsAllowed === 1;

        }

        return drsAllowed;

    }

    /**
     * Current flag applied at car position
     * 0: No flag
     * 1: Green flag
     * 2: Blue flag
     * 3: Yellow flag
     * 4: Red flag
     * @param flag {number} Fallback value if no buffer data is present
     * @return {number} Current flag applied at car position
     */

    getFlag(flag = 0) {

        if (this._data) {

            flag = this._buffer.readFloatLE(276);

        }

        return flag;

    }

    /**
     * Get current pit status of the car
     * @param pits {boolean} Fallback value if no buffer data is present
     * @return {boolean} If the car is inside the pit lane
     */

    getPits(pits = true) {

        if (this._data) {

            let rawPits = this._buffer.readFloatLE(188);
            pits = rawPits === 1;

        }

        return pits;

    }

};