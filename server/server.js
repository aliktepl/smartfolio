// const express = require("express")
// const app = express()
// app.listen(3000)
// app.get("/", (req, res) => {
//     console.log('hi')
//     res.sendStatus(200)
//     //res.download("server.js")
//   })

// const express = require('express');
// //const cors = require('cors');
// const app = express();

// // Middleware
// //app.use(cors()); // Enable CORS for development if frontend and backend are on different ports
// app.use(express.json()); // Parse JSON data

// // API Route Example
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello from Express!' });
// });
// app.get("/", (req, res) => {
//     console.log('hi')
//     res.sendStatus(200)
//     //res.download("server.js")
// })

// // Start the server
// app.listen(3000, () => {
//   console.log('Express server running on port 3000');
// });
const express = require("express");
const app = express();
const cors = require("cors"); // Add CORS to allow requests from the front-end

app.use(cors());
app.use(express.json()); // Parse incoming JSON

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const userRouter = require("./routes/user")

//linking a path to a specific router
app.use("/users", userRouter)


// // Simulate wallet data
// app.get("/Users/wallet", (req, res) => {
//   //console.log("here")
//   const walletData = [
//     { name: "Bitcoin",symbol: "BTC" , amount: 10 , change: 0.25 },
//     { name: "Ethereum",symbol: "ETH" , amount: 4 , change: 0.30 },
//     { name: "Cardano",symbol: "CAR" , amount: 1 , change: 0.10 },
//     { name: "DogeCoin",symbol: "DOG" , amount: 9 , change: 0.90 }
//   ];
//   res.json(walletData);
// }); 
