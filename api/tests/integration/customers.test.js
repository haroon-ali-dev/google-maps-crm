const request = require('supertest');
const db = require('../../../client/cypress/db');
const util = require('../util');

const baseUrl = 'http://localhost:3001';
let token;
let userId = '64ee405af0732ea131533f38';

describe('/api/customers', () => {
    beforeAll(async () => {
        await db.mongoose.connect("mongodb://127.0.0.1:27017/crm");
        token = await util.getToken();
    });

    beforeEach(async () => {
        await db.seed();
    });

    afterAll(async () => {
        await db.mongoose.connection.close();
    });

    it('should get customers', async () => {
        const response = await request(baseUrl)
            .get(`/api/customers/user/${userId}`)
            .set('x-auth-token', token);

        expect(response.body.customers[0]).toHaveProperty('name', 'Gary Smith');
    });

    it('should get one customer', async () => {
        const customer = new db.Customer({ userId, name: 'Samantha Thomas', email: 'samantha@gmail.com', postcode: 'M16 0EF' });
        await customer.save();

        const response = await request(baseUrl)
            .get(`/api/customers/${customer._id}`)
            .set('x-auth-token', token);

        expect(response.body.customer).toHaveProperty('name', 'Samantha Thomas');
    });
});