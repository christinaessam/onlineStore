# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index    => /products [GET]
- Show     => /products/:id [GET]
- Create [token required] => /products [POST]
- [OPTIONAL] Top 5 most popular products  => /top_products[GET]
- [OPTIONAL] Products by category (args: product category) 

#### Users
- Index [token required]   => /users     [GET]
- Show [token required]    => /users/:id [GET]
- Create N[token required] => /users     [POST]

#### Orders
- Current Order by user (args: user id)[token required] => /users/:id/orders [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]  => /orders/completed/user/:id [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category
Table: Products (id:serial, name:varchar, price:decimal)

#### User
- id
- firstName
- lastName
- password
Table: Users (id:serial, username:varchar, first_name:varchar , last_name:varchar , password:varchar)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
Table: Orders (id:serial , user_id:[FORIGN-KEY] , status:varchar)
Table: Order_Products (id:serial , order_id:[FORIGN-KEY] , product_id:[FORIGN-KEY] ,product_quantity:int)

## customize your environment 
you need to create database named [onlinestore] for development and another one named [onlinestore_test] for testing.
update [database.json] file with your database username and password
