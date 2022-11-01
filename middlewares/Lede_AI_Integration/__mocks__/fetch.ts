/* eslint-disable max-lines */
const { Response } = jest.requireActual('node-fetch');

import { getUUID } from '../src/utils/content';
import { ID_LOCAL_DB } from './constants';
import {
  checkAll,
  checkMin,
  checkMinCirculate,
  checkMinTasks,
  checkRejected,
} from './utils';

export const fetchDraf = (
  url: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> => {
  const body = init?.body ? JSON.parse(init?.body.toString()) : {};
  const headers = init?.headers || {};
  const authorization =
    'Authorization' in headers ? headers['Authorization'] : '';
  let existsIDs: Array<{ [key: string]: string }> = [];

  if (authorization !== `Bearer ${process.env.ARC_API_KEY}`) {
    return Promise.resolve(
      new Response(
        '<html><head><title>401 Authorization Required</title></head><body><center><h1>401 Authorization Required</h1></center><hr><center>nginx</center></body></html>',
        {
          status: 401,
          ok: false,
        },
      ),
    );
  }

  if (url.toString().includes(`${process.env.ARC_API_URL}/content/v4/ids`)) {
    if (init?.method !== 'GET') {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            error_message: 'Not Found',
          }),
          {
            status: 405,
            ok: false,
          },
        ),
      );
    }

    const paramsIDs: string = url
      .toString()
      .slice(url.toString().indexOf('&ids=') + 5);
    const ids: Array<string> = paramsIDs
      .slice(0, paramsIDs.indexOf('&'))
      .split(',');

    ids.forEach(id => {
      if (ID_LOCAL_DB[id]) existsIDs.push({ _id: id });
    });

    return existsIDs.length > 0
      ? Promise.resolve(
          new Response(
            JSON.stringify({
              type: 'results',
              version: '0.6.0',
              content_elements: existsIDs,
            }),
            {
              status: 200,
              ok: true,
            },
          ),
        )
      : Promise.resolve(
          new Response(
            JSON.stringify({
              message:
                'No stories were found matching any of the provided ids.',
            }),
            {
              status: 404,
              ok: false,
            },
          ),
        );
  }
  if (url.toString().includes(`${process.env.ARC_API_URL}/websked/tasks`)) {
    if (init?.method !== 'POST') {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            error_message: 'method not allowed',
          }),
          {
            status: 405,
            ok: false,
          },
        ),
      );
    }

    if (!checkMinTasks(body)) {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            error_message: 'Not enough data to launch a notification',
            error_code: 'ErrInvalidData',
          }),
          {
            status: 415,
            ok: false,
          },
        ),
      );
    }

    return Promise.resolve(
      new Response(
        JSON.stringify({
          id: '631b9f18abcae5368c10c382',
          storyID: body['content']['contentId'] || '',
          type: body['type'] || 0,
          createdDate: 1662754584,
          events: [
            {
              priority: body['priority'] || 0,
              assignedGroup: body['assignedGroup'] || '',
              datetime: 1662754584,
              user: {},
              status: body['status'] || 0,
            },
          ],
          latestEvent: {
            priority: body['priority'] || 0,
            assignedGroup: body['assignedGroup'] || '',
            datetime: 1662754584,
            user: {},
            status: body['status'] || 0,
          },
          creationEvent: {
            priority: body['priority'] || 0,
            assignedGroup: body['assignedGroup'] || '',
            datetime: 1662754584,
            user: {},
            status: 1,
          },
          taskTemplateId: null,
          website: 'the-baltimore-banner',
          authoringApp: null,
          startDate: null,
          content: {
            type: 'ans',
            contentId: body['content']['contentId'] || '',
          },
        }),
        {
          status: 200,
          ok: true,
        },
      ),
    );
  }

  if (url.toString().includes('/circulation/')) {
    if (init?.method !== 'PUT') {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            error_message: 'method not allowed',
          }),
          {
            status: 405,
            ok: false,
          },
        ),
      );
    }

    if (!checkMinCirculate(body)) {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            request_id: '1-631f57d6-56aa9fc60c14c89c4bc66052',
            error_message: 'document not found',
            error_code: 'ErrNotFound',
          }),
          {
            status: 415,
            ok: false,
          },
        ),
      );
    }

    return Promise.resolve(
      new Response(
        JSON.stringify({
          document_id: body['document_id'] || '',
          website_id: body['website_id'] || '',
          website_primary_section: body['website_primary_section'] || {},
          website_sections: body['website_sections'] || {},
          website_url: body['website_url'],
        }),
        { stausCode: 200, ok: true },
      ),
    );
  }

  if (url.toString().includes(`${process.env.ARC_API_URL}/draft/v1/story`)) {
    if (init?.method !== 'POST') {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            error_message: 'method not allowed',
          }),
          {
            status: 405,
            ok: false,
          },
        ),
      );
    }

    if (checkRejected(body) || !checkMin(body) || checkAll(body)) {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            request_id: '1-6171b052-604028fc13f7962d700a0c36',
            error_message: 'unable to unmarshal ANS',
            error_code: 'ErrInvalidData',
          }),
          {
            status: 415,
            ok: false,
          },
        ),
      );
    }

    return Promise.resolve(
      new Response(
        JSON.stringify({
          id: body['_id'] || '',
          type: 'STORY',
          created_at: new Date().toISOString(),
          draft_revision_id: getUUID(JSON.stringify(body)),
        }),
        {
          status: 200,
          ok: true,
        },
      ),
    );
  }
  return Promise.resolve(
    new Response(
      JSON.stringify({
        id: getUUID(),
        type: 'STORY',
        created_at: new Date().toISOString(),
        draft_revision_id: getUUID(JSON.stringify(body)),
      }),
      {
        status: 200,
        ok: true,
      },
    ),
  );
};
