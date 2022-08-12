import db from "../database";

export type Order = {
	id?: number;
	user_id: number;
	status?: string;
};

export class OrderModel {
	async index(): Promise<Order[]> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM orders";
			const result = await conn.query(sql);
			conn.release();
			return result.rows;
		} catch (error) {
			throw new Error(`can't get orders ${error}`);
		}
	}

	async create(order: Order): Promise<Order> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";

			const result = await conn.query(sql, [
				order.user_id,
				order.status
			]);
			conn.release();
			const p: Order = result.rows[0];
			return p;
		} catch (err) {
			throw new Error(`Could not add new order. Error: ${err}`);
		}
	}
	async show(orderId: string): Promise<Order> {
		try {
			const conn = await db.connect();
			const sql = "SELECT * FROM orders WHERE id=($1)";
			const result = await conn.query(sql, [orderId]);
			conn.release();
			const p: Order = result.rows[0];
			return p;
		} catch (err) {
			throw new Error(`Could not add new order. Error: ${err}`);
		}
	}
    async addProductToOrder(orderId: string,productId:string,quantity:number): Promise<Order> {
		try {
			const conn = await db.connect();
			const sql =
				"INSERT INTO order_products (order_id, product_id, product_quantity) VALUES($1, $2, $3) RETURNING *";

			const result = await conn.query(sql, [orderId,productId,quantity]);
			conn.release();
			const p= result.rows[0];
			return p;
		} catch (err) {
			throw new Error(`Could not add new product to order . Error: ${err}`);
		}
	}

    async checkout(orderId:string):Promise<Order>{
        try {
			const conn = await db.connect();
			const sql =
				"UPDATE orders SET status='complete' WHERE id=$1 RETURNING *";

			const result = await conn.query(sql, [orderId]);
			conn.release();
			const order:Order= result.rows[0];
			return order;
		} catch (err) {
			throw new Error(`Could not update order . Error: ${err}`);
		}
    }

	async getCompleted(userId:string):Promise<Order[]>{
		try {
			const conn = await db.connect();
			const sql =
				"SELECT * FROM orders WHERE user_id=$1 AND status='complete' ";

			const result = await conn.query(sql, [userId]);
			conn.release();
			const orders:Order[]= result.rows;
			return orders;
		} catch (err) {
			throw new Error(`Could not update order . Error: ${err}`);
		}

	}
	async getcurrentUserOrder(userId:string):Promise<Order[]>{
		try {
			const conn = await db.connect();
			const sql =
				"SELECT * FROM orders WHERE user_id=$1 AND status='active' ";

			const result = await conn.query(sql, [userId]);
			conn.release();
			const orders:Order[]= result.rows;
			return orders;
		} catch (err) {
			throw new Error(`Could not update order . Error: ${err}`);
		}

	}

}
