import bcrypt from 'bcrypt'



export default function admin_service(db) {

    const saltRounds = 10;



    async function getRoleByAdminId(admin_id) {
        const admin = await db.oneOrNone('SELECT * FROM admin WHERE admin_id = $1', [admin_id]);
        if (admin && (admin.role === 'Doctor' || admin.role === 'Nurse')) {
            console.log(admin)
          return admin; // Return the entire admin object
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
        const admin = await getRoleByAdminId(username);
      
        if (admin) {
          const isPasswordValid = await verifyPassword(password, admin.password); 
          if (isPasswordValid) {
            return admin;
          }
        }
        return null;
      }



    return {
        getRoleByAdminId,
        verifyPassword,
        verifyCredentials,
    }

}