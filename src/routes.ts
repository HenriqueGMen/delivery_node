import { Router } from "express";
import { AuthenticateClientController } from "./modules/accounts/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientControler";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/authenticate", authenticateClientController.handle);

routes.post("/client/", createClientController.handle);

export { routes }