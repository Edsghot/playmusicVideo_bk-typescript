"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const video_1 = require("../controllers/video");
const router = (0, express_1.Router)();
router.get('/getall', video_1.getallVideo);
router.get('/getbyid/:id', video_1.getbyid);
router.get('/downloadbyid/:id', video_1.descargarId);
//==================POST=======================================
router.post('/download', video_1.descargar);
router.post('/insert', video_1.insertVideo);
router.put('/update/:id', video_1.updateVideo);
//================DELETE =================================================
router.delete('/delete/:id', video_1.deleteVideo);
exports.default = router;
