


export default function user_services(db) {

    async function getPatientByUsername(username) {
        return await db.oneOrNone('SELECT * FROM patient WHERE username = $1', [username]);
      }


      return {
        getPatientByUsername
      }
}