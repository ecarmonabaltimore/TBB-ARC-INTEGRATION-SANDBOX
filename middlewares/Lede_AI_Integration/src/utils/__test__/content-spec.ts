/* eslint-disable max-lines */
import { HOURS_TO_MILISECONDS } from '../../constants';
import { createStory, getUnixTimestamp, getUUID } from '../content';

describe('Unique Story Identifier', () => {
  it('Should return an ID', () => {
    const response = getUUID();

    expect(response).not.toBeNull();
    expect(response).not.toBeUndefined();
    expect(response).toHaveLength(26);
  });
  it('Should return the same ID', () => {
    const body = 'sameID';
    const response = getUUID(body);
    const response2 = getUUID(body);

    expect(response).not.toBeNull();
    expect(response).not.toBeUndefined();
    expect(response2).not.toBeNull();
    expect(response2).not.toBeUndefined();
    expect(response).toHaveLength(26);
    expect(response).toStrictEqual(response2);
  });
});

describe('Story structure', () => {
  it('Should create an Story', async () => {
    const body = {
      categories: ['unit_test_middleware'],
      comments: 'https://ledeairss.com/16123923048-2/#respond',
      'content:encoded':
        '<p>Pins and needles were part of the price of admission as Petersburg nipped Glennallen 45-38 on Dec. 16 in Alaska girls high school basketball.</p> <p>The Panthers authored a promising start, taking advantage of the Vikings 11-10 at the end of the first quarter.</p> <p>Had this been a prize fight, the Panthers would&#8217;ve earned the judge&#8217;s decision at halftime, with a 17-14 lead on the Vikings.</p> <p>The Vikings broke in front at the beginning of the fourth quarter with a 27-26 lead over the Panthers.</p> <p>The clock was the only thing that stopped Petersburg, which enjoyed the upper hand in an 18-12 fourth quarter, too.</p> <p><strong>This content will be at the bottom of every article. We recommend making this an advertising opportunity. Below is an example, and feel free to make it your own.</strong></p> <p>&nbsp;</p> <p><em>You&#39;re reading a news brief powered by <a href="https://scorestream.com/gettheapp">ScoreStream</a>, the world leader in fan-driven sports results and conversation. To see more game results from your favorite team, download the ScoreStream app and join over 10 million users nationwide who share the scores of their favorite teams with one another in real-time.</em></p></p>',
      'content:encodedSnippet':
        '<p>Pins and needles were part of the price of admission as Petersburg nipped Glennallen 45-38 on Dec. 16 in Alaska girls high school basketball.</p> <p>The Panthers authored a promising start, taking advantage of the Vikings 11-10 at the end of the first quarter.</p> <p>Had this been a prize fight, the Panthers would&#8217;ve earned the judge&#8217;s decision at halftime, with a 17-14 lead on the Vikings.</p> <p>The Vikings broke in front at the beginning of the fourth quarter with a 27-26 lead over the Panthers.</p> <p>The clock was the only thing that stopped Petersburg, which enjoyed the upper hand in an 18-12 fourth quarter, too.</p> <p><strong>This content will be at the bottom of every article. We recommend making this an advertising opportunity. Below is an example, and feel free to make it your own.</strong></p> <p>&nbsp;</p> <p><em>You&#39;re reading a news brief powered by <a href="https://scorestream.com/gettheapp">ScoreStream</a>, the world leader in fan-driven sports results and conversation. To see more game results from your favorite team, download the ScoreStream app and join over 10 million users nationwide who share the scores of their favorite teams with one another in real-time.</em></p></p>',
      'dc:creator': 'Sports Desk',
      description: 'Petersburg records thin win against Glennallen 45-38',
      isoDate: '2022-08-29T21:24:55+00:00',
      guid: 'https://ledeairss.com/16123923048-2/',
      link: 'https://ledeairss.com/16123923048-2/?utm_source=rss&utm_medium=rss&utm_campaign=16123923048-2',
      'post-id': 74807,
      pubDate: 'Tue, 03 May 2022 15:16:44 +0000',
      'slash:comments': 0,
      title: 'Petersburg records thin win against Glennallen 45-38',
      'wfw:commentRss': 'https://ledeairss.com/16123923048-2/feed/',
      URL: 'https://www.ajc.com/sports/high-school/petersburg-records-thin-win-against-glennallen-45-38/S6KSEHW4RVHLTJIGB5EWKO3JPI/',
      UUID: 'S6KSEHW4RVHLTJIGB5EWKO3JPI',
    };
    const expectedResponse = 'S6KSEHW4RVHLTJIGB5EWKO3JPI';
    const response = (await createStory(
      body,
    )) as unknown as typeof expectedResponse;

    expect(response).toEqual(expectedResponse);
  });
  it('Should create an Story without content', async () => {
    const body = {
      categories: ['unit_test_middleware'],
      comments: 'https://ledeairss.com/16123923048-2/#respond',
      'content:encoded': '',
      'content:encodedSnippet': '',
      'dc:creator': 'Sports Desk',
      description: 'Petersburg records thin win against Glennallen 45-38',
      isoDate: '2022-08-29T21:24:55+00:00',
      guid: 'https://ledeairss.com/16123923048-2/',
      link: 'https://ledeairss.com/16123923048-2/?utm_source=rss&utm_medium=rss&utm_campaign=16123923048-2',
      'post-id': 74807,
      pubDate: 'Tue, 03 May 2022 15:16:44 +0000',
      'slash:comments': 0,
      title: 'Petersburg records thin win against Glennallen 45-38',
      'wfw:commentRss': 'https://ledeairss.com/16123923048-2/feed/',
      URL: 'https://www.ajc.com/sports/high-school/petersburg-records-thin-win-against-glennallen-45-38/S6KSEHW4RVHLTJIGB5EWKO3JPI/',
      UUID: 'S6KSEHW4RVHLTJIGB5EWKO3JPI',
    };
    const expectedResponse = 'S6KSEHW4RVHLTJIGB5EWKO3JPI';
    const response = (await createStory(
      body,
    )) as unknown as typeof expectedResponse;

    expect(response).toEqual(expectedResponse);
  });
});

describe('Unix Timestamp', () => {
  it('Get current Date in Unix Timestamp', async () => {
    const response = getUnixTimestamp();

    expect(response).toBeDefined();
    expect(response).not.toBeNaN();
    expect(`${response}`).toHaveLength(10);
  });
  it('Get delayed Date in Unix Timestamp', async () => {
    const body = HOURS_TO_MILISECONDS[5];
    const response = getUnixTimestamp(body);

    expect(response).toBeDefined();
    expect(response).not.toBeNaN();
    expect(`${response}`).toHaveLength(10);
  });
});
