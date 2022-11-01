/* eslint-disable max-lines */
import { encode as base32 } from 'hi-base32';
import { HTMLElement, parse } from 'node-html-parser';
import { v5 as uuidv5 } from 'uuid';

import {
  ANS_SCHEMA_VERSION,
  INTEGRATION_NAME,
  NAMESPACE,
  SITE_URL,
} from '../constants';
import { circulateDraf, createDraf, createImage, createTasks } from './request';
import { ansContentElements, UnitedRobotsItems } from './types';

/**
 * getUUID function
 * this function creates a global unique identifier for the Stories in ARC Composer, if stringId is received it creates the unique identifier for that stringId.
 * If this function received the same stringId the UUID will be the same.
 *
 * @param {string} stringId - string to which to associate a UUID.
 * @returns returns an UUID for ARC composer
 *
 * @example
 * # Usage
 * ```ts
 * const result = getUUID();
 * ```
 *
 * # Usage
 * ```ts
 * const result = getUUID('something');
 * ```
 *
 * # Result
 * ```ts
 * "L3CSB4KK5VJONOGREB4KPAZ4IY"
 * ```
 */
export const getUUID = (stringId?: string): string => {
  const buffer = Buffer.alloc(16);

  const date = new Date().toUTCString();
  uuidv5(
    stringId
      ? `${SITE_URL}${stringId}${INTEGRATION_NAME}${date}`
      : `${SITE_URL}${INTEGRATION_NAME}${date}`,
    NAMESPACE,
    buffer,
  );
  const encoded = base32(buffer);
  return encoded.replace(/=/g, '');
};

/**
 * getID function
 * This function returns the string representation of a ten-digit random number.
 *
 * @returns returns the string representation of a ten-digit random number.
 *
 * @example
 * # Usage
 * ```ts
 * const result = getID();
 * ```
 *
 * # Result
 * ```ts
 * "5955320381"
 * ```
 */
const getID = (): string => {
  return `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
};

/**
 * createStory function
 * this function uses ARC Draft API to create a Draf document
 *
 * @param {object} item - object containing data to fill the Draf document
 * @returns returns respond from ARC Draft API as json
 *
 * @example
 * # Usage
 * ```ts
 * const result = createStory(item);
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
export const createStory = async (item: UnitedRobotsItems) => {
  const ans = await createANS(item);
  return await createDraf(JSON.stringify(ans))
    .then(async ({ id }) => {
      await circulateDraf(id).then(async ({ document_id }) => {
        await createTasks(document_id).then(({ content }) => {
          return content.contentId;
        });
      });
      return id;
    })
    .catch(error => {
      console.info(error);
      throw error;
    });
};

/**
 * parseContentElements function
 * This function adapts the content of an RSS feed post to the schema used by ARC (object ANS).
 *
 * @param {string} contentElements - the string to be parse to content_element field ANS schema.
 * @returns return an list of objects with the appropriate schema to be used as content in the ANS object
 *
 * @example
 * # Usage
 * ```ts
 * const result = parseContentElements("<p>Pins and needles were part of the price of admission as Petersburg nipped Glennallen 45-38 on Dec. 16 in Alaska girls high school basketball.</p> <p>The Panthers authored a promising start, taking advantage of the Vikings 11-10 at the end of the first quarter.</p> <p>Had this been a prize fight, the Panthers would&#8217;ve earned the judge&#8217;s decision at halftime, with a 17-14 lead on the Vikings.</p>"),
 * ```
 *
 * # Result
 * ```ts
 * [
 *   {
 *     "id":"1061666559",
 *     "type":"text",
 *     "content": "<p>Pins and needles were part of the price of admission as Petersburg nipped Glennallen 45-38 on Dec. 16 in Alaska girls high school basketball.</p>"
 *   },
 *   {
 *     "id":"6464232776",
 *     "type":"text",
 *     "content": "<p>The Panthers authored a promising start, taking advantage of the Vikings 11-10 at the end of the first quarter.</p>"
 *   },
 *   {
 *     "id":"3847886700",
 *     "type":"text",
 *     "content": "<p>Had this been a prize fight, the Panthers would&#8217;ve earned the judge&#8217;s decision at halftime, with a 17-14 lead on the Vikings.</p>"
 *   }
 * ]
 * ```
 */
export const parseContentElements = async (
  contentElements: string,
): Promise<ansContentElements> => {
  const parseContentElements: Array<any> = [];
  const root = parse(contentElements);
  root.childNodes.forEach(async child => {
    const element = child as HTMLElement;
    const startWithPTag = element.toString().startsWith('<p>');
    const startWithUlTag = element.toString().startsWith('<ul>');
    const startWithOlTag = element.toString().startsWith('<ol>');
    const emptyPtag = element.textContent === '' ? true : false;
    const startWithImgTag = startWithPTag
      ? element.childNodes[0].toString().startsWith('<img')
      : false;
    const startWithFigureTag = element.toString().startsWith('<figure>');
    if (element.childNodes.length !== 0) {
      if (startWithPTag && !startWithImgTag && !emptyPtag) {
        parseContentElements.push({
          _id: getUUID(`${getID()}-united-robots-text-${getID()}`),
          type: 'text',
          content: element.textContent,
        });
      } else if ((startWithPTag && startWithImgTag) || startWithFigureTag) {
        const childPosition = element.toString().startsWith('<p>') ? 0 : 1;
        const imgTag = element.childNodes[childPosition] as HTMLElement;
        const imageAlt = imgTag.getAttribute('alt')!;
        const imageCaption = element.toString().startsWith('<p>')
          ? ''
          : element.childNodes[3].rawText;
        const imageURL = `https${imgTag.getAttribute('src')?.split('http')[1]}`;
        parseContentElements.push(
          createImage(imageAlt, imageCaption, imageURL),
        );
      } else if (startWithUlTag || startWithOlTag) {
        const listElements = element.childNodes.map(child => {
          const childElement = child as HTMLElement;
          return {
            _id: getUUID(`${getID()}-united-robots-list-elements-${getID()}`),
            type: 'text',
            content: childElement.textContent,
          };
        });
        parseContentElements.push({
          _id: getUUID(`${getID()}-united-robots-list-${getID()}`),
          type: 'list',
          list_type: startWithUlTag ? 'unordered' : 'ordered',
          items: listElements,
        });
      }
    }
  });
  return await Promise.all(parseContentElements);
};

/**
 * verifyToken function
 * this function takes the input `item` to create an object with the minimum fields needed to create a document using the ARC Draft API.
 *
 * @param  {object} item - object containing data to fill the minimum ANS object
 * @returns returns an object with the minimum schema of the ANS object
 *
 * @example
 * # Usage
 * ```ts
 * const result = createANS(item);
 * ```
 *
 * # Result
 * ```ts
 * {
 *   _id: 'L3CSB4KK5VJONOGREB4KPAZ4IY',
 *   additional_properties: {
 *     has_published_copy: false,
 *   },
 *   canonical_website: 'the-baltimore-banner',
 *   content_elements: [
 *     {
 *       "id":"1061666559",
 *       "type":"text",
 *       "content": "<p>Pins and needles were part of the price of admission as Petersburg nipped Glennallen 45-38 on Dec. 16 in Alaska girls high school basketball.</p>"
 *     },
 *     {
 *       "id":"6464232776",
 *       "type":"text",
 *       "content": "<p>The Panthers authored a promising start, taking advantage of the Vikings 11-10 at the end of the first quarter.</p>"
 *     },
 *     {
 *       "id":"3847886700",
 *       "type":"text",
 *       "content": "<p>Had this been a prize fight, the Panthers would&#8217;ve earned the judge&#8217;s decision at halftime, with a 17-14 lead on the Vikings.</p>"
 *     }
 *   ],
 *   description: {
 *     basic: item.description,
 *   },
 *   headlines: {
 *     basic: item.title,
 *   },
 *   label: {
 *    paywall: {
 *      display: true,
 *      text: 'Metered',
 *      url: '',
 *    },
 *    wire: {
 *      display: true,
 *      text: 'Banner Bot',
 *      url: '/banner-bot',
 *    },
 *   },
 *   language: 'us',
 *   owner: {
 *     id: 'sandbox.baltimorebanner',
 *     sponsored: false,
 *   },
 *   version: '0.10.7',
 *   taxonomy: {
 *     seo_keywords: ['real estate', 'Maryland'],
 *     tags: [
 *       {
 *         description: 'United Robots',
 *         slug: 'united-robots',
 *         text: 'United Robots',
 *       },
 *       {
 *         description: 'United Robots real estate',
 *         slug: 'united-robots-real-estate',
 *         text: 'United Robots real estate',
 *       },
 *       {
 *         description: 'xRecirculation',
 *         slug: 'xrecirculation',
 *         text: 'xRecirculation',
 *       },
 *     ],
 *   },
 *   type: 'story',
 *   workflow: {
 *     status_code: 14,
 *   },
 * };
 * ```
 */
export const createANS = async (item: UnitedRobotsItems) => {
  const contentElements = await parseContentElements(item['content:encoded']);
  const ans = {
    _id: item.guid,
    additional_properties: {
      has_published_copy: false,
    },
    canonical_website: 'the-baltimore-banner',
    content_elements: contentElements,
    description: {
      basic: item.description,
    },
    headlines: {
      basic: item.title,
    },
    label: {
      paywall: {
        display: true,
        text: 'Metered',
        url: '',
      },
      wire: {
        display: true,
        text: 'Banner Bot',
        url: '/banner-bot',
      },
    },
    language: 'us',
    owner: {
      id: 'sandbox.baltimorebanner',
      sponsored: false,
    },
    version: ANS_SCHEMA_VERSION,
    taxonomy: {
      seo_keywords: ['real estate', 'Maryland'],
      tags: [
        {
          description: 'United Robots',
          slug: 'united-robots',
          text: 'United Robots',
        },
        {
          description: 'United Robots real estate',
          slug: 'united-robots-real-estate',
          text: 'United Robots real estate',
        },
        {
          description: 'xPublicFeeds',
          slug: 'xpublicfeeds',
          text: 'xPublicFeeds',
        },
        {
          description: 'xRecirculation',
          slug: 'xrecirculation',
          text: 'xRecirculation',
        },
        {
          description: 'xSocialNewsDesk',
          slug: 'xsocialnewsdesk',
          text: 'xSocialNewsDesk',
        },
        {
          description: 'xGoogleNews',
          slug: 'xgooglenews',
          text: 'xGoogleNews',
        },
        {
          description: 'xFlipboard',
          slug: 'xflipboard',
          text: 'xFlipboard',
        },
        {
          description: 'xFactiva',
          slug: 'xfactiva',
          text: 'xFactiva',
        },
        {
          description: 'xAppleNews',
          slug: 'xapplenews',
          text: 'xAppleNews',
        },
        {
          description: 'xMSN',
          slug: 'xmsn',
          text: 'xMSN',
        },
      ],
    },
    type: 'story',
    workflow: {
      status_code: 14,
    },
  };
  return 'media:thumbnail' in item
    ? {
        ...ans,
        promo_items: {
          basic: await createImage(
            `${item.title}`,
            '',
            item['media:thumbnail']['$']['url'],
          ),
          second: {
            type: 'reference',
            referent: {
              type: 'image',
              id: '1',
              service: '',
              provider: '',
            },
          },
        },
      }
    : ans;
};

/**
 * getUnixTimestamp function
 * This function takes the current date and transforms it into a Unix Timestamp, if a `delay` is defined it adds that delay to the current date.
 *
 * @param {number} delay - (Optional) Time in miliseconds to be added to the current date
 * @returns returns the time in seconds in Unix timestamp
 *
 * @example
 * # Usage
 * ```ts
 * const result = await getUnixTimestamp(documentId);
 * ```
 *
 * # Result
 * ```ts
 *
 */
export const getUnixTimestamp = (delay?: number): number => {
  const currentDate = delay
    ? new Date(new Date().getTime() + delay)
    : new Date(new Date().getTime());
  return Math.floor(currentDate.getTime() / 1000);
};
