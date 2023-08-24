export default function admin_route(admin_service) {
  async function show(req, res) {
    try {
      // Log incoming request body
      console.log("Request body:", req.body);

      const { username, password } = req.body;
      // Log extracted username and password
      console.log("Extracted username:", username);
      console.log("Extracted password:", password);

      const admin = await admin_service.getRoleByAdminId(username);
      // Log fetched admin object
      console.log("Fetched admin object:", admin);

      if (admin) {
        const isPasswordCorrect = await admin_service.verifyPassword(password, admin.password);
        // Log password verification result
        console.log("Is password correct?", isPasswordCorrect);

        if (isPasswordCorrect) {
          req.session.adminUsername = username;

          if (admin.role === "Doctor") {
            console.log("Rendering 'admin' view");
            res.render("admin");
          } else if (admin.role === "Nurse") {
            console.log("Rendering 'clinic' view");
            res.render("clinic");
          }
        } else {
          console.log("Invalid password");
          res.status(401).send("Invalid password");
        }
      } else {
        console.log("Admin not found");
        res.status(404).send("Admin not found");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("An error occurred");
    }
  }

  return {
    show,
  };
}
