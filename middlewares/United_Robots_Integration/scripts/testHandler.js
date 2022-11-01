import { getUUID } from '../src/index';

const data_event = {
  dev: {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIoSCtNYlBlU2hWbVlxM3Q2dzl6JEMmRilKQE5jUmZUalduWnI0dTd4IUElRCpHLUthUGRTZ1ZrWHAyczV2OHkvQj9FKEgrTWJRZVRoV21acTN0Nnc5eiRDJkYpSkBOY1JmVWpYbjJyNXU3eCFBJUQqRy1LYVBkU2dWa1lwM3M2diIsIm5hbWUiOiJVbml0ZWQgUm9ib3RzIHRlYW0gREVWRUxPUE1FTlQiLCJpYXQiOjE1MTYyMzkwMjJ9.G392sdUyTNrJDrwaoYzrnic2WYA_aLexqxELdH5jV5o',
    },
    httpMethod: 'GET',
    requestContext: { resourceId: '2g4q7m' },
  },
  prod: {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzNXY4eS9CP0UoSCtNYlFlVGhWbVlxM3Q2dzl6JEMmRilKQE5jUmZValhuWnI0dTd4IUElRCpHLUthUGRTZ1ZrWXAzczV2OHkvQj9FKEgrTWJRZVRoV21acTR0N3c5eiRDJkYpSkBOY1JmVWpYbjJyNXU4eC9BJUQqRy1LYVBkUyIsIm5hbWUiOiJVbml0ZWQgUm9ib3RzIHRlYW0gUFJPRFVDVElPTiIsImlhdCI6MTUxNjIzOTAyMn0.KUoCTCJeNY7dEjz1WooiHlf73YA8p4JPdEnGiIcY0Oo',
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

getUUIDTest(data_event[env]);
