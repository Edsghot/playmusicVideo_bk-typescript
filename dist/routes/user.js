"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const router = (0, express_1.Router)();
router.get('/getall', user_1.getUser);
router.post('/insert', user_1.newUser);
router.post('/login', user_1.loginUser);
exports.default = router;
