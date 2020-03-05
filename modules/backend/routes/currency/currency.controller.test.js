const request = require('supertest')
const app = require('../../../backend')

afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});

describe('Get Endpoints', () => {
    it('should create a new get endpoint', async () => {
        const res = await request(app)
            .get('/convert')
            .send({
                "amount": 10,
                "src_currency":"USD",
                "dest_currency":"NOK",
                "reference_date":"2020-02-03"
            });
        expect(res.status).toEqual(200)
    })
});

describe('Check valid number', () => {
    it('should check for a valid number', async () => {
        const res = await request(app)
            .get('/convert')
            .send({
                "amount": 10,
                "src_currency":"USD",
                "dest_currency":"NOK",
                "reference_date":"2020-02-03"
            });
        expect(res.status).toEqual(200)
    })
});

describe('Missing parameters', () => {
    it('should check for missing params', async () => {
        const res = await request(app)
            .get('/convert')
            .send({
                "src_currency":"USD",
                "dest_currency":"NOK",
                "reference_date":"2020-02-03"
            });
        expect(res.status).toEqual(500)
    })
});

describe('Check Invalid date', () => {
    it('should check invalid date type', async () => {
        const res = await request(app)
            .get('/convert')
            .send({
                "amount": 10,
                "src_currency":"USD",
                "dest_currency":"NOK",
                "reference_date":"ddddss0-02-0dd3"
            });
        expect(res.status).toEqual(500)
    })
});

describe('Check Invalid Number', () => {
    it('should check for invalid number', async () => {
        const res = await request(app)
            .get('/convert')
            .send({
                "amount": "test",
                "src_currency":"USD",
                "dest_currency":"NOK",
                "reference_date":"2020-02-03"
            });
        expect(res.status).toEqual(500)
    })
});

describe('Check converted currency ', () => {
    it('should check for the right  currency', async () => {
        const res = await request(app)
            .get('/convert')
            .send({
                "amount":50,
               "src_currency":"BGN",
                "dest_currency":"EUR",
                "reference_date":"2020-02-28"
               });
        expect(res.status).toEqual(200)
        expect({ amount: 25.564986194907455, dest_currency: "EUR" })
        
           })
});