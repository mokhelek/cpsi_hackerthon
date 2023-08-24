export default function (db) {
	function getTickets(patient_id, role) {


		const query = `SELECT * FROM report WHERE patient_id = '${patient_id}'`;
		const tickets = db.manyOrNone(query);
		return tickets;
	}

	return {
		getTickets
	}
}