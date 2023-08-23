import bcrypt from 'bcrypt'



export default function admin_service(db) {

    const saltRounds = 10;



    async function getAdminByUsername(hospital_name) {
        return await db.oneOrNone('SELECT * FROM hospital WHERE hospital_name = $1', [hospital_name])
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