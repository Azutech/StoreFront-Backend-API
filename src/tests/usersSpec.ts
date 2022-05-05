import { UserStore} from "../model/user";

const userUX = new UserStore()

describe('Test User', () => {
    it( 'it should have a createUser method', () => {
        expect(userUX.createUser).toBeDefined();
    } )
})
describe('Test User', () => {
    it( 'it should have a getUsers method', () => {
        expect(userUX.getUsers).toBeDefined();
    } )
})
describe('Test User', () => {
    it( 'it should have a getUserById method', () => {
        expect(userUX.getUserById).toBeDefined();
    } )
})
describe('Test User', () => {
    it( 'it should have a authenticate method', () => {
        expect(userUX.authenticate).toBeDefined();
    } )
})
describe('Test User', () => {
    it( 'it should have a deleteUser method', () => {
        expect(userUX.deleteUser).toBeDefined();
    } )
})