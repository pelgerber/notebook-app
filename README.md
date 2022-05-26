# Notebook-app

This is a simple app that I have used to get started with next.js and Prisma.
Thanks to docker-compose you can get started real quick!


## Getting Started

All very simple, run docker-compose:

```bash
docker-compose up
```

Note:
The mysql database is initially empty in volume ```mysql-data```, so you need to create a table in order to perform queries with Prisma. To do so, open a terminal and connect to mysql container (make sure it is running with ```docker ps```): 

```bash
docker exec -it mysql bash
```

You can then connect to the database:
```bash
mysql -u root -p
```
the database password is the one you specify in the .env file in the environment var ```ENV_MYSQL_ROOT_PASSWORD```.

Last step, create the table! Run the following SQL commands to initialize the table:
```sql
/* select the database */
USE my_database;
/* create the table */
CREATE TABLE notes (id VARCHAR(36) NOT NULL, date DATETIME, title varchar(255), text LONGTEXT, PRIMARY KEY (id));
```

You're good to go!

Once that the containers are up you can check out the app in your browser at http://localhost:3000/