export default function auth_route(patientService, userService) {
  async function login(req, res) {
    const { username, password } = req.body;
  
    // Verify credentials in the admin table
    const admin = await patientService.verifyCredentials(username, password);
    if (admin) {
      req.session.adminUsername = username;
      console.log('Redirecting to username:', username);
      req.session.user = { admin: username };
      return res.redirect(`/admin/${username}`);
    }
  
    const patient = await userService.verifyCredentials(username, password);
    if (patient) {
      return res.render('patient', { username }); // Render the patient handlebar
    }
  
    // Render the login page with an error message if credentials are not valid
    res.render('login', { error: 'Invalid credentials' });
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
  