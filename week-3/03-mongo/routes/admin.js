const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("====================================");
    console.log(username + "=" + password);
    console.log("====================================");

    if (!username || !password) {
      return res
        .status(403)
        .send({ msg: "Please enter a username and password" });
    }

    const exists = await Admin.findOne({ username: username });

    if (exists) {
      return res.status(400).send({ msg: "username already exists" });
    }

    await Admin.create({ username: username, password: password });
    res.status(200).send({ msg: "Admin created" });
  } catch (err) {
    return res.status(500).send({ msg: "admin controller problem" });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  try {
    const { title, description, imageLink, price } = req.body;

    const course = await Course.create({
      title,
      description,
      imageLink,
      price,
    });
    return res
      .status(200)
      .send({ msg: "Course created successfully", courseId: course._id });
  } catch (err) {
    console.error("Error creating course:", err);
    return res.status(500).send({ error: "Failed to create course" });
  }
});

router.get("/courses", adminMiddleware, async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send({ courses: courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send({ error: "Failed to fetch courses" });
  }
});

module.exports = router;
