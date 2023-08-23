import bcrypt from 'bcrypt'



export default function admin_service(db) {


    async function getAdminByUsername(username) {
        return await db.oneOrNone('SELECT * FROM hospital WHERE username = $1', [username])
    }


    async function verifyPassword(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, result) {
                if (err) reject(err);
                resolve(result)
            })
        })
    }


    return {
        getAdminByUsername,
        verifyPassword
    }

}