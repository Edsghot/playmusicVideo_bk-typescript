"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate_token"));
const router = (0, express_1.Router)();
router.get('/getall', validate_token_1.default, user_1.getUser);
router.post('/insert', user_1.newUser);
router.post('/login', user_1.loginUser);
exports.default = router;
