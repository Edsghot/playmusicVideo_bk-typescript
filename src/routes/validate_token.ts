import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer")) {
    try {
      //tiene token
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "erick123.");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({
      msg: "acceso denegado",
    });
  }
};

export default validateToken;
