import bcrypt from 'bcrypt'



export default function admin_service(db) {

    const saltRounds = 10;



    async function getRoleByAdminId(admin_id) {
        const admin = await db.oneOrNone('SELECT * FROM admin WHERE admin_id = $1', [admin_id]);
        if (admin && (admin.role === 'doctor' || admin.role === 'nurse')) {
          return admin.role;
        }
        return null;
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
       getAdminByRolename,
        verifyPassword,
        verifyCredentials,
    }

}