export default function (db) {
	function getTickets(patient_id, role) {


		const query = `SELECT * FROM report WHERE patient_id = '${patient_id}'`;
		const tickets = db.manyOrNone(query);
		return tickets;
	};

	async function getAppointment(doctor_id, type) {
		console.log("DOCTOR DETAILS**** ", doctor_id,type )
		const appointments = await db.manyOrNone(`Select * FROM report WHERE doctor_id = $1 AND type = $2`, [doctor_id, type]);
		console.log("APPOINTMENTS ****** ", appointments)
		return appointments;
	};

	return {
		getTickets,
		getAppointment
	}
}