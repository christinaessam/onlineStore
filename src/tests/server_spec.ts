import supertest from "supertest";
import { Order } from "../models/order";
import { Product } from "../models/product";
import { User, UserModel } from "../models/user";
import userToken from "./models/auser_spec";
import app from "../server";
const request = supertest(app);
const users=new UserModel();

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
    let token:string;
    beforeAll(async function() {
        const user: User = {
            username: "christinaaaessam",
            firstname: "christina",
            lastname: "essam",
            password:"testfirstnewpass"
        }
        const result = await users.create(user);
        token =result;
    });
    it("expect reaches the orders index", async ():Promise<void> => {
      const res = await request.get("/orders").set("Authorization",`Bearer ${token}`);
      expect(res.status).toBe(200);
    });
    it("expect reaches the order show funcion", async ():Promise<void> => {
        const res = await request.get("/orders/1").set("Authorization",`Bearer ${token}`);
        expect(res.status).toBe(200); 
    });
    it("expect reaches the order creation funcion", async ():Promise<void> => {
        const user_id=1;
        const order:Order={
            user_id: user_id
        }
        const res = await request.post(`/users/${user_id}/orders`).send(order).set("Authorization",`Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("add product to order endpoint", async ():Promise<void> => {
        const res = await request.post("/orders/1/products/1").send({quantity:1}).set("Authorization",`Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it("expect complete the order ", async ():Promise<void> => {
        const res = await request.put("/orders/1").set("Authorization",`Bearer ${token}`);;
        expect(res.status).toBe(200);
    });
});
// describe('Protected Routes Tests', ():void => {
//     let token:string ;
//     beforeAll(async function() {
//         const user: User = {
//             username: "christinaaaessam",
//             firstname: "christina",
//             lastname: "essam",
//             password:"testfirstnewpass"
//         }
//         const result = await users.create(user);
//         token =result;
//     });
    
//     it('Get all orders', async function() {
//         // console.log("userToken: ",token);
//         const res = await request.get("/orders").set("Authorization",`Bearer ${token}`);
//         expect(res.status).toBe(200); 
//     });
    
//     it('Get order with id ', async function() {
//         // console.log("userToken: ",token);
//         const res = await request.get("/orders/1").set("Authorization",`Bearer ${token}`);
//         expect(res.status).toBe(200); 
//     });

//     it('Get user orders ', async function() {
//         // console.log("userToken: ",token);
//         const res = await request.get("/users/1/orders").set("Authorization",`Bearer ${token}`);
//         expect(res.status).toBe(200); 
//     });

// });