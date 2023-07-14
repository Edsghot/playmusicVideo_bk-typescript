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
exports.descargarId2 = exports.descargarId = exports.descargarmusica = exports.deleteMusic = exports.update = exports.getbyid = exports.insertMusic = exports.getMusic = void 0;
const music_1 = __importDefault(require("../models/music"));
const youtube_dl_exec_1 = require("youtube-dl-exec");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const unlinkAsync = util_1.default.promisify(fs_1.default.unlink);
const getMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const music = yield music_1.default.findAll();
        return res.json({ msg: "exitoso", result: music });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error retrieving Music", error: error });
    }
});
exports.getMusic = getMusic;
const insertMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, url } = req.body;
        const state = false;
        const download = false;
        if (!id || !name || !description || !url) {
            return res.status(400).json({ msg: "uno o mas campos vacios" });
        }
        const music = yield music_1.default.create({
            id,
            name,
            description,
            url,
            download,
            state,
        });
        return res.status(201).json({ msg: "operacion exitosa", result: music });
    }
    catch (error) {
        return res.status(500).json({ message: "Error al insertar", error });
    }
});
exports.insertMusic = insertMusic;
const getbyid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const music = yield music_1.default.findByPk(id);
        if (!music) {
            return res.status(404).json({ msg: "music no encontrado" });
        }
        return res.status(200).json({ msg: "exitoso", result: music });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error",
            error,
        });
    }
});
exports.getbyid = getbyid;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, url } = req.body;
        const music = yield music_1.default.findByPk(id);
        if (!music) {
            return res.status(404).json({
                msg: "no hay Musica",
            });
        }
        if (!name || !description || !url) {
            return res.status(400).json({
                msg: "uno o mas campos vacios",
            });
        }
        const update = yield music.update({ name, description, url });
        return res.status(201).json({ msg: "operacion exitosa!", result: update });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error",
            error,
        });
    }
});
exports.update = update;
const deleteMusic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const music = yield music_1.default.findByPk(id);
        if (!music) {
            return res.status(404).json({
                msg: "No se encontro el music",
            });
        }
        yield music.destroy();
        return res.status(200).json({ msg: "operacion exitosa" });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error",
            error,
        });
    }
});
exports.deleteMusic = deleteMusic;
const descargarmusica = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body; // Obtener la URL del audio desde los parámetros de la solicitud
        const options = {
            output: "audio.mp3",
            extractAudio: true,
            restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
        };
        yield (0, youtube_dl_exec_1.exec)(url, options); // Descargar el audio
        // Enviar el archivo de audio como respuesta al frontend
        res.download("audio.mp3", "audio.mp3", (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error("Ocurrió un error al enviar el archivo al frontend:", err);
                return res
                    .status(500)
                    .send("Ocurrió un error al enviar el archivo al frontend");
            }
            else {
                console.log("¡Audio descargado y enviado exitosamente al frontend!");
                // Eliminar el archivo de audio después de enviarlo
                yield unlinkAsync("audio.mp3");
                console.log("¡Archivo de audio eliminado!");
            }
        }));
    }
    catch (error) {
        console.error("Ocurrió un error al descargar el audio:", error);
        return res.status(500).send("Ocurrió un error al descargar el audio");
    }
});
exports.descargarmusica = descargarmusica;
const descargarId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const options = {
            output: "audio.mp3",
            extractAudio: true,
            audioFormat: "mp3",
            restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
        };
        if (!id) {
            return res.status(404).json({
                msg: "no existe la musica",
            });
        }
        const music = yield music_1.default.findByPk(id);
        if (!music) {
            return res.status(404).json({ msg: "no existe la musica" });
        }
        const { url } = yield music_1.default.findOne({
            where: { id },
            attributes: ["url"],
        });
        console.log("URL-> " + url);
        yield (0, youtube_dl_exec_1.exec)(url, options); // Descargar el audio
        yield music.update({ download: "true" });
        // Enviar el archivo de audio como respuesta al frontend
        res.download("audio.mp3", "audio.mp3", (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error("Ocurrió un error al enviar el archivo al frontend:", err);
                res
                    .status(500)
                    .send("Ocurrió un error al enviar el archivo al frontend");
            }
            else {
                console.log("¡Audio descargado y enviado exitosamente al frontend!");
                // Eliminar el archivo de audio después de enviarlo
                yield unlinkAsync("audio.mp3");
                console.log("¡Archivo de audio eliminado!");
            }
        }));
    }
    catch (error) {
        console.error("Ocurrió un error al descargar el audio:", error);
        res.status(500).send("Ocurrió un error al descargar el audio");
    }
});
exports.descargarId = descargarId;
const descargarId2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const options = {
            output: "audio.mp3",
            extractAudio: true,
            audioFormat: "mp3",
            restrictFilenames: true, // Restringe los caracteres especiales en el nombre del archivo
        };
        if (!id) {
            return res.status(404).json({
                msg: "no existe la musica",
            });
        }
        const music = yield music_1.default.findByPk(id);
        if (!music) {
            return res.status(404).json({ msg: "no existe la musica" });
        }
        const { url } = yield music_1.default.findOne({
            where: { id },
            attributes: ["url"],
        });
        console.log("URL-> " + url);
        yield (0, youtube_dl_exec_1.exec)(url, options); // Descargar el audio
        yield music.update({ download: "true" });
        const filePath = "audio.mp3";
        if (!path_1.default.isAbsolute(filePath)) {
            // Si la ruta no es absoluta, conviértela en absoluta
            const absolutePath = path_1.default.resolve(filePath);
            return res.sendFile(absolutePath, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.error("Ocurrió un error al enviar el archivo al frontend:", err);
                    return res
                        .status(500)
                        .send("Ocurrió un error al enviar el archivo al frontend");
                }
                else {
                    console.log("¡Audio descargado y enviado exitosamente al frontend!");
                    // Eliminar el archivo de audio después de enviarlo
                    yield unlinkAsync("audio.mp3");
                    console.log("¡Archivo de audio eliminado!");
                }
            }));
        }
        else {
            return res.sendFile(filePath, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    console.error("Ocurrió un error al enviar el archivo al frontend:", err);
                    return res
                        .status(500)
                        .send("Ocurrió un error al enviar el archivo al frontend");
                }
                else {
                    console.log("¡Audio descargado y enviado exitosamente al frontend!");
                    // Eliminar el archivo de audio después de enviarlo
                    yield unlinkAsync("audio.mp3");
                    console.log("¡Archivo de audio eliminado!");
                }
            }));
        }
    }
    catch (error) {
        console.error("Ocurrió un error al descargar el audio:", error);
        res.status(500).send("Ocurrió un error al descargar el audio");
    }
});
exports.descargarId2 = descargarId2;
