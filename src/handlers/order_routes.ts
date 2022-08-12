import express,{ Request, Response} from 'express';
import { ProductModel} from '../models/product';
import { Order , OrderModel} from '../models/order';
import * as bodyParser from 'body-parser';
import { verifyAuthToken } from './user_routes';

const orders=new OrderModel();

const create = async (req: Request, res: Response) => {
    try {
       const order: Order = {
           user_id:parseInt(req.params.id),
           status:"active"
       }
        const newOrder = await orders.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: Request, res: Response) => {
    try {
       const orderId=req.params.id;
        const order = await orders.show(orderId);
        res.json(order)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const index = async (req: Request, res: Response) => {
    try {
        const orders_data = await orders.index();
        res.json(orders_data)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const addProductToOrder= async (req: Request, res: Response) => {
    const orderId=req.params.id;
    const productId=req.params.pid;
    const quantity=req.body.quantity;
    try {
         const result = await orders.addProductToOrder(orderId,productId,quantity);
         res.json(result);
     } catch(err) {
         res.status(400)
         res.json(err)
     }
    
}
const checkout= async (req: Request, res: Response) => {
    const orderId=req.params.id;
   
    try {
         const result = await orders.checkout(orderId);
         res.json(result);
     } catch(err) {
         res.status(400)
         res.json(err)
     }
    
}
const getCompleted= async (req: Request, res: Response) => {
    const userId=req.params.id;
    try {
        const result = await orders.getCompleted(userId);
        res.json(result);
    } catch(err) {
        res.status(400)
        res.json(err)
    }

}
const getCurrentOrderByUser= async (req: Request, res: Response) => {
    const userId=req.params.id;
    try {
        const result = await orders.getcurrentUserOrder(userId);
        res.json(result);
    } catch(err) {
        res.status(400)
        res.json(err)
    }

}

var jsonParser = bodyParser.json();
const orderRoutes = (app: express.Application) => {
    app.get('/orders', jsonParser,verifyAuthToken,index)
    app.get('/orders/:id',jsonParser, verifyAuthToken,show)
    app.post('/users/:id/orders', jsonParser,verifyAuthToken,create)
    app.get('/users/:id/orders', jsonParser,verifyAuthToken,getCurrentOrderByUser)
    app.post('/orders/:id/products/:pid',jsonParser,verifyAuthToken,addProductToOrder)
    app.put('/orders/:id',jsonParser,verifyAuthToken,checkout)
    app.get('/orders/completed/user/:id',jsonParser,verifyAuthToken, getCompleted)
}
  
export default orderRoutes;