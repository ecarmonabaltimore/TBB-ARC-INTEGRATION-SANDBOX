import { getUUID, handleRSSFeed } from '../src/index';

const data_event = {
  dev: {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBaSF2SkFWOXdhejNQXnR3cEtQekQ1ZUwmTnRaJGpxRTZhUzROQk51dVJvdjVRNGppYXReUiF0OFZASjQ1Z1NTeSNmQlJeMkdlS0t3aVBvRzc3d1FXN0oldktBaiZvIyNvVmtYQDVWdnUhXndnUVU0N1NAJlJOanZHSGYzR2R2ZyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBERVZFTE9QTUVOVCIsImlhdCI6MTUxNjIzOTAyMn0.mZ7MI3e96MkJJNBdtjtKtgmoT181XieVoze0mMh2nE8',
    },
    httpMethod: 'GET',
    requestContext: { resourceId: '2g4q7m' },
  },
  prod: {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuOGd6VyY2XjVoNnVGY2VqI2tOUGZDNFMhMiVMTXkjQDJrQFZrY2hpQlNpNCEjOENCKnE3NDJXWnpZd2NxSypOU1dZI1dySHVFcCNoUHpSZlJwJnFIeCpGS2FpUkR2UnNrekY0RGJaV3FpNDMhTlEqeks2M3JDUXhBVip5aSpYYyIsIm5hbWUiOiJMZWRlQUkgdGVhbSBQUk9EVUNUSU9OIiwiaWF0IjoxNTE2MjM5MDIyfQ.i2Dt0oC2XK73um5nxFAra5GXVl6yZuPz6PJILbSbGuc',
    },
    httpMethod: 'GET',
    requestContext: { resourceId: '2g4q7m' },
  },
};

const env = 'dev';

const getUUIDTest = async data => {
  console.info('getUUID');
  console.info(await getUUID(data));
};

const rssHandleTest = async () => {
  console.info('handleRSSFeed');
  await handleRSSFeed();
};

getUUIDTest(data_event[env]);
rssHandleTest();
