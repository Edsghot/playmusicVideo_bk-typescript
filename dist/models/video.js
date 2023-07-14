"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Video = connection_1.default.define("Videos", {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    download: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    state: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
});
exports.default = Video;
