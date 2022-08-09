import express,{ Request, Response} from 'express';
import { Product , ProductModel} from '../models/product';
import * as bodyParser from 'body-parser';
import jwt from "jsonwebtoken";

const {TOKEN_SECRET} =process.env; 

const products=new ProductModel();

const create = async (req: Request, res: Response) => {
    try {
       const product: Product = {
           name: req.body.name,
           price: req.body.price
       }
        const newProduct = await products.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: Request, res: Response) => {
    try {
       const productId=req.params.id;
        const product = await products.show(productId);
        res.json(product)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const index = async (req: Request, res: Response) => {
    try {
        const products_data = await products.index();
        res.json(products_data)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const verifyAuthToken = (req: Request, res: Response, next:Function) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(authorizationHeader){
             const token = authorizationHeader.split(' ')[1]
            const decoded = jwt.verify(token, TOKEN_SECRET as string)
        next()
            
        }else{
            res.status(401)
            res.send("Unauthorized product")
        }
    } catch (error) {
        res.status(401)
        res.send("Unauthorized product ")

    }
}

var jsonParser = bodyParser.json();
const productRoutes = (app: express.Application) => {
    app.get('/products', jsonParser,index)
    app.get('/products/:id',jsonParser, show)
    app.post('/products', jsonParser,verifyAuthToken,create)
    // app.delete('/products/:id', jsonParser,destroy)
}
  
export default productRoutes;