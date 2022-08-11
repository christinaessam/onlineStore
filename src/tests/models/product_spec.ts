import { Product , ProductModel} from '../../models/product';

const products=new ProductModel();


describe("Product Model", () => {
  it('should have an index method', () => {
    spyOn(console, 'log').and.callThrough();
    expect(products.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(products.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(products.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const product: Product = {
        name: 'Product1',
        price: 100
    }
    const result = await products.create(product);
    product.id=2;
    expect(result).toEqual(product);
  });

  it('index method should return a list of products', async () => {
    const result = await products.index();
    expect(result).toEqual([{
        id:2,
        name: 'Product1',
        price: 100
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await products.show("2");
    expect(result).toEqual({
        id:2,
        name: 'Product1',
        price: 100
    });
  });
});