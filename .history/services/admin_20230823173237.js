import bcrypt from 'bcrypt'



export default function admin_service(db) {

    const saltRounds = 10;

    async function addAdmin(hospital_name, password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return await db.one('INSERT INTO hospital (hospital_name, password) VALUES ($1, $2) RETURNING *', [hospital_name, hashedPassword]);
    }


    async function getAdminByUsername(hospital_id) {
        return await db.oneOrNone('SELECT * FROM hospital WHERE hospital_name = $1', [hospital_id])
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
        addAdmin
    }

}