import { User , UserModel} from '../../models/user';
import jwt from "jsonwebtoken";

const users=new UserModel();
const { PEPPER, SALT, TOKEN_SECRET } = process.env;

describe("User Model", () => {
  it('should have an index method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(users.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(users.index).toBeDefined();
  });

  it('create method should add a user and returns the user token', async () => {
    const user: User = {
        id:1,
        username: "christinaessam",
        firstname: "christina",
        lastname: "essam",
        password:"testfirstpass"
    }
    const result = await users.create(user);
    const token = jwt.sign(user, TOKEN_SECRET as string);
    expect(result).toEqual(token);
  });

  it('index method should return a list of users', async () => {
    const result = await users.index();
    expect(result).toEqual([{
        id:1,
        username: "christinaessam",
        firstname: "christina",
        lastname: "essam",
        password:"$2b$10$Wv.ilDZi5kMIUR9K/hkmVOZ5R3tWFypgYf6nxwk8qpyEawjCEfLlO"
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await users.show("1");
    expect(result).toEqual({
        id:1,
        username: "christinaessam",
        firstname: "christina",
        lastname: "essam",
        password:"$2b$10$Wv.ilDZi5kMIUR9K/hkmVOZ5R3tWFypgYf6nxwk8qpyEawjCEfLlO"
    });
  });

//   it('delete method should remove the user', async () => {
//     users.delete("1");
//     const result = await users.index()

//     expect(result).toEqual([]);
//   });
});