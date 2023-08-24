export default function (db) {
	function getTickets(patient_id, user) {
		const query = `SELECT * FROM report WHERE patient_id = ${patient_id} AND type = ${user}`;
		const tickets = db.manyOrNone(query);
		return tickets;
	}

	return {
		getTickets
	}
}