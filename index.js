const express = require("express");
const app = express();
const cors = require('cors')
const config = require("./config/env");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

const PORT = config.PORT || 3001;

const mongoconnect = require("./mongoconnect/mongoconnect")
mongoconnect()

var admin = require("firebase-admin");
var serviceAccount = require("./lab-management-system-a346e-firebase-adminsdk-xqkq0-d1f8555ded.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lab-management-system-a346e.firebaseio.com"
});

//Import required routes
const student = require("./routes/student/student");
const user=require('./routes/user/user');
const staff=require('./routes/staff/staff');
const lab=require('./routes/lab/lab');
const exercise=require('./routes/exercise/exercise');


//Use the necessary routes
app.use("/student", student);
app.use('/user',user);
app.use('/staff',staff)
app.use('/lab',lab)
app.use('/exercise',exercise)

//Home Route
app.get("/", (req, res) => {
  res.send("hi");
});

//Open port to listen
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening open PORT ${PORT}`);
  }
});
