"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('edsghotprueba', 'edsghot1', 'edsghot123.', {
    dialect: 'mysql',
    host: 'db4free.net',
    port: 3306,
});
exports.default = sequelize;
