# StoreFront-Backend-API

StoreFront is an online shopping store Api that display coffee available for purchase.

# API Functionality
An Express based RESTful API design was used to access a Postgres database for data storage and retrieval.
Using JWT tokens to provide stateless authenticated access for retreiving and storing data in persistent storage.

This API provides the following Endpoints :

1.  Create coffees for the online store
2.  View all the coffees products that are available in the store
3.  View all the coffees products in different category
4.  View a single coffees products
5.  update and Delete coffees products 
6.  Create, update, delete users account
7.  Authenticate users account
8.  List available users
9.  Allow authenticated users to place an order on a product
10. show details and add coffee products to Orders using a shopping basket


# Installation and Environment Setup

The following steps outline will set you up on how to install the app on your local machine.

1. Clone this repository 

```
git clone https://github.com/Azutech/StoreFront-Backend-API
```
2. From the terminal, change directory to storefront app folder 

```
cd StoreFront-Backend-API
```
3. Run `npm install` This will install the necessary packages and dependencies based on the supplied package.json.

4. Then run the app with the command `npm start`

5. Once these are set, start an instance of Postgres ensure Postgres is started on port **5432**.

NOTE: Depending on your system configuration it may be necessary to install db-migrate globally, i.e.

```
npm intstall -g db-migrate
```

If you wish to contribute to this project, before any of the steps above, you would need to fork this project first. You're ready to hack (and | or contribute) :v:

# Setup the required databases

In order to use the API you must pre-configure the initial database. To do so access the psql prompt as postgres on the installed Postgres database and enter the following commands at the prompt:

```
CREATE DATABASE coffeestore;
CREATE DATABASE coffee_test; 

```

# Running the Jasmine Tests

To run the jasmine tests use the following commands:

```
npm run test-db
```
this will run migration test.

To run models and endpoints test run the following command

```
npm run watch
```

run the following command to drop the test database

```
npm run drop-db-test
```

# Authors

Github:[@Azutech](https://github.com/Azutech)\
LinkedIn:[Emmanuel Onugha](https://www.linkedin.com/in/emmanuel-onugha/)\
Twitter:[@salimkarbm](https://twitter.com/itz_azu)


   - Give a :star: if you like this project