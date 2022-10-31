import { prisma } from "../../../database/prismaClient";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if(!client) {
      throw new Error("Username or password invalid!");
    }

    const passwordCompare = await compare(password, client.password);

    if(!passwordCompare) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "c4f9ba698954ad1ad9a6544a9930b416", {
      subject: client.id,
      expiresIn: "1d"
    });

    return token;
  }
}