import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config(); 

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_TEST_NAME, ENV } =
	process.env; 

console.log(ENV);
let db:Pool ;
if (ENV == "dev") {
	db = new Pool({
		host: DB_HOST,
		database: DB_NAME,
		user: DB_USER,
		password: DB_PASSWORD,
	});
} else {
	db = new Pool({
		host: DB_HOST,
		database: DB_TEST_NAME,
		user: DB_USER,
		password: DB_PASSWORD,
	});
}

export default db;
