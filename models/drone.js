"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
var DroneModel;
(function (DroneModel) {
    DroneModel["LightWeight"] = "Lightweight";
    DroneModel["MiddleWeight"] = "Middleweight";
    DroneModel["CruiserWeight"] = "Cruiserweight";
    DroneModel["HeavyWeight"] = "Heavyweight";
})(DroneModel || (DroneModel = {}));
var DroneState;
(function (DroneState) {
    DroneState["IDLE"] = "IDLE";
    DroneState["LOADING"] = "LOADING";
    DroneState["LOADED"] = "LOADED";
    DroneState["DELIVERING"] = "DELIVERING";
    DroneState["DELIVERED"] = "DELIVERED";
    DroneState["RETURNING"] = "RETURNING";
})(DroneState || (DroneState = {}));
const Drone = database_1.sequelize.define('Drone', {
    serialNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    model: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    weightLimit: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    batteryCapacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING'),
        defaultValue: DroneState.IDLE,
        allowNull: false,
    },
});
exports.default = Drone;
