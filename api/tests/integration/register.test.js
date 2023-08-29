const request = require('supertest');
const db = require('../../../client/cypress/db');

const baseUrl = 'http://localhost:3001';

describe('/api/register', () => {
    beforeEach( async () => {
        await db.seed();
    });

    it('should respond with 400 if password is missing', async () => {
        const response = await request(baseUrl)
            .post('/api/register')
            .send({ email: 'haroon@gmail.com' });

        expect(response.status).toBe(400);
    });
});