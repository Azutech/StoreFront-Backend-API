const product = [{
    name: "Mocha",
    price: "$10",
    type: 'Cold',
    origin: "Italy"
}
]
const getallproducts = {
    tags: ["Products"],
    description: "List of products",
    responses: {
        200: {
            description: 'OK',
            content:{
                'application/json': {
                    schema:{
                        type: 'object',
                        example: {
                            count: 0,
                            products: []
                        }
                    }
                }
            }
        }
    }
}

const createProducts = {
    tags: ["Products"],
    description: "Create products",
    requestBody: {
        content:{
            'application/json': {
                schema:{
                   properties : {
                    name:{
                        type: 'string',
                        description: 'name  of the coffee'
                    },
                    price:{
                        type: 'string',
                        description: 'price  of the coffee'
                    },
                    type:{
                        type: 'string',
                        description: 'type  of the coffee whether its hot or cold'
                    },
                    origin:{
                        type: 'string',
                        description: 'The origin of the coffee'
                    }
                   }
                }
            }
        }
    },
    responses: {
        200: {
            description: 'OK',
            content:{
                'application/json': {
                    schema:{
                        type: 'object',
                        example: product[0]
                    }
                }
            }
        }
    }
}

const getProductById = {
    tags: ["Products"],
    description: "get products by their id",
    parameters: [
        {
            name: 'id',
            in: 'query',
            description: "get the id of the products",
            type: 'string',
            example: '2'
        }
    ],
    responses: {
        200: {
            description: 'OK',
            content:{
                'application/json': {
                    schema:{
                        type: 'object',
                        example: {
                            count: 0,
                            products: []
                        }
                    }
                }
            }
        },
        400: {
            description: "Users not found"
        }
    }
}

const destroyproducts = {
    tags: ["Products"],
    summary: 'Products will be deleted',
    parameters: [
        {
            name: 'id',
            in: 'query',
            description: "get the id of the products",
            type: 'string',
            example: '2'
        }
    ], 
    responses: {
        200: {
            description: 'OK',
            content:{
                'application/json': {
                    schema:{
                        type: 'object',
                        example: {
                            count: 0,
                            products: []
                        }
                    }
                }
            }
        },
        400: {
            description: "products not found"
        }
    }
}

const products ={
    "/api/products/coffees":{
        get: getallproducts,
        post: createProducts
     },
     "/api/products/coffees/id": {
            get: getProductById,
            delete: destroyproducts
     }
}


export default products