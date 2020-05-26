const request = require('supertest')
const express = require('express')
const app = express()

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/add')
      .send({
        placeName: '',
        dateFrom: '',
        dateTo: '',
        length: '',
        lat: '',
        lng: '',
        weather: '',
        maxTemp: '',
        lowTemp: ''
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  })
})