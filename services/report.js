export default function handleReport(db) {

	async function addReport(patient_id, doctor_id, type, description, date_time) {


		await db.none(`INSERT INTO report (patient_id, doctor_id, type, time, description, completed) VALUES ($1,$2,$3,$4,$5,$6)`, [patient_id, doctor_id, type, date_time, description, false]);
	}

	return {
		addReport
	};
}