import  {OrdersLog}  from "../model/orders";

const store = new OrdersLog()


describe('Test Orders', () => {
    it( 'it should have a getAllOrders method', () => {
        expect(store.getAllOrders).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a createOrder method', () => {
        expect(store.createOrder).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a getOrderById method', () => {
        expect(store.getOrderById).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a showUserOrders method', () => {
        expect(store.showUserOrders).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a activeOrders method', () => {
        expect(store.activeOrders).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a completedOrders method', () => {
        expect(store.completedOrders).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    } )
})
describe('Test Orders', () => {
    it( 'it should have a destroy method', () => {
        expect(store.destroy).toBeDefined();
    } )
})