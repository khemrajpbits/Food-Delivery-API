const request = require('supertest');
const app = require('../app');
const Customer = require('../models/Customer');
const mongoose = require('mongoose');

// const connectDB = require('../config/db');
// const closeDB = require('../config/db');


describe('Customer API', () => {
    beforeAll(async () => {
        // await connectDB();
        mongoose.connect('mongodb+srv://Cluster95194:Lavleen@cluster95194.fiw1c.mongodb.net/food_delivery_db', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected'))
            .catch(err => console.log(err));
    });

    afterAll(async () => {
        await Customer.deleteMany({});
        // await closeDB();
        mongoose.connection.close();
    });

    describe('POST /api/customers', () => {
        it('should create a new customer', async () => {
            const response = await request(app)
                .post('/api/customers')
                .send({
                    name: 'John Doe',
                    email: 'johndoe@example.com',
                    phone: '1234567890',
                    address: '123 Main St, Any town, USA'
                });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('_id');
            expect(response.body.name).toBe('John Doe');
        });
    });

    // describe('GET /api/customers', () => {
    //     it('should return all customers', async () => {
    //         const response = await request(app).get('/api/customers');

    //         expect(response.status).toBe(200);
    //         expect(Array.isArray(response.body)).toBe(true);
    //     });
    // });

    // describe('GET /api/customers/:customer_id', () => {
    //     it('should return a specific customer', async () => {
    //         const newCustomer = await Customer.create({
    //             name: 'Jane Doe',
    //             email: 'janedoe@example.com',
    //             phone: '0987654321',
    //             address: '456 Main St, Any town, USA'
    //         });

    //         const response = await request(app).get(`/api/customers/${newCustomer._id}`);

    //         expect(response.status).toBe(200);
    //         expect(response.body.name).toBe('Jane Doe');
    //     });
    // });

    // describe('PUT /api/customers/:customer_id', () => {
    //     it('should update a customer', async () => {
    //         const newCustomer = await Customer.create({
    //             name: 'Alice Doe',
    //             email: 'alicedoe@example.com',
    //             phone: '1231231234',
    //             address: '789 Main St, Any town, USA'
    //         });

    //         const response = await request(app)
    //             .put(`/api/customers/${newCustomer._id}`)
    //             .send({
    //                 address: 'New Address, Any town, USA'
    //             });

    //         expect(response.status).toBe(200);
    //         expect(response.body.address).toBe('New Address, Any town, USA');
    //     });
    // });

    // describe('DELETE /api/customers/:customer_id', () => {
    //     it('should delete a customer', async () => {
    //         const newCustomer = await Customer.create({
    //             name: 'Bob Doe',
    //             email: 'bobdoe@example.com',
    //             phone: '5555555555',
    //             address: '101 Main St, Any town, USA'
    //         });

    //         const response = await request(app).delete(`/api/customers/${newCustomer._id}`);

    //         expect(response.status).toBe(204); // No Content
    //     });
    // });
});
