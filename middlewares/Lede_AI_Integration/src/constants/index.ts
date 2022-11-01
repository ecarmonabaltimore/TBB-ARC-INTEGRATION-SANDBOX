/**
 * This constant defines the maximum number of requests per second that must be made to the ARC API's
 */
export const ARC_RATE_LIMITE = 39;

/**
 * ARC namespace that should be used to generate the global UUID of a Story.
 */
export const NAMESPACE = '6ba7b814-9dad-11d1-80b4-00c04fd430c8';

/**
 * The Baltimore Banner webpage URL.
 */
export const SITE_URL = 'https://thebaltimorebanner.com';

/**
 * The Baltimore Banner webpage URL slug
 */
export const SITE_SLUG = 'the-baltimore-banner';

/**
 * Help convert hours to miliseconds
 */
export const HOURS_TO_MILISECONDS: { [key: number]: number } = {
  1: 3600000,
  2: 7200000,
  3: 10800000,
  4: 14400000,
  5: 18000000,
  6: 21600000,
  7: 25200000,
  8: 28800000,
  9: 32400000,
  10: 36000000,
  11: 39600000,
  12: 43200000,
};

/**
 * Secret key to be used in ci/cd pipelines
 */
export const SECRET_KEY_CI = 'KbPeShVmYq3s6v9y$B&E)H@McQfTjWnZ';

/**
 * Secret key to be used in ci/cd pipelines
 */
export const CLIENT_SECRET_KEY_CI =
  '{"sub":"1234567890","name":"CircleCI test","iat":1516239022}';
