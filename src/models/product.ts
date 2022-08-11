import db from "../database";

export type Product = {
	id?: number;
	name: string;
	price: number;
};

export class ProductModel {
	async index(): Promise<Product[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM products";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`can't get products ${error}`);
		}
	}

	async create(product: Product): Promise<Product> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO products (name, price) VALUES($1, $2) RETURNING *";

			const result = await conn.query(sql, [
				product.name,
				product.price
			]);
			conn.release();
			const p: Product = result.rows[0];
			return p;
		} catch (err) {
			throw new Error(`Could not add new product. Error: ${err}`);
		}
	}
	async show(productId: string): Promise<Product> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM products WHERE id=($1)";
			const result = await conn.query(sql, [productId]);
			conn.release();
			const p: Product = result.rows[0];
			return p;
		} catch (err) {
			throw new Error(`Could not add new product. Error: ${err}`);
		}
	}

}
