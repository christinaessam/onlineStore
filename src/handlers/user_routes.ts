import express,{ Request, Response} from 'express';
import { User , UserModel} from '../models/user';
import * as bodyParser from 'body-parser';
import jwt from "jsonwebtoken";

const {TOKEN_SECRET} =process.env; 

const users=new UserModel();

const create = async (req: Request, res: Response) => {
    try {
       const user: User = {
           username: req.body.username,
           firstname: req.body.firstname,
           lastname: req.body.lastname,
           password:req.body.password
       }
        const newUser = await users.create(user)
        res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const show = async (req: Request, res: Response) => {
    try {
       const userId=req.params.id;
        const user = await users.show(userId);
        res.json(user)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}
const index = async (req: Request, res: Response) => {
    try {
        const users_data = await users.index();
        res.json(users_data)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const authentication = async (req: Request, res: Response) => {
    try {
       const username=req.body.username;
       const password=req.body.password;
        const authdata = await users.authentication(username,password);
        res.json(authdata)
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
            res.send("Unauthorized user")
        }
    } catch (error) {
        res.status(401)
        res.send("Unauthorized user ")

    }
}

var jsonParser = bodyParser.json();
const userRoutes = (app: express.Application) => {
    app.get('/users', jsonParser,verifyAuthToken,index)
    app.get('/users/:id',jsonParser,verifyAuthToken, show)
    app.post('/users', jsonParser,create)
    app.post('/users/signin',jsonParser,authentication)
}
  
export default userRoutes;
export {verifyAuthToken};