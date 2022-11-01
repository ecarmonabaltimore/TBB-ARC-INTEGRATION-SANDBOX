import { sleep } from '../time';

describe('Wait time', () => {
  it('Should be wait 1 second', async () => {
    const body = 1000;
    const expectedResponse = new Promise(resolve => {
      setTimeout(resolve, body);
    });

    const response = sleep(body);

    expect(response).not.toBeNull();
    expect(response).toEqual(expectedResponse);
    expect(await response).toBeUndefined();
  });
});
