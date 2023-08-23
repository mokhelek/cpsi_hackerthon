import express from "express";
import { engine } from "express-handlebars";
import bodyParser from "body-parser";
import pgPromise from "pg-promise";
import dotenv from "dotenv"

import flash from "express-flash";
import session from "express-session";


import admin_route from "./routes/admin.js";
import login_route from "./routes/login.js";
import auth_route from "./routes/auth.js";
import ticket_route from "./services/ticket.js";

import admin_service from "./services/admin.js";




// instances
const app = express();
dotenv.config();

const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
};

const pgp = pgPromise();

const db = pgp(connection); 

app.use(
    session({
        secret: "<add a secret string here>",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(express.static("public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const adminService = admin_service(db)

const authRouter = auth_route(adminService)
const adminRoute = admin_route(adminService)
const loginRoute = login_route()



app.get("/", (req, res) => {
    res.render("home");
});

app.get("/admin/:username",
	authRouter.requireAdmin,
	adminRoute.show
);

app.get("/form-report", (req, res) => {
    res.render("report-form");
});

app.get("/ticket", ticket_route.show);

app.post("/submit-report", (req, res) => {
    res.redirect("/");
}); 


app.get("/login", loginRoute.show)
app.post("/login", authRouter.login)

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("App starting on port", PORT);
});
