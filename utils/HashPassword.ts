
const bcrypt = require("bcryptjs");

export async function hashPassword(pass: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Generates salt with 5 rounds
    bcrypt.genSalt(5, (err: any, salt: string) => {
      if (err) {
        return reject(err); // Handle salt generation error
      }

      // Hash the password with the generated salt
      bcrypt.hash(pass, salt, (err: any, hash: string) => {
        if (err) {
          return reject(err); // Handle hashing error
        }

        resolve(hash); // Return the hashed password
      });
    });
  });
}


export async function isSamePass(unhashPass: string, hashedPass: string): Promise<boolean> {
    const result = await bcrypt.compare(unhashPass, hashedPass);
    return result;
}
