import bcrypt from 'bcrypt'


export default function user_services(db) {

  async function getUsername(patient_id){
    const query = `SELECT name FROM patient WHERE patient_id = '${patient_id}'`;
    return await db.oneOrNone(query);
  }

    async function getPatientByUsername(patient_id) {
        return await db.oneOrNone('SELECT * FROM patient WHERE patient_id = $1', [patient_id]);
      }


      async function verifyPassword(password, hash) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(password, hash, function (err, result) {
            if (err) reject(err);
            resolve(result);
          });
        });
      }
    
      // Verify credentials (username and password)
      async function verifyCredentials(patient_id, password) {
        const patient = await getPatientByUsername(patient_id);
        if (patient) {
          const isPasswordValid = await verifyPassword(password, patient.password);
          if (isPasswordValid) {
            return patient;
          }
        }
        return null;
      }


      return {
        getPatientByUsername,
        verifyCredentials,
        getUsername
      }
}