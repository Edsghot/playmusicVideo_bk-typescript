"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMusic = void 0;
const getMusic = (req, res) => {
    try {
        const music = yield Music.findAll();
        res.json({ msg: "exitoso", result: music });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving Music', error: error });
    }
};
exports.getMusic = getMusic;
