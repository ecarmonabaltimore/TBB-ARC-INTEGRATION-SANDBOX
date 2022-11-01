import { validateToken, verifyToken } from '../authorization';

describe('Verify JWT token', () => {
  it('Should return empty due to bad token', async () => {
    const body = process.env.SECRET_KEY
      ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaSF2SkFWOXdhejNQXnR3cEtQekQ1ZUwmTnRaJGpxRTZhUzROQk51dVJvdjVRNGppYXReUiF0OFZASjQ1Z1NTeSNmQlJeMkdlS0t3aVBvRzc3d1FXN0oldktBaiZvIyNvVmtYQDVWdnUhXndnUVU0N1NAJlJOanZHSGYzR2R2ZyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBERVZFTE9QTUVOVCIsImlhdCI6MTUxNjIzOTAyMn0.mZ7MI3e96MkJJNBdtjtKtgmoT181XieVoze0mMh2nE8!!'
      : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0!!';

    const expectedResponse = '';

    const response = verifyToken(body);

    expect(response).not.toBeNull();
    expect(response).toEqual(expectedResponse);
  });
  it('Should return an payload due to good token', async () => {
    const body = process.env.SECRET_KEY
      ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaSF2SkFWOXdhejNQXnR3cEtQekQ1ZUwmTnRaJGpxRTZhUzROQk51dVJvdjVRNGppYXReUiF0OFZASjQ1Z1NTeSNmQlJeMkdlS0t3aVBvRzc3d1FXN0oldktBaiZvIyNvVmtYQDVWdnUhXndnUVU0N1NAJlJOanZHSGYzR2R2ZyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBERVZFTE9QTUVOVCIsImlhdCI6MTUxNjIzOTAyMn0.mZ7MI3e96MkJJNBdtjtKtgmoT181XieVoze0mMh2nE8'
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
      ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaSF2SkFWOXdhejNQXnR3cEtQekQ1ZUwmTnRaJGpxRTZhUzROQk51dVJvdjVRNGppYXReUiF0OFZASjQ1Z1NTeSNmQlJeMkdlS0t3aVBvRzc3d1FXN0oldktBaiZvIyNvVmtYQDVWdnUhXndnUVU0N1NAJlJOanZHSGYzR2R2ZyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBERVZFTE9QTUVOVCIsImlhdCI6MTUxNjIzOTAyMn0.mZ7MI3e96MkJJNBdtjtKtgmoT181XieVoze0mMh2nE8!!'
      : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0!!';
    const expectedResponse = false;

    const response = validateToken(body);

    expect(response).not.toBeNull();
    expect(response).toBeFalsy();
    expect(response).toEqual(expectedResponse);
  });
  it('Should return true due to good token', async () => {
    const body = process.env.SECRET_KEY
      ? 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaSF2SkFWOXdhejNQXnR3cEtQekQ1ZUwmTnRaJGpxRTZhUzROQk51dVJvdjVRNGppYXReUiF0OFZASjQ1Z1NTeSNmQlJeMkdlS0t3aVBvRzc3d1FXN0oldktBaiZvIyNvVmtYQDVWdnUhXndnUVU0N1NAJlJOanZHSGYzR2R2ZyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBERVZFTE9QTUVOVCIsImlhdCI6MTUxNjIzOTAyMn0.mZ7MI3e96MkJJNBdtjtKtgmoT181XieVoze0mMh2nE8'
      : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNpcmNsZUNJIHRlc3QiLCJpYXQiOjE1MTYyMzkwMjJ9.ZZwd5gqUI9OAQVX7GHV3W5rmu7uxDpkft3yBpzsgwL0';
    const expectedResponse = true;

    const response = validateToken(body);

    expect(response).not.toBeNull();
    expect(response).toBeTruthy();
    expect(response).toEqual(expectedResponse);
  });
});
