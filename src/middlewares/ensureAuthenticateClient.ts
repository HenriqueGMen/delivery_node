import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateClient(req: Request, res: Response, next: NextFunction) {
  const authHeader = await req.headers.authorization;

  if(!authHeader) {
    return res.status(401).json({
      message: "Token missing!"
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "c4f9ba698954ad1ad9a6544a9930b416") as IPayload;

    req.id_client = sub;

    return next();
  } catch(err) {
    return res.status(401).json({
      message: "Invalid token!"
    });
  }
}