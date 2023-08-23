


export default function user_services(db) {

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
      async function verifyCredentials(username, password) {
        const waiter = await getPatientByUsername(username);
        if (waiter) {
          const isPasswordValid = await verifyPassword(password, waiter.password);
          if (isPasswordValid) {
            return waiter;
          }
        }
        return null;
      }


      return {
        getPatientByUsername,
        verifyCredentials
      }
}