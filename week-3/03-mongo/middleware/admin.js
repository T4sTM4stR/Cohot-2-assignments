// Middleware for handling auth
const { Admin } = require(`../db/index`);

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    const { username, password } = req.headers;

    if (!username || !password)
      return res.status(401).send({ msg: "No admin present" });

    const exists = await Admin.findOne({ username });

    if (!exists) return res.status(401).send({ msg: "Admin not found" });

    if (exists.password === password) {
      return next();
    } else {
      return res.status(401).send({ msg: "Incorrect password" });
    }
  } catch (e) {
    console.log(`${e}`);

    return res.status(500).send({ msg: `middleware error: ` });
  }
}

module.exports = adminMiddleware;
