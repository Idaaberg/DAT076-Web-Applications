# BookShelf

## Prerequisites

Before you can use the app, make sure you have the following installed:

- [Beekeeper Studio](https://www.beekeeperstudio.io/)
- [Docker Desktop](https://docs.docker.com/desktop/)
- Your preferred IDE

## Setup Instructions

### Clone the Repository

Start by cloning the repository from GitHub:
```
git clone https://github.com/Idaaberg/DAT076-Web-Applications
```

### Create .env File

In the root directory of the project, create a `.env` file to store secret passwords and keys. Add the following variables and set appropriate values for them:

- `SESSION_SECRET`
- `DB_PASSWORD`

Make sure to add `.env` to your `.gitignore` file to avoid committing sensitive data.

### Set Up the Database

To set up the database, create a Docker container with the following command. Replace `<password>` with the password you created in the `.env` file:

```
docker run --env POSTGRES_USER=app_db_user \
    --env POSTGRES_PASSWORD=<password> \
    --publish 54321:5432 --name web_apps_db \
    --detach postgres:17
```

You can check if the container is running by using the following command:
```
docker ps
```

### Connect to the database

Open Beekeeper Studio and press "Import from URL". Paste the following connection string, replacing `<password>` with the one you chose before:
```
postgres://app_db_user:<password>@localhost:54321
```

Fill in the other fields and press "Connect".


### Use an in-memory database (optional)

If you're having issues with setting up the database, you can use an in-memory database by adding `NODE_ENV=test` to your .env file.

### Install dependencies

Before running the application, install all the dependencies in both the client and server directories by running:
```
npm install
```

### Run the application

Finally, start the application by running the following command in both the client and server directories. Open two separate terminals to run both commands:
```
npm run dev
```
