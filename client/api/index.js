const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const db = require("./queries");
const port = 4000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
  });
});
app.get("/datas", db.getDatas);
app.get("/zooms", db.getZooms);
app.get("/datas/:id", db.getVouchers);
app.post("/zooms", db.searchZooms);
app.post("/searchSchedule", db.searchSchedule);
// app.get("/users/:id", db.getUserById);
// app.post("/users", db.createUser);
app.put("/updateSchedule/:id", db.updateSchedule);
app.post("/schedule", db.createSchedule);
app.delete("/schedule/:id", db.deleteSchedule);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
