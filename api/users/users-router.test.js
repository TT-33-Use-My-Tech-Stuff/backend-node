const request = require('supertest');
const server = require('../server');
const db = require('../../data/dbConfig');

test('sanity', () => {
  expect(true).toBe(true);
});

const paul = { username: 'Paul', email: 'paul@paul.com', password: 'abc123' };

//Set-up to handle migrations & destruction of test DB before and after each test
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db('users').truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe('users endpoints', () => {
  describe('server is up and running', async () => {
    const res = request(server).get('/');
    expect(res.body.api).toBe('up running')
  })
})