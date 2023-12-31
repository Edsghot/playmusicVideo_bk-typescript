"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const music_1 = require("../controllers/music");
const router = (0, express_1.Router)();
router.get('/getall', music_1.getMusic);
router.get('/downloadbyid/:id', music_1.descargarId);
router.get('/downloadfile/:id', music_1.descargarId2);
router.post('/download', music_1.descargarmusica);
router.post('/insert', music_1.insertMusic);
router.get('/getbyid/:id', music_1.getbyid);
router.put('/update/:id', music_1.update);
router.delete('/delete/:id', music_1.deleteMusic);
exports.default = router;
