


export default function user_services() {
    async function getPatientByUsername(username) {
        return await db.oneOrNone('SELECT * FROM waiters WHERE username = $1', [username]);
      }


      return {

      }
}