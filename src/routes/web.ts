import express from "express";
import { Express } from "express";
import { getHomePage, postCreateUserPage } from "../controllers/usercontroller";
// import { getCreateUserPage } from "../controllers/usercontroller";

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    // router.get('/create-user', getCreateUserPage);
    router.post('/handle-create-user', postCreateUserPage);

    app.use("/", router);
}

export default webRoutes;
