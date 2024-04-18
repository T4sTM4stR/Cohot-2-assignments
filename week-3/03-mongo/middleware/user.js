const { User } = require("../db/index");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

  try {
    const { username, password } = req.headers;

    if (!username || !password)
      return res.status(401).send({ msg: "enter valid username or password" });

    const exists = await User.findOne({ username: username });

    if (!exists) return res.status(401).send({ msg: "no user present" });

    if (exists.password === password) return next();
    else return res.status(403).send({ msg: "Invalid password" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ msg: "user middleware error" });
  }
}

module.exports = userMiddleware;
