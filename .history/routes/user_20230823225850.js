export default function user_route() {
  async function show(req, res) {
    const username = req.params.username;

    try {
      // Pass the daysOfWeek and timeSlots arrays to the template, along with username and schedule
      res.render("patients", { username });
    } catch (error) {
      console.error(error);
      res.redirect("/");
    }
  }

  return {
    show,
  };
}
