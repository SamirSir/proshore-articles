# Welcome to PROSHORE articles

## Prerequisites

- node >= `16.x`
- npm >= `v1.22.x` or yarn >= `v1.22.22`
- Familiar with TypeScript 💪

## How to use

clone this repo with `https` / `ssh` / `github cli`

```sh
git clone https://github.com/SamirSir/proshore-articles.git
```

After cloning this repo, make sure you have duplicated the .env.example file to .env, don't let the .env.example file be deleted or renamed.

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install

or

yarn install

or

yarn
```

## Build the project

To incrementally build the project:

```sh
npm run build

or

yarn build
```

## Start the project

To incrementally start the project:

```sh
npm run start

or

yarn start
```

## Run the migrations

To create tables in database run the following sequelize commands

```sh
npx sequelize --options-path ./.sequelize db:migrate 
```

## Endpoints

To test endpoints, make HTTP request routes in your postman

Auth routes 
```sh
POST http://localhost/api/v1/auth/signup
POST http://localhost/api/v1/auth/login
```

Articles Routes
Once a user is signup, login to get access token and authorize following routes with Bearer <access_token>
```sh
GET http://localhost/api/v1/articles/
POST http://localhost/api/v1/articles/
GET http://localhost/api/v1/articles/:id
PUT http://localhost/api/v1/articles/:id
DELETE http://localhost/api/v1/articles/:id
```
