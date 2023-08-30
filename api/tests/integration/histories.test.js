const request = require('supertest');
const db = require('../../../client/cypress/db');
const util = require('../util');

const baseUrl = 'http://localhost:3001';
let token;
let userId = '64ee405af0732ea131533f38';

describe('/api/histories', () => {
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

    // it('should get customers', async () => {
    //     const response = await request(baseUrl)
    //         .get(`/api/customers/user/${userId}`)
    //         .set('x-auth-token', token);

    //     expect(response.body.customers[0]).toHaveProperty('name', 'Gary Smith');
    // });

    it('should get one history', async () => {
        customer = new db.Customer({ userId, name: 'Samantha Thomas', email: 'samantha@gmail.com', postcode: 'M16 0EF' });
        await customer.save();

        history = new db.History({ customerId: customer._id, date: '2022-03-09', info: 'Closed account.' });
        await history.save();

        const response = await request(baseUrl)
            .get(`/api/histories/${history._id}`)
            .set('x-auth-token', token);

        expect(response.body.history).toHaveProperty('customerId');
    });

    it('should get histories of a customer', async () => {
        customer = new db.Customer({ userId, name: 'Samantha Thomas', email: 'samantha@gmail.com', postcode: 'M16 0EF' });
        await customer.save();

        history = new db.History({ customerId: customer._id, date: '2022-03-09', info: 'Closed account.' });
        await history.save();

        const response = await request(baseUrl)
            .get(`/api/histories/customer/${customer._id}`)
            .set('x-auth-token', token);

        expect(response.body.histories[0]).toHaveProperty('info', 'Closed account.');
    });

    it('should create a history', async () => {
        customer = new db.Customer({ userId, name: 'Samantha Thomas', email: 'samantha@gmail.com', postcode: 'M16 0EF' });
        await customer.save();

        const response = await request(baseUrl)
            .post(`/api/histories/${customer._id}`)
            .set('x-auth-token', token)
            .send({ customerId: customer._id, date: '2022-09-08', info: 'Opened a new account.' });

        expect(response.body.history).toHaveProperty('info', 'Opened a new account.');
    });

    it('should update a history', async () => {
        customer = new db.Customer({ userId, name: 'Samantha Thomas', email: 'samantha@gmail.com', postcode: 'M16 0EF' });
        await customer.save();

        history = new db.History({ customerId: customer._id, date: '2022-03-09', info: 'Closed account.' });
        await history.save();

        let response = await request(baseUrl)
            .put(`/api/histories/${history._id}`)
            .set('x-auth-token', token)
            .send({ date: '2022-03-09', info: 'Created another account again.' });

        expect(response.status).toBe(200);
    });
});