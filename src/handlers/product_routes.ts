import express,{ Request, Response} from 'express';
import { Product , ProductModel} from '../models/product';
import * as bodyParser from 'body-parser';
import { verifyAuthToken } from './user_routes';

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

const topProducts = async (req: Request, res: Response)=>{
    try {
        const top_products = await products.topProducts();
        res.json(top_products)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

var jsonParser = bodyParser.json();
const productRoutes = (app: express.Application) => {
    app.get('/products', jsonParser,index)
    app.get('/products/:id',jsonParser, show)
    app.post('/products', jsonParser,verifyAuthToken,create)
    app.get('/top_products',jsonParser, topProducts)
}
  
export default productRoutes;