export default function auth_route(admin_service, userService) {
  async function login(req, res) {
    const { username, password } = req.body;
    const admin = await admin_service.getRoleByAdminId(username);
  
    if (admin) {
      const isPasswordCorrect = await admin_service.verifyPassword(password, admin.password);
  
      if (isPasswordCorrect) {
        req.session.adminUsername = username;
  
        if (admin.role === "Doctor") {
          return res.render("admin");
        } else if (admin.role === "Nurse") {
          return res.render("clinic");
        }
      } else {
        return res.status(401).send("Invalid password");
      }
    } else {
      const patient = await userService.verifyCredentials(username, password);
      if (patient) {
        return res.render('patients', { username }); // Render the patient handlebar
      }
  
      // Render the login page with an error message if credentials are not valid
      return res.render('login', { error: 'Invalid credentials' });
    }
  }

    function requireAdmin(req, res, next) {
      if (!req.session.adminUsername) {
        // If the user is not logged in as an admin, redirect to the login page
        return res.redirect('/');
      }
      next(); // If logged in as an admin, continue to the next middleware or route handler
    }
    
  
  
    async function logout(req, res) {
      // Destroy the session
      req.session.destroy(err => {
        if (err) {
          return res.redirect('/error'); // Redirect to error page if something goes wrong
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.redirect('/'); // Redirect to home or login page
      });
    }
  
    return {
      login,
      logout,
      requireAdmin
    };
  }
  