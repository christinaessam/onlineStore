import { Order , OrderModel} from '../../models/order';

const orders=new OrderModel();


describe("Order Model", () => {
  it('should have an index method', () => {
    spyOn(console, 'log').and.callThrough();
    expect(orders.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(orders.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(orders.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const order: Order = {
        user_id: 1,
        status:"active"
    }
    const result = await orders.create(order);
    order.id=1;
    expect(result).toEqual(order);
  });

  it('index method should return a list of orders', async () => {
    const result = await orders.index();
    expect(result).toEqual([{
        id:1,
        user_id: 1,
        status:"active"
    }]);
  });

  it('show method should return the correct order', async () => {
    const result = await orders.show("1");
    expect(result).toEqual({
        id:1,
        user_id: 1,
        status:"active"
    });
  });
});