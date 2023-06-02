import fs from "fs";
import dotenv from "dotenv";
import readline from "readline";
import axios from "axios";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Token {
  async getAccessToken() {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const redirectUri = encodeURIComponent("http://localhost:3000");

    const scopes = "channel:read:subscriptions";
    const authUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

    console.log(
      `Please visit this URL to authorize the application: ${authUrl}`
    );
    const code = await this.getAuthorizationCode();
    const tokenResponse = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: decodeURIComponent(redirectUri),
        },
      }
    );
    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;

    fs.appendFileSync(
      ".env",
      `\nTWITCH_ACCESS_TOKEN=${accessToken}\nTWITCH_REFRESH_TOKEN=${refreshToken}`
    );
  }

  getAuthorizationCode() {
    return new Promise((resolve) => {
      rl.question(`Enter the authorization code: `, (code) => {
        resolve(code);
      });
    });
  }
}

export default Token;
