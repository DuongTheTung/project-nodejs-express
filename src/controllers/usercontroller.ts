import { Request, Response } from "express";
import { getAllUser, handleCreateUser, handleDeleteUser, getUserById, updateUserById } from "services/user-service";

const getHomePage = async (req: Request, res: Response) => {
    // //get user
    // const users = await getAllUser();
    // console.log(users);
    // // return res.render("home.ejs", {
    // //     users: users
    // // });
    // return res.json({ users: users });
    try {
        const users = await getAllUser();
        return res.status(200).json({
            message: "Get all users successfully",
            users: users
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching users from database"
        });
    }
}

// const getCreateUserPage = (req: Request, res: Response) => {
//     return res.render("create-user");
// }
const postCreateUserPage = async (req: Request, res: Response) => {

    // const { name, email, address } = req.body;

    // await handleCreateUser(name, email, address);

    // // return res.redirect("/");
    // return res.status(201).json({
    //     message: "Create user successfully",
    //     user: {
    //         name,
    //         email,
    //         address
    //     }
    // });
    try {
        const { name, email, address } = req.body;

        // Kiểm tra dữ liệu gửi lên (nếu thiếu trả về 400 Bad Request)
        if (!name || !email || !address) {
            return res.status(400).json({
                message: "Missing required fields: name, email, address"
            });
        }

        // Tạo user
        await handleCreateUser(name, email, address);

        // Thành công trả về 201 Created
        return res.status(201).json({
            message: "Create user successfully",
            user: {
                name,
                email,
                address
            }
        });
    } catch (error) {
        // Lỗi server trả về 500 Internal Server Error
        console.error("Error at postCreateUserPage:", error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };

        if (!id) {
            return res.status(400).json({
                message: "Missing user id"
            });
        }

        await handleDeleteUser(id);

        return res.status(200).json({
            message: `User with id ${id} deleted successfully`
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const getViewUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };

        if (!id) {
            return res.status(400).json({
                message: "Missing user id"
            });
        }

        const user = await getUserById(id);

        return res.status(200).json({
            user: user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };

        if (!id) {
            return res.status(400).json({
                message: "Missing user id"
            });
        }

        const { name, email, address } = req.body;

        if (!name || !email || !address) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        await updateUserById(id, name, email, address);

        return res.status(200).json({
            message: `User with id ${id} updated successfully`
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
export { getHomePage, postCreateUserPage, deleteUser, getViewUser, updateUser };
// export { getCreateUserPage};