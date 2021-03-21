require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// body-parser: Body-parser is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const User = require("./models/User");

// app.use((req, res, next) => {
// 	console.log("This middleware runs on every request")
// 	// TODO: learn how to use req, res and next in middleware
// })

app.get("/", (req, res) => {
  let users = ["Mayank Jha", "Pawan", "Max", "Shreyansh"];
  res.send({
    users,
  });
});

app.post("/create-user", async (req, res) => {
  console.log(req.body);

  try {
    const myuser = new User(req.body);
    await myuser.save();
    res.send(myuser);
  } catch (err) {
    res.send({ message: err });
  }
});

try {
  mongoose.connect(
    process.env.MONGODB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Mongoose is connected")
  );
} catch (err) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => {
  console.log(`Connection error ${err}`);
});
dbConnection.once("open", () => {
  console.log("Connected to DB");
});

// mongoose
// 	.connect(process.env.MONGODB_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	})
// 	.then(() => console.log("Mongodb connected"))
// 	.catch(err => console.log(err))

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
