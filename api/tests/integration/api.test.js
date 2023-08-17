const request = require('supertest');

const baseUrl = 'http://localhost:3001';

describe('test API', () => {
    it('should not work', async () => {
        const response = await request(baseUrl)
            .get('/register');

        expect(response.statusCode).toBe(404);
    });
});