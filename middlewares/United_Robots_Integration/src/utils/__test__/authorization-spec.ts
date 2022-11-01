import { validateToken, verifyToken } from '../authorization';

describe('Verify JWT token', () => {
  it('Should return empty due to bad token', async () => {
    const body = process.env.SECRET_KEY
      ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIoSCtNYlBlU2hWbVlxM3Q2dzl6JEMmRilKQE5jUmZUalduWnI0dTd4IUElRCpHLUthUGRTZ1ZrWHAyczV2OHkvQj9FKEgrTWJRZVRoV21acTN0Nnc5eiRDJkYpSkBOY1JmVWpYbjJyNXU3eCFBJUQqRy1LYVBkU2dWa1lwM3M2diIsIm5hbWUiOiJVbml0ZWQgUm9ib3RzIHRlYW0gREVWRUxPUE1FTlQiLCJpYXQiOjE1MTYyMzkwMjJ9.G392sdUyTNrJDrwaoYzrnic2WYA_aLexqxELdH5jV5o!!'
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0!!';
    const expectedResponse = '';

    const response = verifyToken(body);

    expect(response).not.toBeNull();
    expect(response).toEqual(expectedResponse);
  });
  it('Should return an payload due to good token', async () => {
    const body = process.env.SECRET_KEY
      ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIoSCtNYlBlU2hWbVlxM3Q2dzl6JEMmRilKQE5jUmZUalduWnI0dTd4IUElRCpHLUthUGRTZ1ZrWHAyczV2OHkvQj9FKEgrTWJRZVRoV21acTN0Nnc5eiRDJkYpSkBOY1JmVWpYbjJyNXU3eCFBJUQqRy1LYVBkU2dWa1lwM3M2diIsIm5hbWUiOiJVbml0ZWQgUm9ib3RzIHRlYW0gREVWRUxPUE1FTlQiLCJpYXQiOjE1MTYyMzkwMjJ9.G392sdUyTNrJDrwaoYzrnic2WYA_aLexqxELdH5jV5o'
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0';

    const response = verifyToken(body);
    const payload = JSON.parse(response as string);

    expect(response).not.toBeNull();
    expect(payload).toMatchObject({
      sub: expect.any(String),
      name: expect.any(String),
      iat: expect.any(Number),
    });
  });
});

describe('Validate JWT token', () => {
  it('Should return false due to bad token', async () => {
    const body = process.env.SECRET_KEY
      ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIoSCtNYlBlU2hWbVlxM3Q2dzl6JEMmRilKQE5jUmZUalduWnI0dTd4IUElRCpHLUthUGRTZ1ZrWHAyczV2OHkvQj9FKEgrTWJRZVRoV21acTN0Nnc5eiRDJkYpSkBOY1JmVWpYbjJyNXU3eCFBJUQqRy1LYVBkU2dWa1lwM3M2diIsIm5hbWUiOiJVbml0ZWQgUm9ib3RzIHRlYW0gREVWRUxPUE1FTlQiLCJpYXQiOjE1MTYyMzkwMjJ9.G392sdUyTNrJDrwaoYzrnic2WYA_aLexqxELdH5jV5o!!'
      : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0!!';
    const expectedResponse = false;

    const response = validateToken(body);

    expect(response).not.toBeNull();
    expect(response).toBeFalsy();
    expect(response).toEqual(expectedResponse);
  });
  it('Should return true due to good token', async () => {
    const body = process.env.SECRET_KEY
      ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIoSCtNYlBlU2hWbVlxM3Q2dzl6JEMmRilKQE5jUmZUalduWnI0dTd4IUElRCpHLUthUGRTZ1ZrWHAyczV2OHkvQj9FKEgrTWJRZVRoV21acTN0Nnc5eiRDJkYpSkBOY1JmVWpYbjJyNXU3eCFBJUQqRy1LYVBkU2dWa1lwM3M2diIsIm5hbWUiOiJVbml0ZWQgUm9ib3RzIHRlYW0gREVWRUxPUE1FTlQiLCJpYXQiOjE1MTYyMzkwMjJ9.G392sdUyTNrJDrwaoYzrnic2WYA_aLexqxELdH5jV5o'
      : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0';
    const expectedResponse = true;

    const response = validateToken(body);

    expect(response).not.toBeNull();
    expect(response).toBeTruthy();
    expect(response).toEqual(expectedResponse);
  });
});
