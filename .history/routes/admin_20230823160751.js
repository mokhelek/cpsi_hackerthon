export default function admin_route(admin_service) {
    async function add(req, res) {
      try {
        const { username, password } = req.body;
        const admin = await admin_service.getAdminByUsername(username);
    
        if (admin) {
          const isPasswordCorrect = await admin_service.verifyPassword(
            password,
            admin.password
          );
    
          if (isPasswordCorrect) {
            req.session.adminUsername = username; 
            res.redirect(`/admin/${username}`);
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
        const username = req.params.username;
        const waiters = await admin_service.listWaiters();
        const availableDays = await waiter_service.getAvailableDays();
      
        // Constructing the schedule object
        const schedule = {
          'lunch': { 'mon': [], 'tue': [], 'wed': [], 'thu': [], 'fri': [], 'sat': [], 'sun': [] },
          'supper': { 'mon': [], 'tue': [], 'wed': [], 'thu': [], 'fri': [], 'sat': [], 'sun': [] },
        };
      
        availableDays.forEach((shift) => {
          const time_slot_key = shift.time_slot === 'lunch' ? 'lunch' : 'supper';
          const day_key = shift.day.slice(0, 3).toLowerCase();
          schedule[time_slot_key][day_key] = shift.usernames.join(', ');
        });
      
        res.render("admin", { username, waiters, schedule });
      }

    return {
        add,
        show
    }
}  