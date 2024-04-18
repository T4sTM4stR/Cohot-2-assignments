// Middleware for handling auth
const { Admin } = require(`../db/index`);
const jwt = require("jsonwebtoken");

const secret = "secret";

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

  try {
    const auth = req.headers.authorization.split(" ");

    const token = auth[1];

    if (!token) return res.status(401).send({ msg: "Login first" });

    const verify = jwt.verify(token, secret);

    const admin = await Admin.findOne({ username: verify.username });

    if (!admin) return res.status(400).send({ msg: "not authorized" });

    return next();
  } catch (e) {
    console.log(`${e}`);

    return res.status(500).send({ msg: `middleware error: admin ` });
  }
}

module.exports = adminMiddleware;
