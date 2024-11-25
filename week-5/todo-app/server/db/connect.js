const mongoose = require("mongoose");

const db = async (uri) => {
  mongoose.connect(uri);
};

module.exports = db;
