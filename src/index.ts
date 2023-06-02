import readline from "readline";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";

import User from "./utils/data.js";
import Rating from "./utils/rating.js";
import Token from "./utils/token.js";

dotenv.config();

// Set up the server
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const code = req.query.code;
  if (code) {
    res.send(`Your authorization code is: ${code}`);
  } else {
    res.send("No authorization code found");
  }
});
app.listen(port);

let accessToken = process.env.TWITCH_ACCESS_TOKEN;

// Prompt the user for their username in the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter a Twitch username: `, async (username: string) => {
  const user = new User();
  const rating = new Rating();

  // Get if the access token doesn't exist
  if (!accessToken) {
    const token = new Token();
    await token.getAccessToken();
  }

  // Get the user's data
  const userData = await user.getAllData(username);

  if (userData.id === undefined) {
    console.log("User not found");
    rl.close();
    return;
  }

  const ratingData = await rating.calculateRating(userData);

  const data = {
    ...userData,
    ...ratingData,
  };
  console.log("Data: ", data);
  rl.close();

  fs.writeFile("data.json", JSON.stringify(data), (err: any) => {
    if (err) {
      console.log("Error writing file: ", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});
