const { User } = require("../db/index");

const jwt = require("jsonwebtoken");

const secret = "secret";

async function userMiddleware(req, res, next) {
  try {
    const auth = req.headers.authorization.split(" ");

    const token = auth[1];
    if (!token) return res.status(401).send({ msg: "login first" });

    const verify = jwt.verify(token, secret);

    const user = await User.findOne({ username: verify.username });

    if (!user) return res.status(401).send({ msg: "not authorized" });

    req.username = verify.username;

    return next();
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "user middleware error" });
  }
}

module.exports = userMiddleware;
