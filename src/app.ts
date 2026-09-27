import express from "express";
import webRoutes from "./routes/web";
require('dotenv').config();


const path = require('path');

const app = express();
const PORT = process.env.PORT;

//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//config static files
app.use(express.static('public'));

//config routes
webRoutes(app);


app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});