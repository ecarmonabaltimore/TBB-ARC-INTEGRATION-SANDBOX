/* eslint-disable max-lines */
import {
  checkID,
  circulateDraf,
  createDraf,
  createImage,
  createTasks,
} from '../request';

describe('Create Draft', () => {
  it('Should fail due to bad AND scheme', async () => {
    const body = {};
    const expectedResponse = {
      request_id: '1-6171b052-604028fc13f7962d700a0c36',
      error_message: 'unable to unmarshal ANS',
      error_code: 'ErrInvalidData',
    };
    const response = await createDraf(JSON.stringify(body))
      .then(response => response)
      .catch(error => error.message);

    expect(response).toEqual(JSON.stringify(expectedResponse));
  });

  it('Should be pass through good AND scheme', async () => {
    const body = {
      _id: 'CPON7RXMFJHWFHQ7P67X2C6RBI',
      additional_properties: {
        has_published_copy: false,
      },
      canonical_website: 'the-baltimore-banner',
      content_elements: {},
      description: {
        basic: 'description mocked data',
      },
      headlines: {
        basic: 'title mocked data',
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
      promo_items: {
        basic: {
          _id: 'N74UANNYMRCURPB3F274ZDMBMA',
          additional_properties: {
            galleries: [],
            mime_type: 'image/jpeg',
            originalName:
              '81659297_2022-09-15%2000:00:00.0_propmix_260012564_main.jpeg',
            originalUrl:
              'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.baltimorebanner/N74UANNYMRCURPB3F274ZDMBMA.jpeg',
            published: true,
            restricted: false,
            thumbnailResizeUrl:
              '/resizer/XvF6YpA0vNQ8lfE3iX_WaqpzCV4=/300x0/arc-photo-baltimorebanner/arc2-sandbox/public/N74UANNYMRCURPB3F274ZDMBMA.jpeg',
            version: 1,
          },
          address: {},
          alt_text:
            '10 most expensive homes sold in Barnstable County Sep. 25 - Oct. 1. Media thumbnail',
          caption: '',
          created_date: '2022-10-06T19:59:21Z',
          height: 640,
          image_type: 'photograph',
          last_updated_date: '2022-10-06T19:59:21Z',
          licensable: false,
          owner: {
            sponsored: false,
          },
          source: {
            additional_properties: {
              editor: 'photo center',
            },
            edit_url:
              'https://sandbox.baltimorebanner.arcpublishing.com/photo/N74UANNYMRCURPB3F274ZDMBMA',
            system: 'photo center',
          },
          subtitle:
            '10 most expensive homes sold in Barnstable County Sep. 25 - Oct. 1. Media thumbnail',
          type: 'image',
          url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.baltimorebanner/N74UANNYMRCURPB3F274ZDMBMA.jpeg',
          version: '0.10.7',
          width: 1024,
          content_restrictions: {
            content_code: 'green',
          },
        },
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
      version: '0.10.7',
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
            description: 'xRecirculation',
            slug: 'xrecirculation',
            text: 'xRecirculation',
          },
        ],
      },
      type: 'story',
      workflow: {
        status_code: 14,
      },
    };
    const expectedResponse = {
      id: 'CPON7RXMFJHWFHQ7P67X2C6RBI',
      type: 'STORY',
      created_at: '2022-08-29T22:56:52.374Z',
      draft_revision_id: 'VTOW53NE75P27E7CQUYZE4NTXA',
    };

    const response = (await createDraf(
      JSON.stringify(body),
    )) as unknown as typeof expectedResponse;

    expect(response).not.toBeNull();
    expect(response).toHaveProperty('created_at');
    expect(response).toHaveProperty('draft_revision_id');
    expect(response).toHaveProperty('type');
    expect(response).toHaveProperty('id');
    expect(response.id).toEqual(expectedResponse['id']);
    expect(response.type).toEqual(expectedResponse['type']);
  });
});

describe('Check ID', () => {
  it('Should not return stories since we do not send Stories ID', async () => {
    const body = [''];
    const expectedResponse = {
      message: 'No stories were found matching any of the provided ids.',
    };

    const response = await checkID(body).then(response => response);
    expect(response).toStrictEqual(expectedResponse);
  });
  it('It should return the IDs of the stories that exist', async () => {
    const body = [
      '6FDP2EO4DJPO5OI4KWHN4QMSUM',
      'R7MOXVB3AFMXXKS7SAQIG2H5ME',
      'B5REBTMNJBP47HO264Q2QH5NGI',
      'XDAWJAWYEBLWJMJ3CQ5DIOUWX4',
      'F4HA2UHFYFJ4NNZOTKXYE6PASA',
      'P47L4FZLL5M6RL5EARJ6DVKZTA',
      'ZLG7OHVWJFKINN6Y2GKZ7U24GQ',
      'this_not_Exist',
      '123412321',
    ];
    const expectedResponse = {
      content_elements: [
        { _id: '6FDP2EO4DJPO5OI4KWHN4QMSUM' },
        { _id: 'R7MOXVB3AFMXXKS7SAQIG2H5ME' },
        { _id: 'B5REBTMNJBP47HO264Q2QH5NGI' },
        { _id: 'XDAWJAWYEBLWJMJ3CQ5DIOUWX4' },
        { _id: 'F4HA2UHFYFJ4NNZOTKXYE6PASA' },
        { _id: 'P47L4FZLL5M6RL5EARJ6DVKZTA' },
        { _id: 'ZLG7OHVWJFKINN6Y2GKZ7U24GQ' },
      ],
      type: 'results',
      version: '0.6.0',
    };

    const response = await checkID(body).then(response => response);
    expect(response).toEqual(expectedResponse);
  });
});

describe('Create Tasks', () => {
  it('Should fail due to bad payload schema', async () => {
    const body = '';
    const expectedResponse = {
      error_message: 'Not enough data to launch a notification',
      error_code: 'ErrInvalidData',
    };

    const response = await createTasks(body)
      .then(response => response)
      .catch(error => error);

    expect(response).not.toBeNull();
    expect(response).toEqual(new Error(JSON.stringify(expectedResponse)));
  });

  it('Should be pass through good payload scheme', async () => {
    const body = 'BKRSVUDGTBDPJLZ6LPT3IBW4EM';
    const expectedResponse = {
      id: '631b9f18abcae5368c10c382',
      storyID: 'BKRSVUDGTBDPJLZ6LPT3IBW4EM',
      type: 7,
      createdDate: 1662754584,
      events: [
        {
          priority: 2,
          assignedGroup: '6332246b527fd63de1a2db3d',
          datetime: 1662754584,
          user: {},
          status: 1,
        },
      ],
      latestEvent: {
        priority: 2,
        assignedGroup: '6332246b527fd63de1a2db3d',
        datetime: 1662754584,
        user: {},
        status: 1,
      },
      creationEvent: {
        priority: 2,
        assignedGroup: '6332246b527fd63de1a2db3d',
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
        contentId: 'BKRSVUDGTBDPJLZ6LPT3IBW4EM',
      },
    };

    const response = await createTasks(body)
      .then(response => response)
      .catch(error => error);

    expect(response).not.toBeNull();
    expect(response).toEqual(expectedResponse);
  });
});

describe('Circulate Draft', () => {
  it('Should fail due to bad payload schema', async () => {
    const body = '';
    const expectedResponse = {
      error_message: 'Not enough data to launch a notification',
      error_code: 'ErrInvalidData',
    };

    const response = await circulateDraf(body)
      .then(response => response)
      .catch(error => error);

    expect(response).not.toBeNull();
    expect(response).toEqual(new Error(JSON.stringify(expectedResponse)));
  });

  it('Should be pass through good payload scheme', async () => {
    const body = 'KTN7P6LXRJDAXIFCZTLPBY6UG4';
    const expectedResponse = {
      document_id: body,
      website_id: 'the-baltimore-banner',
      website_url: '',
      website_primary_section: {
        type: 'reference',
        referent: {
          type: 'section',
          id: '/topic/economy/real-estate',
          website: 'the-baltimore-banner',
        },
      },
      website_sections: [
        {
          type: 'reference',
          referent: {
            type: 'section',
            id: '/topic/economy/real-estate',
            website: 'the-baltimore-banner',
          },
        },
        {
          type: 'reference',
          referent: {
            type: 'section',
            id: '/topic/economy',
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
            id: '/partners/united-robots',
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
    };

    const response = await circulateDraf(body)
      .then(response => response)
      .catch(error => error);

    expect(response).not.toBeNull();
    expect(response).toEqual(expectedResponse);
  });
});

describe('Create Image', () => {
  it('Should fail due to bad payload schema', async () => {
    const altText = '';
    const captionText = '';
    const originalUrl = '';
    const expectedResponse = {
      error_message: 'Not enough data to create an Image',
      error_code: 'ErrInvalidData',
    };

    const response = await createImage(altText, captionText, originalUrl)
      .then(response => response)
      .catch(error => error);

    expect(response).not.toBeNull();
    expect(response).toEqual(new Error(JSON.stringify(expectedResponse)));
  });

  it('Should be pass through good payload scheme', async () => {
    const altText = 'alt text test';
    const captionText = 'caption text test';
    const originalUrl =
      'https://cyan.com/wp-content/uploads/2019/08/test-image.jpg';
    const expectedResponse = {
      _id: 'T6VJECFRCFD3PKGS644UNHBUKE',
      additional_properties: {
        fullSizeResizeUrl:
          '/resizer/gfF1zAUVgQiTkWLKxjIf2of5OyY=/arc-photo-baltimorebanner/arc2-sandbox/public/T6VJECFRCFD3PKGS644UNHBUKE.jpeg',
        galleries: [],
        mime_type: 'image/jpeg',
        originalName: 'test.jpeg',
        originalUrl:
          'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.baltimorebanner/T6VJECFRCFD3PKGS644UNHBUKE.jpeg',
        proxyUrl:
          '/resizer/gfF1zAUVgQiTkWLKxjIf2of5OyY=/arc-photo-baltimorebanner/arc2-sandbox/public/T6VJECFRCFD3PKGS644UNHBUKE.jpeg',
        published: true,
        resizeUrl:
          '/resizer/gfF1zAUVgQiTkWLKxjIf2of5OyY=/arc-photo-baltimorebanner/arc2-sandbox/public/T6VJECFRCFD3PKGS644UNHBUKE.jpeg',
        restricted: false,
        thumbnailResizeUrl:
          '/resizer/WK5pK_VpnEaUXDyl0FqqZXJq_1o=/300x0/arc-photo-baltimorebanner/arc2-sandbox/public/T6VJECFRCFD3PKGS644UNHBUKE.jpeg',
        version: 0,
      },
      address: {},
      alt_text: altText,
      caption: captionText,
      content_restrictions: {
        content_code: 'green',
      },
      created_date: '2022-10-03T21:42:38Z',
      height: 640,
      image_type: 'photograph',
      last_updated_date: '2022-10-03T21:55:03Z',
      licensable: false,
      owner: {
        id: 'sandbox.baltimorebanner',
        sponsored: false,
      },
      source: {
        additional_properties: {
          editor: 'photo center',
        },
        edit_url:
          'https://sandbox.baltimorebanner.arcpublishing.com/photo/T6VJECFRCFD3PKGS644UNHBUKE',
        system: 'photo center',
      },
      subtitle: altText,
      type: 'image',
      url: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.baltimorebanner/T6VJECFRCFD3PKGS644UNHBUKE.jpeg',
      version: '0.10.7',
      width: 1024,
    };

    const response = await createImage(altText, captionText, originalUrl)
      .then(response => response)
      .catch(error => error);

    expect(response).not.toBeNull();
    expect(response).toEqual(expectedResponse);
  });
});
