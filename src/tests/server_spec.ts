import supertest from "supertest";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { User } from "../models/user";
import app from "../server";
const request = supertest(app);

describe("User EndPoint Responses Tests ", ():void => {
    it("expect reaches the main api endpoint", async ():Promise<void> => {
      const res = await request.get("/");
      expect(res.status).toBe(200);
    });
    it("expect reaches the users index but gets unauthorized response", async ():Promise<void> => {
      const res = await request.get("/users");
      expect(res.status).toBe(401);
    });
    it("expect reaches the user show funcion but gets unauthorized response", async ():Promise<void> => {
        const res = await request.get("/users/1");
        expect(res.status).toBe(401); 
    });
    it("expect reaches the user creation funcion", async ():Promise<void> => {
        const user:User={
                    username: "christinaessam",
                    firstname: "christina",
                    lastname: "essam",
                    password:"testPassword"
                }
        const res = await request.post("/users").send(user);
        expect(res.status).toBe(200);
    });
});

describe("Product EndPoint Responses Tests ", ():void => {

    it("expect reaches the products index", async ():Promise<void> => {
      const res = await request.get("/products");
      expect(res.status).toBe(200);
    });
    it("expect reaches the product show funcion", async ():Promise<void> => {
        const res = await request.get("/products/1");
        expect(res.status).toBe(200); 
    });
    it("expect reaches the product creation funcion but unauthorized", async ():Promise<void> => {
        const product:Product={
                    name: 'Product3',
                    price: 100
                }
        const res = await request.post("/products").send(product);
        expect(res.status).toBe(401);
    });
    it("expect reaches the top products", async ():Promise<void> => {
        const product:Product={
                    name: 'Product3',
                    price: 100
                }
        const res = await request.get("/top_products");
        expect(res.status).toBe(200);
    });
});


describe("Order EndPoint Responses Tests ", ():void => {

    it("expect reaches the orders index", async ():Promise<void> => {
      const res = await request.get("/orders");
      expect(res.status).toBe(200);
    });
    it("expect reaches the order show funcion", async ():Promise<void> => {
        const res = await request.get("/orders/1");
        expect(res.status).toBe(200); 
    });
    it("expect reaches the order creation funcion", async ():Promise<void> => {
        const user_id=1;
        const order:Order={
            user_id: user_id
        }
        const res = await request.post(`/users/${user_id}/orders`).send(order);
        expect(res.status).toBe(200);
    });
    it("add product to order endpoint", async ():Promise<void> => {
        const res = await request.post("/orders/1/products/1").send({quantity:1});
        expect(res.status).toBe(200);
    });
    it("expect complete the order ", async ():Promise<void> => {
        const res = await request.put("/orders/1");
        expect(res.status).toBe(200);
    });
});