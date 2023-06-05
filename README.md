# Twitch API

## Pre-requisites:

- Register an application on Twitch: https://dev.twitch.tv/console/apps/create
- Get the Client ID and Client Secret from the application you just created
---
## Usage
1. Install dependences 
   ```bash 
   npm install
   ```
3. Set env variables shown in `.env.example` file
redirect URL should be have the path you've registered in your twitch app

4. Run script in dev 
   ```bash
   npm run dev
   ```
   or build a production version
   ```bash
   npm run build 
   npm run start
   ```
5. Follow the instructions in the console
6. When the console asks you to go to the page, copy URL and accept the terms, you will be then redirected to the page with access code that you need to paste to the console in order to proceed
6. Results are saved to `data.json` file to the root of the project 