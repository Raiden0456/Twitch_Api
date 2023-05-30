import readline from "readline";
import fs from "fs";

import User from "./utils/data.js";
import Rating from "./utils/rating.js";

// Prompt the user for a username in the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter a username: `, async (Nickname: string) => {
  const user = new User();
  const rating = new Rating();

  // Get the user's data
  const userData = await user.getAllData(Nickname);

  if (userData.id === undefined) {
    console.log("User not found");
    rl.close();
    return;
  }

  // Calculate the user's rating
  const ratingData = await rating.calculateRating(userData);

  // Combine the user's data and rating into one json and output it to file
  const data = {
    ...userData,
    ...ratingData,
  };
  console.log("Data: ", data);
  rl.close();

  // Write the data to a file
  fs.writeFile("data.json", JSON.stringify(data), (err: any) => {
    if (err) {
      console.log("Error writing file: ", err);
    } else {
      console.log("Successfully wrote file");
    }
  });

});
