import db from "../database";
import dotenv from "dotenv";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

export type User = {
	id?: number;
	username: string;
	firstname?: string;
	lastname?: string;
	password: string;
};
const { PEPPER, SALT, TOKEN_SECRET } = process.env;

export class UserModel {
	async index(): Promise<User[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM users";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`can't get users ${error}`);
		}
	}

	async create(user: User): Promise<string> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO users (username, firstname, lastname,password) VALUES($1, $2, $3, $4) RETURNING *";
			const hash = bcrypt.hashSync(
				user.password + (PEPPER ? PEPPER : ""),
				parseInt(SALT ? SALT : "")
			);
			const result = await conn.query(sql, [
				user.username,
				user.firstname,
				user.lastname,
				hash,
			]);
			conn.release();
			const u: User = result.rows[0];
			const token = jwt.sign(u, TOKEN_SECRET as string);
			return token;
		} catch (err) {
			throw new Error(`Could not add new user. Error: ${err}`);
		}
	}
	async show(userId: string): Promise<User> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM users WHERE id=($1)";
			const result = await conn.query(sql, [userId]);
			conn.release();
			const u: User = result.rows[0];
			return u;
		} catch (err) {
			throw new Error(`Could not add new user. Error: ${err}`);
		}
	}

	async authentication(
		username: string,
		password: string
	): Promise<User | string> {
		try {
			const conn = await db.connect();
			const sql = "select password from users where username=($1)";
			const result = await conn.query(sql, [username]);
			if (result.rows.length) {
				const user = result.rows[0];
				if (bcrypt.compareSync(password + PEPPER, user.password)) {
					const token = jwt.sign(user, TOKEN_SECRET as string);
					return token;
				} else {
					return "invalid password";
				}
			} else {
				return "invalid username";
			}
		} catch (err) {
			throw new Error(`Could not find  user. Error: ${err}`);
		}
	}
}
