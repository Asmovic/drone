"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../database");
class BatteryLog extends sequelize_1.Model {
}
BatteryLog.init({
    droneSerialNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    batteryCapacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'BatteryLog',
});
exports.default = BatteryLog;
