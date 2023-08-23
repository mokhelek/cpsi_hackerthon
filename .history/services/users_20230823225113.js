


export default function user_services(db) {

    async function getPatientByUsername(patient_id) {
        return await db.oneOrNone('SELECT * FROM patient WHERE patient_id = $1', [patient_id]);
      }


      return {
        getPatientByUsername
      }
}