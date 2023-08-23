export default function auth_route(adminService) {
    async function login(req, res) {
      const { username, password } = req.body;
  
      // Verify credentials in the admin table
      const admin = await adminService.verifyCredentials(username, password);
      if (admin) {
        req.session.adminUsername = username;
        console.log('Redirecting to username:', username);
         req.session.user = admin; 
        return res.redirect(`/admin/${username}`);
      }
  
      // Verify credentials in the waiters table
    
      // Render the login page with an error message if credentials are not valid
      res.render('admin', { error: 'Invalid credentials' });
    }

    function requireAdmin(req, res, next) {
      if (!req.session.adminUsername) {
        // If the user is not logged in as an admin, redirect to the login page
        return res.redirect('/login');
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
  