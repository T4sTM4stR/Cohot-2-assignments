require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

// const ngrok = require("@ngrok/ngrok");

//database

const dbConnect = require("./db/connect");

//Routes

const todoRoutes = require("./routes/todoRoutes");

app.use(`/api/v1/todos`, todoRoutes);

// fallback or home route
app.use(`/api/v1`, (req, res) => {
  res.send("This is a todo server");
});
// MAIN FUNCTION

const port = 5000;

const start = async () => {
  try {
    await dbConnect(`mongodb://localhost:27017/`);
    app.listen(port, console.log(`server running on port ${port}`));

    // Get your endpoint online
    // ngrok
    //   .connect({ addr: port, authtoken: process.env.NGROK_AUTHTOKEN })
    //   .then((listener) =>
    //     console.log(`Ingress established at: ${listener.url()}`)
    //   );
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

start();
