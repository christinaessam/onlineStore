## Getting Started

- To get started, clone this repo and run `yarn or npm i` in your terminal at the project root.
- create a .env file in the repo, it has to contain the following variables

DB_HOST="localhost"
DB_NAME="onlinestore"
DB_TEST_NAME="onlinestore_test"
DB_USER=username123
DB_PASSWORD=password123
SALT=10
PEPPER="FUowTjV"
TOKEN_SECRET="gwjuIhEETnbp"
NODE_ENV="dev"

- you have to create two databases with the value you set in DB_NAME, DB_TEST_NAME, this is an example for the SQL needed when connected to psql
`
CREATE USER username123 WITH PASSWORD 'password123';    
CREATE DATABASE onlinestore;  
\c onlinestore
GRANT ALL PRIVILEGES ON DATABASE onlinestore TO username123;
CREATE DATABASE onlinestore_test;
\c onlinestore_test
GRANT ALL PRIVILEGES ON DATABASE onlinestore_test TO username123;
`

## notes
before testing you shloud run [ npm run build ] 
## Local host ports
-for the database, port is not specified so it will run on the selected port for postgres installation (default is 5432)
-server is running on port 3000