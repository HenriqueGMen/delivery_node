import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { 
        username 
      }
    });

    if(!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    const passwordCompare = await compare(password, deliveryman.password);

    if(!passwordCompare) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "c4f9ba968954ad1ad9a6544a9930b416", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}