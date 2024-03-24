import request from 'supertest'
import app from '../../src/index'

describe('test POST /login', () => {
  test('it should return with 200 success', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        password: 'Nuel1234',
        email: 'nuel@adeyemi.com',
      })
      .expect('Content-Type', /json/)
      .expect(200)
    // expect(response.status).toBe('success')
  })
})
