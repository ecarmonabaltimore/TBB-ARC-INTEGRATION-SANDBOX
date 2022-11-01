#!/usr/bin/env node
//Inspired by: https://bumbu.me/automatically-prepend-issue-tag-to-commit-message

const fs = require('fs');

const JIRA_TAG = 'ARC';

/* If message title:
 * * Doesn't start with square brackets []
 * * Doesn't start with Merge branch
 * * Doesn't start with Merge pull request
 * * Doesn't start with #
 * and
 * branch name contains ${JIRA_TAG}-XXX (e.g. feature/TAG-123-branch-description)
 * then prepend the issue tag to the commit message
 *
 * My awesome commit -> TAG-123: My awesome commit
 */

const startsWithBraces = str => str.match(/^\[[^\]]/);
const startsWithMergeBranch = str => str.indexOf('Merge branch') === 0;
const startsWithMergePR = str => str.indexOf('Merge pull request') === 0;
const startsWithHash = str => str.indexOf('#') === 0;
const startsWithTicket = str => str.indexOf(`${JIRA_TAG}-`) === 0;

const isInvalidMessage = str =>
  !startsWithBraces(str) &&
  !startsWithMergeBranch(str) &&
  !startsWithMergePR(str) &&
  !startsWithHash(str) &&
  !startsWithTicket(str);

const tagMatcher = new RegExp(`.*(${JIRA_TAG}-\\d+).*`, 'i');
const getIssueTagFromBranchName = str => {
  const matched = str.match(tagMatcher);
  return matched && matched[1]; //use match 1, match 0 will be the whole branch name
};

const messageFile = process.argv[2]; //passed in from husky
const message = fs.readFileSync(messageFile, { encoding: 'utf-8' });
const messageTitle = message.split('\n')[0];
const branchName = require('child_process')
  .execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' })
  .split('\n')[0];
const issueTag = getIssueTagFromBranchName(branchName);

if (issueTag && isInvalidMessage(messageTitle)) {
  // Apply the issue tag to message title
  const messageLines = message.split('\n');
  messageLines[0] = `${issueTag.toUpperCase()}: ${messageTitle}`;
  fs.writeFileSync(messageFile, messageLines.join('\n'), { encoding: 'utf-8' });
  console.info(`New message title: ${messageLines[0]}`);
}
