import { Connection } from "mysql2";
import getConnection from "config/db";

const handleCreateUser = async (
    fullname: string,
    email: string,
    address: string) => {

    //insert into db
    const connection = await getConnection();
    try {
        const sql = 'INSERT INTO `users`(`name`, `email`,`address`) VALUES (?, ?, ?)';
        const values = [fullname, email, address];

        const [result, fields] = await connection.execute(sql, values);

        return result;
    } catch (err) {
        console.log(err);
    }
}

const getAllUser = async () => {
    const connection = await getConnection();

    try {
        const [results, fields] = await connection.execute(
            'SELECT * FROM `users`'
        );

        return results;
    } catch (err) {
        console.log(err);
        return [];
    }
}
const handleDeleteUser = async (id: string | number) => {
    const connection = await getConnection();
    try {
        const sql = 'DELETE FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);
        return result;
    } catch (err) {
        console.log("Error deleting user:", err);
        throw err;
    }
};

const getUserById = async (id: string | number) => {
    const connection = await getConnection();
    try {
        const sql = 'SELECT * FROM `users` WHERE `id` = ?';
        const values = [id];

        const [result, fields] = await connection.execute(sql, values);
        return result[0];
    } catch (err) {
        console.log("Error viewing user:", err);
        throw err;
    }
};

const updateUserById = async (id: string | number, name: string, email: string, address: string) => {
    const connection = await getConnection();
    try {
        const sql = `
            UPDATE users
            SET name = ?, email = ?, address = ?
            WHERE id = ?
        `;

        const values = [name, email, address, id];

        const [result] = await connection.execute(sql, values);

        return result;
    } catch (err) {
        console.log("Error updating user:", err);
        throw err;
    }
};
export { handleCreateUser, getAllUser, handleDeleteUser, getUserById, updateUserById }