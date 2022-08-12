import { User , UserModel} from '../../models/user';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
let userToken:string="";

const users=new UserModel();
const { PEPPER, SALT, TOKEN_SECRET } = process.env;

describe("User Model", () => {
  it('should have an index method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(users.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(users.create).toBeDefined();
  });

  let password:string;
  it('create method should add a user and returns the user token', async () => {
    const user: User = {
        username: "christinaaessam",
        firstname: "christina",
        lastname: "essam",
        password:"testfirstpass"
    }
    const result = await users.create(user);
    userToken=result;
    const u=await users.show("1")
    user.id=1;
    password=u.password;
    const token = jwt.sign(u, TOKEN_SECRET as string);
    expect(result).toEqual(token);
  });

  it('index method should return a list of users', async () => {
    const result = await users.index();
    expect(result).toEqual([{
        id:1,
        username: "christinaaessam",
        firstname: "christina",
        lastname: "essam",
        password:password
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await users.show("1");
    expect(result).toEqual({
        id:1,
        username: "christinaaessam",
        firstname: "christina",
        lastname: "essam",
        password:password
    });
  });

});

export default userToken;