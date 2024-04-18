# TrainTicketsApp
REST api with svelte client

## Description
This is a simple application that allows you to buy train tickets. The application is divided into two parts: the back-end and the front-end. The back-end is a REST api created with express.js and the front-end is a client created with svelte.js. The back-end is responsible for handling requests and responses, while the front-end is responsible for displaying the user interface.

## Technologies
- Node.js
- Express.js
- Svelte.js
- MongoDB

## Pre-requisites
- In back-end directory create a `.env` file with the following content:
1. DATABASE_URL (MongoDB connection string)
2. PORT (Port number)
3. JWT_SECRET (Secret key for JWT)
4. SALT_ROUNDS (Number of rounds for bcrypt)

## Installation
1. Run `npm install` or `yarn install` in each directory to install all dependencies.
2. Run `npm run startDev` or `yarn startDev` in **back-end** directory to start the server.
3. Run `npm run dev` or `yarn dev` in **front-end** directory to start the client in web browser.

## Optional
- If you use yarn and you have python installed, you can run `python run.py` in the root directory to start both the server and the client(no `yarn install` needed!).

