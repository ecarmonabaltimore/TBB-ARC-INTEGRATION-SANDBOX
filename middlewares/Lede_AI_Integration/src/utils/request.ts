/* eslint-disable max-lines */

import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import Parser from 'rss-parser';

import { HOURS_TO_MILISECONDS, SITE_SLUG } from '../constants';
import { getUnixTimestamp } from './content';
import {
  checkIDResponse,
  circulateDraftResponse,
  creafteDraftResponse,
  createTasksResponse,
  LedeAIItems,
} from './types';

dotenv.config();

/**
 * parser with type initialized to handle data coming from LedeAI RSS feed
 */
const parser: Parser<unknown, LedeAIItems> = new Parser({
  customFields: {
    item: [
      'categories',
      'comments',
      'content:encoded',
      'content:encodedSnippet',
      'dc:creator',
      'description',
      'isoDate',
      'guid',
      'link',
      'post-id',
      'pubDate',
      'slash:comments',
      'title',
      'wfw:commentRss',
      'URL',
      'UUID',
    ],
  },
});

/**
 * createDraf function
 * This function takes a payload of type string and sends it to the ARC Draft API.
 *
 * @param {string} body - payload to send
 * @returns returns respond from ARC Draft API as json
 *
 * @example
 * # Usage
 * ```ts
 * const result = createDraf(body);
 * ```
 *
 * # Result
 * ```ts
 * {
 *  "id": "JCFIVNL75NMYHABV7BESQEW5QI",
 *  "type": "STORY",
 *  "created_at": "2018-12-31T23:59:59.000Z",
 *  "draft_revision_id": "PNYZQJ3WEJJ63IRRZPM2YWWLEI"
 *}
 * ```
 */
export const createDraf = async (
  body: string,
): Promise<creafteDraftResponse> => {
  return await fetch(`${process.env.ARC_API_URL}/draft/v1/story`, {
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ARC_API_KEY}`,
    },
    method: 'POST',
  })
    .then(async (response): Promise<creafteDraftResponse> => {
      if (response.ok) {
        return await response
          .json()
          .then(
            (responseJSON): creafteDraftResponse =>
              responseJSON as creafteDraftResponse,
          )
          .catch(error => {
            throw new Error(JSON.stringify(error));
          });
      }
      throw new Error(JSON.stringify(await response.json()));
    })
    .catch(error => {
      console.info(error);
      throw error;
    });
};

/**
 * createTasks function
 * This function creates a task in WekSked for a StoryID
 *
 * @param {string} documentId - payload to send
 * @returns returns respond from ARC Draft API as json
 *
 * @example
 * # Usage
 * ```ts
 * const result = await createTasks(documentId);
 * ```
 */
export const createTasks = async (
  documentId: string,
): Promise<createTasksResponse> => {
  if (documentId === '') {
    throw new Error(
      JSON.stringify({
        error_message: 'Not enough data to launch a notification',
        error_code: 'ErrInvalidData',
      }),
    );
  }
  const hoursDelay = 2;
  const body: string = JSON.stringify({
    priority: 2,
    status: 1,
    type: 4,
    assignedGroup: '6305264602df01283daea756',
    assignedUser: null,
    taskTemplateId: null,
    website: 'the-baltimore-banner',
    deadline: getUnixTimestamp(HOURS_TO_MILISECONDS[hoursDelay]),
    content: {
      type: 'ans',
      contentId: documentId,
    },
    user: {
      username: 'SYSTEM',
      name: 'SYSTEM',
    },
  });
  return await fetch(`${process.env.ARC_API_URL}/websked/tasks`, {
    body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ARC_API_KEY}`,
    },
    method: 'POST',
  })
    .then(async (response): Promise<createTasksResponse> => {
      if (response.ok) {
        return await response
          .json()
          .then(
            (responseJSON): createTasksResponse =>
              responseJSON as createTasksResponse,
          )
          .catch(error => {
            throw new Error(JSON.stringify(error));
          });
      }
      throw new Error(JSON.stringify(await response.json()));
    })
    .catch(error => {
      console.info(error);
      throw error;
    });
};

/**
 * checkID function
 * List of UUIDs of stories to check if they already exist in the ARC Content API.
 *
 * @param {Array<string>} storyIds - List of stories UUIDS to check.
 * @returns returns respond from ARC Content API as json with the stories already exist.
 *
 * @example
 * # Usage
 * ```ts
 * const result = checkID(["VKFGOLIF7JMMRHQO56SXLJS7II","MG3MHTGBFJI5DC32RPMISX6HJU","Q3V6NSU4TFKHLH6GHDMWOZCFM4","OKPDT3RSOZPONDVEPS46HSW76E"]);
 * ```
 *
 * # Result
 * ```ts
 * {
 *   "type": "results",
 *   "version": "0.6.0",
 *   "content_elements": [
 *   {
 *     "_id": "VKFGOLIF7JMMRHQO56SXLJS7II"
 *   },
 *   {
 *     "_id": "Q3V6NSU4TFKHLH6GHDMWOZCFM4"
 *   }
 * ]
 *}
 * ```
 */
export const checkID = async (
  storyIds: Array<string>,
): Promise<checkIDResponse> => {
  return await fetch(
    `${process.env.ARC_API_URL}/content/v4/ids?website=${SITE_SLUG}&ids=${storyIds}&published=false&included_fields=_id`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ARC_API_KEY}`,
      },
      method: 'GET',
    },
  )
    .then(async (response): Promise<checkIDResponse> => {
      return await response
        .json()
        .then(
          (responseJSON): checkIDResponse => responseJSON as checkIDResponse,
        )
        .catch(error => {
          throw new Error(JSON.stringify(error));
        });
    })
    .catch(error => {
      console.info(error);
      throw error;
    });
};

/**
 * circulateDraf function
 * this function adds website & section to a document
 *
 * @param {string} documentId - payload to send
 * @returns returns respond from ARC Draft API as json
 *
 * @example
 * # Usage
 * ```ts
 * const result = await circulateDraf(documentId);
 * ```
 */
export const circulateDraf = async (
  documentId: string,
): Promise<circulateDraftResponse> => {
  if (documentId === '') {
    throw new Error(
      JSON.stringify({
        error_message: 'Not enough data to launch a notification',
        error_code: 'ErrInvalidData',
      }),
    );
  }
  const body: string = JSON.stringify({
    document_id: documentId,
    website_id: 'the-baltimore-banner',
    website_url: '',
    website_primary_section: {
      type: 'reference',
      referent: {
        type: 'section',
        id: '/topic/sports/high-school-sports',
        website: 'the-baltimore-banner',
      },
    },
    website_sections: [
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/topic/sports/high-school-sports',
          website: 'the-baltimore-banner',
        },
      },
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/topic/sports',
          website: 'the-baltimore-banner',
        },
      },
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/topic',
          website: 'the-baltimore-banner',
        },
      },
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/content-type/article',
          website: 'the-baltimore-banner',
        },
      },
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/content-type',
          website: 'the-baltimore-banner',
        },
      },
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/partners/lede-ai',
          website: 'the-baltimore-banner',
        },
      },
      {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/partners',
          website: 'the-baltimore-banner',
        },
      },
    ],
  });
  return await fetch(
    `${process.env.ARC_API_URL}/draft/v1/story/${documentId}/circulation/${SITE_SLUG}`,
    {
      body,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ARC_API_KEY}`,
      },
      method: 'PUT',
    },
  )
    .then(async (response): Promise<circulateDraftResponse> => {
      if (response.ok) {
        return await response
          .json()
          .then(
            (responseJSON): circulateDraftResponse =>
              responseJSON as circulateDraftResponse,
          )
          .catch(error => {
            throw new Error(JSON.stringify(error));
          });
      }
      throw new Error(JSON.stringify(await response.json()));
    })
    .catch(error => {
      console.info(error);
      throw error;
    });
};

/**
 * getRSSItems function
 *
 * @returns returns an object with all content from LedeAI RSS feed
 *
 * @example
 * # Usage
 * ```ts
 * const result = await getRSSItems();
 * ```
 */
const getRSSItems = async (): Promise<Parser.Output<LedeAIItems>> => {
  return await parser.parseURL(process.env.RSS_API_URL!);
};

/**
 * getRSSItemsbyUUID function
 * This function filters the data coming from the LedeAI RSS feed, leaving only those items that have not yet been created.
 *
 * @returns returns an object with data from the RSS feed only with stories that have not been created in ARC Composer
 *
 * @example
 * # Usage
 * ```ts
 * const result = await getRSSItemsbyUUID();
 * ```
 */
export const getRSSItemsbyUUID = async (): Promise<
  Parser.Output<LedeAIItems>
> => {
  const feed = await getRSSItems();
  const uuids: Array<string> = feed.items.map(item => {
    return item.UUID;
  });
  const uuidsLength = uuids.length;
  let items: Array<LedeAIItems> = [];
  let promiseVerifyUUIDS: Array<Promise<checkIDResponse>> = [];
  let usedUUIDS: Array<string> = [];

  for (let uuidIndex = 0; uuidIndex < uuidsLength; uuidIndex = uuidIndex + 19) {
    const lastIndex =
      uuidIndex + 19 > uuidsLength ? uuidsLength : uuidIndex + 19;
    promiseVerifyUUIDS.push(
      checkID([uuids.slice(uuidIndex, lastIndex).toString()]),
    );
  }

  const responsesVerifyUUIDS = await Promise.all(promiseVerifyUUIDS);
  responsesVerifyUUIDS.forEach(verifyUUID => {
    if (verifyUUID.content_elements) {
      verifyUUID.content_elements.forEach(elements => {
        usedUUIDS.push(elements._id);
      });
    }
  });

  feed.items.forEach(item => {
    if (!usedUUIDS.includes(item.UUID)) {
      items.push(item);
    }
  });

  return {
    ...feed,
    ...{ items: items },
  };
};
