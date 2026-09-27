import { Request, Response } from "express";
import { getAllUser, handleCreateUser } from "../services/user-service";

const getHomePage = async (req: Request, res: Response) => {
    //get user
    const users = await getAllUser();
    console.log(users);
    // return res.render("home.ejs", {
    //     users: users
    // });
    return res.json({ users: users });
}

// const getCreateUserPage = (req: Request, res: Response) => {
//     return res.render("create-user");
// }
const postCreateUserPage = async (req: Request, res: Response) => {

    const { fullname, email, address } = req.body;

    await handleCreateUser(fullname, email, address);

    // return res.redirect("/");
    return res.status(201).json({
        message: "Create user successfully",
        user: {
            fullname,
            email,
            address
        }
    });
}
export { getHomePage, postCreateUserPage };
// export { getCreateUserPage};