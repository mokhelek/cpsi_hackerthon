export default function admin_route(admin_service) {
  async function add(req, res) {
    try {
      const { username, password } = req.body;
  
      const admin = await admin_service.getRoleByAdminId(username);
   

      if (admin) {
        const isPasswordCorrect = await admin_service.verifyPassword(
          password,
          admin.password
        );

        if (isPasswordCorrect) {
          req.session.adminUsername = username;

          if (admin.role === "Doctor") {
            console.log(admin.role);
            res.render("admin");
          } else if (admin.role === "Nurse") {
            console.log(admin.role);
            res.render("clinic");
          }
        } else {
          res.status(401).send("Invalid password");
        }
      } else {
        res.status(404).send("Admin not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  }

  async function show(req, res) {
    const usernameFromURL = req.params.username;
    const usernameFromSession = req.session.adminUsername;

    if (usernameFromURL !== usernameFromSession) {
      // If the usernames don't match, show an error or redirect
      return res.status(403).send("Access denied");
    }

    // Render the admin page
    res.render("admin");
  }

  return {
    add,
    show,
  };
}