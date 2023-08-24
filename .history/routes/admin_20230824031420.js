export default function admin_route(admin_service) {
  async function show(req, res) {
    try {
    const { username, password } = req.body;
  const admin = await admin_service.getRoleByAdminId(username);

  if (admin) {
    const isPasswordCorrect = await admin_service.verifyPassword(password, admin.password);

    if (isPasswordCorrect) {
      req.session.adminUsername = username;

      if (admin.role === "Doctor") {
        res.render("admin");
      } else if (admin.role === "Nurse") {
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
  

  return {
    show,
  };
}
