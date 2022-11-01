/* eslint-disable no-await-in-loop */

import { ARC_RATE_LIMITE } from './constants';
import { HandlerGetResponse, HandlerPutResponse } from './types';
import { createStory, getUUID } from './utils/content';
import { checkID, getRSSItemsbyUUID } from './utils/request';
import { sleep } from './utils/time';

export class WireHandler {
  /**
   * handleGetEvent function
   * This function will call the ARC content API to validate the UUID
   *
   * @param {string} requestId - the request Id that will be associated with the UUID
   * @returns return a Promise that content an object with ID field.
   *
   * @example
   * #Usage
   * ```ts
   * const result = await new WireHandler().handleGetEvent();
   * ```
   *
   * #Usage
   * ```ts
   * const result = await new WireHandler().handleGetEvent('6e820833-a9a5-4e3a-8eb4-f1eb57607273');
   * ```
   *
   * # Result
   * ```json
   * {
   *   "UUID": "L3CSB4KK5VJONOGREB4KPAZ4IY"
   * }
   * ```
   */
  public async handleGetEvent(requestId?: string): Promise<HandlerGetResponse> {
    let uniqueID = true;
    let id = '';

    console.info(
      'Creating a new Story ID',
      `Timestamp: ${new Date().toISOString()}`,
    );

    try {
      do {
        id = getUUID(requestId!);
        const response = await checkID([id]);
        if (response.content_elements) uniqueID = true;
      } while (!uniqueID);

      console.info(
        `id: ${JSON.stringify(id)}`,
        `Timestamp: ${new Date().toISOString()}`,
      );

      return {
        id: id,
      };
    } catch (error) {
      console.info(
        `An error has occurred while creating an ID: ${JSON.stringify(error)}`,
      );

      return {
        error: {
          message: 'could not generate an ID',
        },
      };
    }
  }
  /**
   * handleFetchRSSEvent function
   * This function retrieves documents from an RSS feed and uses the ARC Draft API to create only documents that exist in the RSS feed that do not exist in Composer.
   *
   * @returns return a void Promise
   *
   * @example
   * #Usage
   * ```ts
   * await new WireHandler().handleFetchRSSEvent();
   * ```
   */
  public async handleFetchRSSEvent(): Promise<HandlerPutResponse> {
    let storiesID: Array<string> = [];

    console.info(
      'Retrieving data from RSS feed.',
      `Timestamp: ${new Date().toISOString()}`,
    );

    const feedItems = (
      await getRSSItemsbyUUID(process.env.RSS_SUMMARIES_URL!)
    ).items.concat(
      (await getRSSItemsbyUUID(process.env.RSS_SINGLE_SALES_URL!)).items,
    );

    if (feedItems.length === 0) {
      console.info(
        'No new stories created',
        `Timestamp: ${new Date().toISOString()}`,
      );

      return {
        created: false,
      };
    }

    try {
      console.info(
        'Creating stories with the Draft API.',
        `Timestamp: ${new Date().toISOString()}`,
      );

      for (let indexItem = 0; indexItem < feedItems.length; indexItem++) {
        if (indexItem !== 0 && indexItem % ARC_RATE_LIMITE === 0) {
          console.info(
            'Waiting a second to avoid request rate limit',
            `Timestamp: ${new Date().toISOString()}`,
          );
          await sleep(1000);
        }
        storiesID.push(await createStory(feedItems[indexItem]));
      }

      console.info(
        'The following stories were created',
        `${JSON.stringify(storiesID)}`,
        `Timestamp: ${new Date().toISOString()}`,
      );

      return {
        created: true,
      };
    } catch (error) {
      console.info(
        `An error has occurred while creating stories: ${JSON.stringify(
          error,
        )}`,
      );

      return {
        error: {
          message: 'Failed to create stories.',
        },
      };
    }
  }
}
