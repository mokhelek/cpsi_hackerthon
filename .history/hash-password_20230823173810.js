const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = "1234"; // Your plaintext password

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log("Hashed password:", hash);
  }
});
