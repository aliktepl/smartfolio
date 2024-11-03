PORT = process.env.PORT || 3000;

const express = require("express");
const app = express();
const cors = require("cors"); // Add CORS to allow requests from the front-end

app.use(cors());
app.use(express.json()); // Parse incoming JSON

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});

const userRouter = require("./routes/user")

//linking a path to a specific router
app.use("/users", userRouter)
