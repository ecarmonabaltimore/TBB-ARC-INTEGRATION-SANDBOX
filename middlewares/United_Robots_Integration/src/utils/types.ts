/**
 * Aux Type from United Robot RSS  Single Sales feed
 */
type location = {
  city: Array<string>;
  state: Array<string>;
  zip: Array<string>;
  latitude: Array<string>;
  longitude: Array<string>;
};
/**
 * Aux Type from United Robot RSS  Single Sales feed
 */
type thumbnail = {
  $: { url: string };
};

/**
 * Type from United Robot RSS  Single Sales feed
 */
export type UnitedRobotsItems = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  guid: string;
  author: string;
  'content:encoded': string;
  category: string;
  locations: { location: Array<location> };
  'media:thumbnail': thumbnail;
};

/**
 * Auxiliar Type for checkIDResponse type
 */
type content_elements = {
  _id: string;
};

/**
 * Response Type from checkID function
 */
export type checkIDResponse = {
  type?: string;
  version?: string;
  content_elements?: Array<content_elements>;
  message?: string;
};

/**
 * Response Type from checkID function
 */
type ansContentElement = {
  _id: string;
  type: string;
  content: string;
};

/**
 * Response Type from createDraft function
 */
export type createDraftResponse = {
  id: string;
  type: string;
  created_at: string;
  draft_revision_id: string;
};

/**
 * Response Type from circulateDraft function
 */
export type circulateDraftResponse = {
  document_id: string;
  website_id: string;
  website_primary_section: {
    type: string;
    referent: {
      id: string;
      type: string;
      website: string;
    };
  };
  website_sections: [
    {
      type: string;
      referent: {
        id: string;
        type: string;
        website: string;
      };
    },
  ];
  website_url: string;
};

/**
 * Response Type from createTasks function
 */
export type createTasksResponse = {
  id: string;
  storyID: string;
  type: number;
  createdDate: number;
  events: [
    {
      priority: number;
      assignedGroup: string;
      datetime: number;
      user: {};
      status: number;
    },
  ];
  latestEvent: {
    priority: number;
    assignedGroup: string;
    datetime: number;
    user: {};
    status: number;
  };
  creationEvent: {
    priority: number;
    assignedGroup: string;
    datetime: number;
    user: {};
    status: number;
  };
  taskTemplateId: null;
  website: string;
  authoringApp: null;
  startDate: null;
  content: {
    type: string;
    contentId: string;
  };
};

/**
 * Response Type from createImage function
 */
export type createImageResponse = {
  _id: string;
  additional_properties: {
    fullSizeResizeUrl: string;
    galleries: [];
    mime_type: string;
    originalName: string;
    originalUrl: string;
    proxyUrl: string;
    published: boolean;
    resizeUrl: string;
    restricted: boolean;
    thumbnailResizeUrl: string;
    version: number;
  };
  address: {};
  alt_text: string;
  caption: string;
  created_date: string;
  height: number;
  image_type: string;
  last_updated_date: string;
  licensable: boolean;
  owner: {
    id: string;
  };
  source: {
    additional_properties: {
      editor: string;
    };
    edit_url: string;
    system: string;
  };
  subtitle: string;
  type: string;
  url: string;
  version: string;
  width: number;
  content_restrictions: {
    content_code: string;
  };
};

/**
 * Type ContentElements
 */
export type ansContentElements = Array<ansContentElement | createImageResponse>;
