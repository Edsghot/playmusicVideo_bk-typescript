"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descargarId = exports.descargar = exports.updateVideo = exports.deleteVideo = exports.getbyid = exports.insertVideo = exports.getallVideo = void 0;
const video_1 = __importDefault(require("../models/video"));
const youtube_dl_exec_1 = require("youtube-dl-exec");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const unlinkAsync = util_1.default.promisify(fs_1.default.unlink);
const getallVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_1.default.findAll();
        res.status(200).json({ msg: 'operacion exitosa', result: video });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving video", error: error });
    }
});
exports.getallVideo = getallVideo;
const insertVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, url } = req.body;
        const download = false;
        const state = false;
        if (!name || !description || !url) {
            return res.status(400).json({ msg: "uno o mas campos vacios" });
        }
        const video = yield video_1.default.create({ name, description, url, download, state });
        return res.status(201).json({ msg: "operacion exitosa", result: video });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al insertar", error });
    }
});
exports.insertVideo = insertVideo;
const getbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const video = yield video_1.default.findByPk(id);
        if (!video) {
            return res.status(404).json({ msg: "video no encontrado" });
        }
        res.status(200).json({ msg: "exitoso", result: video });
    }
    catch (error) {
        res.status(500).json({
            msg: "error",
            error,
        });
    }
});
exports.getbyid = getbyid;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const video = yield video_1.default.findByPk(id);
        if (!video) {
            return res.status(404).json({
                msg: "No se encontro el video",
            });
        }
        yield video.destroy();
        res.status(200).json({ msg: "operacion exitosa" });
    }
    catch (error) {
        res.status(500).json({
            msg: "error",
            error,
        });
    }
});
exports.deleteVideo = deleteVideo;
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, url, state } = req.body;
        const video = yield video_1.default.findByPk(id);
        if (!video) {
            return res.status(404).json({
                msg: "no hay Video",
            });
        }
        if (!name || !description || !url) {
            return res.status(400).json({
                msg: "uno o mas campos vacios",
            });
        }
        const update = yield video.update({ name, description, url, state });
        return res.status(201).json({ msg: "operacion exitosa!", result: update });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error",
            error,
        });
    }
});
exports.updateVideo = updateVideo;
const descargar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        const options = {
            output: "video.mp4",
            restrictFilenames: true,
        };
        if (!url) {
            return res.status(500).json({
                msg: "uno o mas campos vacios",
            });
        }
        yield (0, youtube_dl_exec_1.exec)(url, options);
        const filePath = "video.mp4.webm";
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("El archivo de video no se encontró en la ubicación esperada");
        }
        res.download(filePath, "video.mp4", (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res
                    .status(500)
                    .send("Ocurrió un error al enviar el archivo al frontend");
            }
            else {
                yield unlinkAsync(filePath);
            }
        }));
    }
    catch (error) {
        res.status(500).send("Ocurrió un error al descargar el video");
    }
});
exports.descargar = descargar;
const descargarId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const options = {
            output: "video.mp4",
            restrictFilenames: true,
        };
        if (!id) {
            return res.status(500).json({
                msg: "digite el ID",
            });
        }
        const video = yield video_1.default.findByPk(id);
        if (!video) {
            return res.status(404).json({
                msg: "no existe el video"
            });
        }
        const { url } = yield video_1.default.findOne({
            where: { id },
            attributes: ["url"],
        });
        if (!url) {
            return res.status(404).json({
                msg: "no existe url para este video"
            });
        }
        yield (0, youtube_dl_exec_1.exec)(url, options);
        yield video.update({
            download: true
        });
        const filePath = "video.mp4.webm";
        if (!fs_1.default.existsSync(filePath)) {
            throw new Error("El archivo de video no se encontró en la ubicación esperada");
        }
        res.download(filePath, "video.mp4", (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res
                    .status(500)
                    .send("Ocurrió un error al enviar el archivo al frontend");
            }
            else {
                yield unlinkAsync(filePath);
            }
        }));
    }
    catch (error) {
        res.status(500).send("Ocurrió un error al descargar el video");
    }
});
exports.descargarId = descargarId;
