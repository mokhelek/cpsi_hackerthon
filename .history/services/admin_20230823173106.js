import bcrypt from 'bcrypt'



export default function admin_service(db) {

    const saltRounds = 10;

    async function addAdmin(hospital_name, password) {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      // Save the hospital_name and hashedPassword to the database
      // You'll need to write the appropriate SQL query here
      return await db.one('INSERT INTO hospital (hospital_name, password) VALUES ($1, $2) RETURNING *', [hospital_name, hashedPassword]);
    }


    async function getAdminByUsername(hospital_id) {
        return await db.oneOrNone('SELECT * FROM hospital WHERE hospital_name = $1', [hospital_id])
    }


    async function verifyPassword(password, hash) {
        console.log("Password type:", typeof password, "Hash type:", typeof hash);
        console.log("Comparing password:", password, "with hash:", hash);
        return new Promise((resolve, reject) => {
          if (typeof password !== 'string' || typeof hash !== 'string') {
            reject(new Error('Password and hash must be strings'));
          } else {
            bcrypt.compare(password, hash, function(err, result) {
              if (err) reject(err);
              resolve(result);
            });
          }
        });
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