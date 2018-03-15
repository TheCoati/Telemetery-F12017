"use strict";

const EventEmitter = require('events').EventEmitter;
const Packet = require('./Packet');

/**
 * @author Kevin Schreuder <kevinschreuder@icloud.com>
 * @licence MIT
 * @type {module.Telemetry} Main telemetry data class
 */

module.exports = class Telemetry extends EventEmitter {

    /**
     * Construct a new Telemetry listening object
     * @param host Hostname of the telemetry server
     * @param port Port of the telemetry server
     * @param interval Update interval of the telemetry data
     * @param timeout Timeout of the connection
     */

    constructor(host = "127.0.0.1", port = 20777, interval = 50, timeout = 1000) {

        super();

        this._host = host;
        this._port = port;
        this._interval = interval;
        this._timeout = timeout;
        this._lastDataTime = 0;

        if (timeout < 1000) console.warn("Timeout below 1000 may cause unexpected timeouts!");

        this._startUDPListener();

    }

    /**
     * Start the UDP listener to receive packet data from the game
     * @private prevents starting the UDP listener twice
     */

    _startUDPListener() {

        let server = require('dgram').createSocket('udp4');

        server.on("message", (data, remote) => {

            this._lastData = data;
            this._lastDataTime = new Date().getTime();

        });

        server.bind(this._port, this._host);

        server.on("listening", () => setInterval(() => this._emitData(), this._interval));

    }

    /**
     * Emit the current data to the listening clients
     * @private prevents unintended emitting data
     */

    _emitData() {

        let packet = new Packet(null);

        if (this.isConnected()) {

            packet = new Packet(this._lastData);

        }

        this.emit('data', packet);

    }

    /**
     * Check if the telemetry server is receiving data from the game
     * @returns {boolean} if the telemetry server is still receiving data from the game
     */

    isConnected() {

        return (this._lastDataTime + this._timeout) > new Date().getTime();

    }

    /**
     * Get the last time the telemetry server received data
     * @returns {number} 0 if no data was received during runtime or unix timestamp
     */

    getLastDataTime() {

        return this._lastDataTime;

    }

    /**
     * Get the last registered packet data
     * @returns {*} latest packet data or null if no data was received during runtime
     */

    getLastPacketData() {

        return new Packet(this._lastData);

    }

};
