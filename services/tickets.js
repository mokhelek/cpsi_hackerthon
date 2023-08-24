export default function (db) {
	function getTickets(patient_id, type) {
		const query = `SELECT * FROM report WHERE patient_id = ${patient_id} AND type = ${type}`;
		const tickets = db.manyOrNone(query);
		return tickets;
	}

	return {
		getTickets
	}
}