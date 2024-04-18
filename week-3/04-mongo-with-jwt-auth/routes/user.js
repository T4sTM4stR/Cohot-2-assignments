const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");

const secret = "secret";

// User Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(403)
        .send({ msg: "Please enter a username and password" });

    const exists = await User.findOne({ username: username });

    if (exists) {
      return res.status(400).send({ msg: "username already exists" });
    }

    await User.create({ username: username, password: password });
    return res.status(200).send({ msg: "user created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "user controller problem" });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(403)
        .send({ msg: "Please enter a username and password" });
    }

    const exists = await User.findOne({ username });
    if (!exists) return res.status(401).send({ msg: `user not found` });

    if (password !== exists.password)
      return res.status(400).send({ msg: `password mismatch` });

    const token = jwt.sign({ username: username }, secret);

    return res.status(200).send({ token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "user signin error" });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send({ courses: courses });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "user controller problem" });
  }
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const username = req.username;

    console.log("====================================");
    console.log(username);
    console.log("====================================");
    const exists = await Course.findOne({ _id: courseId });
    if (!exists) return res.status(404).send({ msg: "no course found" });

    const user = await User.findOne({ username });

    console.log("====================================");
    console.log(user);
    console.log("====================================");

    if (user.purchaseOrder.includes(courseId))
      return res.status(400).send({ msg: "order all ready purchased" });

    await User.findOneAndUpdate(
      { username },
      {
        $push: { purchaseOrder: courseId },
      }
    );

    return res.status(200).send({ msg: "course was purchased successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "user purchase controller problem" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const username = req.username;
    const user = await User.findOne({ username });

    const courses = await Course.find({
      _id: {
        $in: user.purchaseOrder,
      },
    });

    return res.status(200).send({ courses: courses });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "all purchased controller problem" });
  }
});

module.exports = router;
