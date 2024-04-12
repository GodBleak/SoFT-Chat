# SoFT Chat

## About

This is an example chat app using the [SoFT](https://github.com/GodBleak/SoFT) stack. It's largely based on [Feathers Chat](https://github.com/feathersjs/feathers-chat/tree/dove/feathers-chat-ts), but using [SolidJS](https://www.solidjs.com/) for the front-end.

_This was created from the [SoFT template](https://github.com/GodBleak/SoFT)_.

## Setup

- Clone this repo
- Run `npm install` to install dependencies
- Run `npm run generate:secret` to generate the JWT secret
- Replace `CHANGE_ME` in `config/default.json` with the generated secret
- Run `npm run migrate` to create the database

## Usage

### Development

- Run `npm run dev` to start the development server, the app will be available at http://localhost:3030.

### Production

- Run `npm run build` to build your app for production. By default, the output will be in the `lib` folder.
- Run `npm start` to start the server in production mode.
