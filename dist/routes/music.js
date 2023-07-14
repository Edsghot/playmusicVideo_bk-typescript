"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const music_1 = require("../controllers/music");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, music_1.getMusic);
exports.default = router;
