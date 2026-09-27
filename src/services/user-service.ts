import { Connection } from "mysql2";
import getConnection from "../config/db";

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
export { handleCreateUser, getAllUser }