/**
 * Response Type for the handleGetEvent method of the WireHandler class
 */
export type HandlerGetResponse = {
  id?: string;
  error?: {
    message: string;
  };
};

/**
 * Response Type for the handleFetchRSSEvent method of the WireHandler class
 */
export type HandlerPutResponse = {
  created?: boolean;
  error?: {
    message: string;
  };
};

/**
 * Response Type for the getUUID function
 */
export type LambdaResponse = {
  headers: HeaderOption;
  statusCode: number;
  body: string;
  isBase64Encoded: boolean;
};

/**
 * Interface for Headers response
 */
interface HeaderOption {
  'Access-Control-Allow-Origin': string;
  'Content-Type': string;
}
