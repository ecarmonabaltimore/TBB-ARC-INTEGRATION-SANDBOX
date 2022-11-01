import {
  APPROVED_ANS_FIELDS,
  APPROVED_CIRCULATE_DOCUMENT_FIELDS,
  APPROVED_CREATE_TASKS_FIELDS,
  APPROVED_MIN_ANS_FIELDS,
  APPROVED_UPDATE_IMAGE_ANS_FIELDS,
  REJECTED_ANS_FIELDS,
} from '../constants';

export const getAllKeys = (data: any): Array<string> => {
  let keys: Array<string> = [];

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      keys.push(
        ...getAllKeys(value).map(subKey => {
          return `${key}.${subKey}`;
        }),
      );
    } else {
      keys.push(key);
    }
  });

  return keys;
};

const checkObjectKeys = (
  keys: Array<string>,
  initValue: boolean,
  callback: (previousValue: boolean, currentValue: string) => boolean,
): boolean => {
  return keys.reduce(callback, initValue);
};

//check if are present some of the rejected keys
export const checkRejected = (data: Object): boolean => {
  const rejectedCallback = (prev: boolean, curr: string) =>
    REJECTED_ANS_FIELDS.includes(curr) || prev;
  const rejectedInitValue = false;
  const dataKeys = getAllKeys(data);

  return checkObjectKeys(dataKeys, rejectedInitValue, rejectedCallback);
};

//Check if are missing some minimal keys
export const checkMin = (data: Object): boolean => {
  const minInitValue = true;
  const dataKeys = getAllKeys(data);
  const minCallback = (prev: boolean, curr: string) =>
    prev ? dataKeys.includes(curr) || !prev : prev;

  return checkObjectKeys(APPROVED_MIN_ANS_FIELDS, minInitValue, minCallback);
};

export const checkMinTasks = (data: Object): boolean => {
  const minInitValue = true;
  const dataKeys = getAllKeys(data);
  const minCallback = (prev: boolean, curr: string) =>
    prev ? dataKeys.includes(curr) || !prev : prev;

  return checkObjectKeys(
    APPROVED_CREATE_TASKS_FIELDS,
    minInitValue,
    minCallback,
  );
};

export const checkMinCirculate = (data: Object): boolean => {
  const minInitValue = true;
  const dataKeys = getAllKeys(data);
  const minCallback = (prev: boolean, curr: string) =>
    prev ? dataKeys.includes(curr) || !prev : prev;

  return checkObjectKeys(
    APPROVED_CIRCULATE_DOCUMENT_FIELDS,
    minInitValue,
    minCallback,
  );
};

//check if any unauthorized keys are present
export const checkAll = (data: Object): boolean => {
  const allCallback = (prev: boolean, key: string) =>
    prev
      ? (key.startsWith('content_elements')
          ? prev
          : APPROVED_ANS_FIELDS.includes(key)) || !prev
      : prev;
  const allInitValue = true;
  const dataKeys = getAllKeys(data);

  return !checkObjectKeys(dataKeys, allInitValue, allCallback);
};

export const checkMinUpdatePhotoCenterAPI = (data: Object): boolean => {
  const minInitValue = true;
  const dataKeys = getAllKeys(data);
  const minCallback = (prev: boolean, curr: string) =>
    prev ? dataKeys.includes(curr) || !prev : prev;

  return checkObjectKeys(
    APPROVED_UPDATE_IMAGE_ANS_FIELDS,
    minInitValue,
    minCallback,
  );
};
