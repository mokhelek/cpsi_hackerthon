import bcrypt from 'bcrypt'



export default function admin_service(db) {

    const saltRounds = 10;



    async function getAdminByUsername(doctor_id) {
        return await db.oneOrNone('SELECT * FROM doctor WHERE doctor_id = $1', [doctor_id])
    }


    async function verifyPassword(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, result) {
                if (err) reject(err);
                resolve(result)
            })
        })
    }

    async function verifyCredentials(username, password) {
        const admin = await getAdminByUsername(username);
      
        if (admin) {
          const isPasswordValid = await verifyPassword(password, admin.password);
          if (isPasswordValid) {
           
            return admin;
          }
        }
        return null;
      }



    return {
        getAdminByUsername,
        verifyPassword,
        verifyCredentials,
    }

}