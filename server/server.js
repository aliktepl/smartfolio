const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require('passport');
require('./config/passport');
const dotenv = require("dotenv");
dotenv.config();

app.use(cors({
        origin: "http://localhost:5173",
        method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true
    }
));
app.use(express.json()); // Parse incoming JSON

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.session({pauseStream : false}));

//linking a path to a specific router
const userRouter = require("./routes/user");
app.use("/api/user", userRouter);
const authRouter = require("./routes/auth").router;
app.use("/api/auth", authRouter);
const walletRouter = require("./routes/wallet");
app.use("/api/wallet", walletRouter);
const coinsRouter = require("./routes/coins");
app.use("/api/coins", coinsRouter);

PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});