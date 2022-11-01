import { APIGatewayProxyEvent } from 'aws-lambda';

import { LambdaResponse } from './types';
import { validateToken } from './utils/authorization';
import { WireHandler } from './webhook';

/**
 * getUUID function
 * this function validate event payload, then retrieve the UUID or an error message.
 *
 * @param {APIGatewayProxyEvent} event - the data from event trigger.
 * @returns return a Promise that content an object with the result of the request.
 *
 * @example
 * #Usage
 * ```ts
 * const result = await getUUID(event);
 * ```
 *
 * # Result
 * ```json
 * {
 *   "headers": {
 *     "Access-Control-Allow-Origin": "*",
 *     "Content-Type": "application/json"
 *   },
 *   "statusCode": 200,
 *   "body": "{ \"UUID\": \"L3CSB4KK5VJONOGREB4KPAZ4IY\" },
 *   "isBase64Encoded": false
 * }
 * ```
 */
export const getUUID = async (
  event: APIGatewayProxyEvent,
): Promise<LambdaResponse> => {
  const authorization = event?.headers?.Authorization || '';
  const requestId = event?.requestContext?.requestId || '';

  if (validateToken(authorization)) {
    const handler = new WireHandler();
    const res = await handler.handleGetEvent(requestId);

    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: JSON.stringify({ UUID: res.id }),
      isBase64Encoded: false,
    };
  }

  return {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    statusCode: 401,
    body: JSON.stringify({
      error: {
        message: 'Unauthorized',
      },
    }),
    isBase64Encoded: false,
  };
};

/**
 * handleRSSFeed function
 * This function triggers the handleFetchRSSEvent function from WireHandler class.
 *
 * @returns return a void Promise
 *
 * @example
 * #Usage
 * ```ts
 * await handleRSSFeed();
 * ```
 */
export const handleRSSFeed = async (): Promise<void> => {
  const handler = new WireHandler();
  await handler.handleFetchRSSEvent();
};
