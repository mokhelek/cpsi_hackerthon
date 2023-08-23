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
import user_route from "./routes/user.js";

import admin_service from "./services/admin.js";
import user_services from "./services/users.js";
import ticket_service from "./services/tickets.js";
import report from "./services/report.js"

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
const userService = user_services(db)
const ticketService = ticket_service(db);
const Report = report(db);

const authRouter = auth_route(adminService, userService)
const adminRoute = admin_route(adminService)
const userRoute =  user_route(userService)
const loginRoute = login_route()

app.get("/", (req, res) => {
	if (req.session.user) {
		res.redirect(`/admin/${req.session.user.admin}`);
	} else {
		res.render("login"); // Render the login or home page for unauthenticated users
	}
});

app.get("/admin/:username",
	authRouter.requireAdmin,
	adminRoute.show
);
app.get("/patients/:username", userRoute.show);

app.get("/form-report", (req, res) => {
	res.render("report-form");
});

app.get("/tickets/:patient_id", (req, res) => {
	res.render("tickets", {
		tickets: ticketService.getTickets(req.params.patient_id)
	});
});

app.post("/submit-report", async (req, res) => {
	console.log(req.body.name, req.body.patientID, req.body.type, req.body.Description)
    await Report.addReport(req.body.name, req.body.patientID, req.body.type, req.body.Description, req.body.appointmentTime, req.body.appointed);
    res.redirect("/form-report");
}); 


app.get("/", loginRoute.show)
app.post("/login", authRouter.login)


app.get('/logout', authRouter.logout);

let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
	console.log("App starting on port", PORT);
});