import { test, expect, request } from '@playwright/test';

let userId;
let apiContext;

test.describe('User API Flow', () => {

  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://reqres.in',
      extraHTTPHeaders: {
        'x-api-key': 'reqres_3f0d2350cbcd474b8cb52f14ba4c4819'
      }
    });
  });

  test('Create User', async () => {
    const response = await apiContext.post('/api/users', {
      data: {
        name: 'Vaibhav',
        job: 'QA Engineer'
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    userId = body.id;
  });

  test('Get User Details', async () => {
    const response = await apiContext.get('/api/users/2');

    expect(response.status()).toBe(200);
  });

  test('Update User', async () => {
    const response = await apiContext.put('/api/users/2', {
      data: { name: 'Updated Name' }
    });

    expect(response.status()).toBe(200);
  });

});
