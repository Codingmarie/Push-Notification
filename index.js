const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

//Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
  "BNAQQyg1G3lGB-rA6y_7NLlAUeATPRSLE8GtOqbm6_PTfMZjdsrDpjEkP16qJ3hD4ANBvPN-a9vMnZ87pj03K3c";
const privateVapidKey = "1d73SvAfo3K_DgZO79JE5mSEsRRykLIUaqP5FhjoNrE";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  //Get pushSubscription object
  const subscription = req.body;

  //Send 201 -resource created
  res.status(201).json({});

  //Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  //Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.error(err));
});

const port = 3200;

app.listen(port, () => console.log(`Server started on port ${port}`));
