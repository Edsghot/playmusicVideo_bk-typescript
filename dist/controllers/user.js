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
exports.loginUser = exports.newUser = exports.getUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lista = yield user_1.default.findAll();
    res.json({
        msg: "Get User",
        data: lista
    });
});
exports.getUser = getUser;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    //validando si existe el usuario
    const user = yield user_1.default.findOne({ where: { name: name } });
    if (user) {
        return res.status(400).json({
            msg: 'Ya existe un usuario con el mismo nombre ' + name
        });
    }
    try {
        yield user_1.default.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        return res.json({
            msg: "Usuario " + name + " creado exitosamente"
        });
    }
    catch (err) {
        return res.status(500).json({
            msg: "error", err
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    //validando si el usuario existe en la base de datos
    const user = yield user_1.default.findOne({ where: { email: email } });
    if (!user) {
        return res.status(404).json({
            msg: 'no existe un usuario con email ' + email + ' en la base de datos'
        });
    }
    //validamos el passowrd
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(400).json({
            msg: 'password incorrect'
        });
    }
    //generemos el token
    const token = jsonwebtoken_1.default.sign({
        email: email,
    }, process.env.SECRET_KEY || 'erick123.', {
        expiresIn: '80000'
    });
    res.json({ token });
});
exports.loginUser = loginUser;
