import { CoffeeStore } from "../model/products";

const store = new CoffeeStore()

describe('Test Products', () => {
    it( 'it should have a getallproducts method', () => {
        expect(store.getProductsall).toBeDefined();
    } )
})

describe('Test Products', () => {
    it( 'it should have a getProductsById method', () => {
        expect(store.getProductsById).toBeDefined();
    } )
})

describe('Test Products', () => {
    it( 'it should have a createProduct method', () => {
        expect(store.create).toBeDefined();
    } )
})

describe('Test Products', () => {
    it( 'it should have a destroyProduct method', () => {
        expect(store.destroyProduct).toBeDefined();
    } )
})
describe('Test Products', () => {
    it( 'it should have a updateProduct method', () => {
        expect(store.updateProduct).toBeDefined();
    } )
})
