import express from "express";
import { Express } from "express";
import { getHomePage, postCreateUserPage, deleteUser, getViewUser, updateUser } from "controllers/usercontroller";
// import { getCreateUserPage } from "../controllers/usercontroller";

const router = express.Router();

const webRoutes = (app: Express) => {
    router.get('/', getHomePage);

    // router.get('/create-user', getCreateUserPage);
    router.post('/handle-create-user', postCreateUserPage);

    router.delete('/delete-user/:id', deleteUser);

    router.get("/view-user/:id", getViewUser);

    router.put("/update-user/:id", updateUser)
    app.use("/", router);
}

export default webRoutes;
