# Mentorly

## Overview
Mentorly is a platform that connects mentors and mentees, allowing experienced professionals to share their knowledge with those seeking guidance. This README provides an overview of the project and instructions for setting it up.

## Features
- User registration and authentication with JWT
- Profile creation and editing
- Viewing other users' profiles
- Searching for users with various filters

## Installation

1. Clone the repository:

    ```shell
    git clone
    cd mentorly
    npm install

2. Configure environment variables:

    Copy a .env.example to .env file and set the following variables:
    ```shell
    JWT_SECRET=
    PORT=
    DB_NAME=
    DB_USER=
    DB_PASSWORD=
    DB_HOST=
    DB_PORT=
    DATABASE_URL=

3. Database setup:
To set up and manage your database schema, we use database migrations. Follow these steps to run the migrations:

1. Ensure that you have the required environment variables set up in your `.env` file, including the database configuration.

2. Run the migrations using the following command:

    ```shell
    npx sequelize-cli db:create 
    npx sequelize-cli db:migrate   
    npx sequelize-cli db:seed:all 
Create a PostgreSQL database according to the configuration.

4. Start the application:

    ```shell
    npm start

5. Docker
docker compose up --build -d





