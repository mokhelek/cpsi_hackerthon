// modules imports
import admin_service from "../services/admin.js";
import pgPromise from "pg-promise";
import "dotenv/config";

const pgp = pgPromise();
const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

// services instances
const admin = admin_service(db);

describe("services unit testing", function() {
    this.timeout(7000);

    beforeEach(async () => {
        try {

            // truncate the hospital admin
            await db.none("TRUNCATE TABLE hospital RESTART IDENTITY CASCADE");
        } catch (error) {
            console.log(error);
            throw(error);
        };
    });

    describe("admin services", async function () => {
        it("should be able to get the hospital name", async () => {
            const adminName = await admin.getAdminByUsername("Constatia Hospital");
            console.log(adminName);
        });

        it("should be able to get another hospital name", async () => {
            const adminName = await admin.getAdminByUsername("Khayelitsha Hospital");
            console.log(adminName);
        });

        it("should be able to get the hospital name", async () => {
            const adminName = await admin.getAdminByUsername("Constatia Hospital");
            console.log(adminName);
        });
    })
});


// it("This should test if the incorrect registration number is chosen and it should not add", async function () {
//     const initialCount = (await registration.get_all_registration_numbers())
//       .length;

//     await registration.insert_registration_number("CJ312432143");

//     const newCount = (await registration.get_all_registration_numbers()).length;

//     assert.equal(initialCount, newCount);
//   });
