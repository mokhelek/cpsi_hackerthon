


export default function user_route() {



    async function show(req, res) {
        const username = req.params.username;
      
        // Define the daysOfWeek array
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      
        // Define the timeSlots array
        const timeSlots = ['lunch', 'supper'];
      
        try {
          const schedule = await waiter_service.getWaiterSchedule(username);
          // Pass the daysOfWeek and timeSlots arrays to the template, along with username and schedule
          res.render('users', { username, daysOfWeek, timeSlots, schedule });
        } catch (error) {
          console.error(error);
          res.redirect('/');
        }
      }


    return {

    }
}


  