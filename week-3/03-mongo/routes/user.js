const { Router } = require("express");
const router = Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

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
    const { username } = req.headers.username;

    const exists = await Course.findOne({ _id: courseId });
    if (!exists) return res.status(404).send({ msg: "no course found" });

    const user = await User.findOne(username);

    if (user.purchaseOrder.includes(courseId))
      return res.status(401).send({ msg: "order all ready purchased" });

    await User.findOneAndUpdate(username, {
      $push: { purchaseOrder: courseId },
    });

    return res.status(200).send({ msg: "course was purchased successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "user purchase controller problem" });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  try {
    const username = req.header.username;
    const user = await User.findOne(username);

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
