import fetch from 'node-fetch';

import { fetchDraf } from './fetch';

jest.mock('node-fetch', () => jest.fn());
jest.mock('rss-parser', () => jest.fn());

(fetch as jest.MockedFunction<typeof fetch>).mockImplementation(
  jest.fn(
    (url: RequestInfo | URL, init?: RequestInit): Promise<Response> =>
      fetchDraf(url, init),
  ) as jest.Mock,
);
