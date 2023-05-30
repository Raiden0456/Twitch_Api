import readline from "readline";
import User from "./utils/data.js";

// Prompt the user for a username in the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question(`Enter a username: `, async (Nickname: string) => {
  const user = new User();
  // Print the user's data
  console.log(await user.getAllData(Nickname));
  rl.close();
});
