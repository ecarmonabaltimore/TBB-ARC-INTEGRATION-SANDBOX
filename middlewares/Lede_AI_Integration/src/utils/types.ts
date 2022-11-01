/**
 * Type from LedeAI RSS feed
 */
export type LedeAIItems = {
  categories: Array<string>;
  comments: string;
  'content:encoded': string;
  'content:encodedSnippet': string;
  'dc:creator': string;
  description: string;
  isoDate: string;
  guid: string;
  link: string;
  'post-id': number;
  pubDate: string;
  'slash:comments': number;
  title: string;
  'wfw:commentRss': string;
  URL: string;
  UUID: string;
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
 * Type ContentElements
 */
export type ansContentElements = Array<ansContentElement>;

/**
 * Response Type from createDraft function
 */
export type creafteDraftResponse = {
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
