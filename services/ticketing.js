export default function (db) {
	function getTicket(patient_id) {
		const query = `SELECT * FROM report WHERE patient_id = ${patient_id}`;
		const ticket = db.oneOrNone(query);
	}
}