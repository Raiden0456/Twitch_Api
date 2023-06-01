import { ClientCredentialsAuthProvider } from 'twitch-auth';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
// Log the Oauth token only for testing purposes
// const token = await authProvider.getAccessToken();
// console.log("Oauth token: ", token.accessToken);

export default authProvider;