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
      creator: 'United Robots',
      title:
        '10 most expensive homes sold in Barnstable County Sep. 25 - Oct. 1',
      link: 'http://published.unitedrobots.se/feeds/15c07a7ea64b75a9/2be4e5d1-6bcb-4453-baee-0c8049005ed2.xml',
      pubDate: 'Sun, 2 Oct 2022 08:18:46.383000 +0000',
      author: 'United Robots',
      'content:encoded':
        ' <figure> <img src="http://published.unitedrobots.se/lagfart/2022-10-02/81659297_2022-09-15 00:00:00.0_propmix_260012564_main.jpeg" alt="Main Street" /> <figcaption>Main Street</figcaption> </figure> <p>A house in Osterville that sold for $18.5 million tops the list of the most expensive real estate sales in Barnstable County between Sep. 25 and Oct. 1.</p><p>In total, 113 real estate sales were recorded in the area during the past week, with an average price of $1 million. The average price per square foot ended up at $568.</p><p>The prices in the list below concern real estate sales where the title was recorded during the week of Sep. 25., even if the property may have been sold earlier.</p><p>10. $2 million, detached house at 34 Caillouet Lane</p><p>The 1,816 square-foot detached house at 34 Caillouet Lane in Osterville has now been sold. The transfer of ownership was settled in September and the total purchase price was $2,000,000, $1,101 per square foot. The house was built in 1968. Caillouet Llc took over the house from Ronald K Perry and Sheila A Perry. The deal was finalized on Sep. 9.</p><p>9. $2 million, single-family house at 217 Main Street</p><p>The 1,488 square-foot detached house at 217 Main Street, Sandwich, has now been sold. The transfer of ownership was settled in September and the total purchase price was $2,000,000, $1,344 per square foot. The house was built in 1857. Joseph R Wahler and Bernice M Wahler sold the house to Michael Bertos and Annette Anderson. The deal was finalized on Sep. 16.</p><p>8. $2.2 million, single-family home at 185 Meadow Lane</p><p>The sale of the single-family residence at 185 Meadow Lane in West Barnstable has been finalized. The price was $2,175,000, and the new owners took over the house in September. The house was built in 1940 and has a living area of 4,779 square feet. The price per square foot was $455. Development Corp Capevest sold the house to A Bauer Jeffrey. The deal was finalized on Sep. 14.</p><p>7. $2.3 million, single-family residence at 15 Diane Drive</p><p>The property at 15 Diane Drive in Chatham has new owners. The price was $2,300,000. The house was built in 1953 and has a living area of 1,656 square feet. The price per square foot is $1,389. Ross Dowd and Marnie Dowd bought the house from David B Ruez and Nancy H Ruez. The deal was finalized on Aug. 25.</p><p>6. $2.5 million, single-family home at 142 Nobscussett Road</p><p>A sale has been finalized for the single-family home at 142 Nobscussett Road in Dennis. The price was $2,500,000 and the new owners took over the house in September. The house was built in 2016 and the living area totals 3,054 square feet. Jody Clinger bought the house from Gerard P Marolda and Ethel M Marolda. The price per square foot ended up at $819. The deal was finalized on Sep. 8.</p><p><img src="http://published.unitedrobots.se/lagfart/2022-10-02/81580371_2022-09-14 00:00:00.0_propmix_260012564_36.jpeg" alt="$2.5 million, single-family house at 142 Nobscussett Road "/></p><p>5. $2.7 million, single-family residence at 27 Parker Road</p><p>The sale of the single-family house at 27 Parker Road, Osterville, has been finalized. The price was $2,703,519, and the house changed hands in September. J E Montuori T 2006 bought the house from Parker Osterville Llc 27. The house was built in 1842 and has a living area of 2,420 square feet. The price per square foot was $1,117. The deal was finalized on Sep. 15.</p><p><img src="http://published.unitedrobots.se/lagfart/2022-10-02/81683420_2022-09-16 00:00:00.0_propmix_260012564_main.jpeg" alt="$2.7 million, detached house at 27 Parker Road "/></p><p>4. $3.1 million, detached house at 85 Sparrow Road</p><p>The property at 85 Sparrow Road in Eastham has new owners. The price was $3,100,000. The house was built in 1966 and has a living area of 2,205 square feet. The price per square foot is $1,406. Mbc Rt Jcc sold the house to Michael Santoro and Christine Santoro. The deal was finalized on Aug. 22.</p><p>3. $3.1 million, single-family home at 371 Robbins Hill Road</p><p>The property at 371 Robbins Hill Road in Brewster has new owners. The price was $3,110,000. The house was built in 2012 and has a living area of 2,548 square feet. The price per square foot is $1,221. Robbins Hill Road Llc 371 sold the house to Robbins Hill Creek Llc. The deal was finalized on Jul. 21.</p><p><img src="http://published.unitedrobots.se/lagfart/2022-10-02/81534424_2022-09-12 00:00:00.0_propmix_260012564_main.jpeg" alt="$3.1 million, single-family residence at 371 Robbins Hill Road "/></p><p>2. $3.3 million, single-family house at 473 Grand Island Drive</p><p>The 6,959 square-foot single-family residence at 473 Grand Island Drive in Osterville has now been sold. The transfer of ownership was settled in September and the total purchase price was $3,250,000, $467 per square foot. The house was built in 1991. Jeffrey S Brudnick and Susan M Brudnick sold the house to Ronald Perry and Sheila Perry. The deal was finalized on Sep. 15.</p><p>1. $18.5 million, single-family house at 159 Main Street</p><p>The property at 159 Main Street in Osterville has new owners. The price was $18,500,000. The house was built in 2015 and has a living area of 9,400 square feet. The price per square foot is $1,968. Chapin 2 Rt took over the house from Main Street T 159. The deal was finalized on Sep. 15.</p><p><img src="http://published.unitedrobots.se/lagfart/2022-10-02/81659297_2022-09-15 00:00:00.0_propmix_260012564_main.jpeg" alt="$18.5 million, single-family home at 159 Main Street "/></p><p>Real Estate Wire is a service provided by United Robots, which uses machine learning to generate analysis of data from Propmix, an aggregator of national real-estate data.</p> <figure> <img src="http://published.unitedrobots.se/lagfart/2022-10-02/81534424_2022-09-12 00:00:00.0_propmix_260012564_main.jpeg" alt="Robbins Hill Road" /> <figcaption>Robbins Hill Road</figcaption> </figure>   <figure> <img src="http://published.unitedrobots.se/lagfart/2022-10-02/81683420_2022-09-16 00:00:00.0_propmix_260012564_main.jpeg" alt="Parker Road" /> <figcaption>Parker Road</figcaption> </figure>   <figure> <img src="http://published.unitedrobots.se/lagfart/2022-10-02/81580371_2022-09-14 00:00:00.0_propmix_260012564_36.jpeg" alt="Nobscussett Road" /> <figcaption>Nobscussett Road</figcaption> </figure> ',
      'content:encodedSnippet':
        'Main Street  \n' +
        'A house in Osterville that sold for $18.5 million tops the list of the most expensive real estate sales in Barnstable County between Sep. 25 and Oct. 1.\n' +
        'In total, 113 real estate sales were recorded in the area during the past week, with an average price of $1 million. The average price per square foot ended up at $568.\n' +
        'The prices in the list below concern real estate sales where the title was recorded during the week of Sep. 25., even if the property may have been sold earlier.\n' +
        '10. $2 million, detached house at 34 Caillouet Lane\n' +
        'The 1,816 square-foot detached house at 34 Caillouet Lane in Osterville has now been sold. The transfer of ownership was settled in September and the total purchase price was $2,000,000, $1,101 per square foot. The house was built in 1968. Caillouet Llc took over the house from Ronald K Perry and Sheila A Perry. The deal was finalized on Sep. 9.\n' +
        '9. $2 million, single-family house at 217 Main Street\n' +
        'The 1,488 square-foot detached house at 217 Main Street, Sandwich, has now been sold. The transfer of ownership was settled in September and the total purchase price was $2,000,000, $1,344 per square foot. The house was built in 1857. Joseph R Wahler and Bernice M Wahler sold the house to Michael Bertos and Annette Anderson. The deal was finalized on Sep. 16.\n' +
        '8. $2.2 million, single-family home at 185 Meadow Lane\n' +
        'The sale of the single-family residence at 185 Meadow Lane in West Barnstable has been finalized. The price was $2,175,000, and the new owners took over the house in September. The house was built in 1940 and has a living area of 4,779 square feet. The price per square foot was $455. Development Corp Capevest sold the house to A Bauer Jeffrey. The deal was finalized on Sep. 14.\n' +
        '7. $2.3 million, single-family residence at 15 Diane Drive\n' +
        'The property at 15 Diane Drive in Chatham has new owners. The price was $2,300,000. The house was built in 1953 and has a living area of 1,656 square feet. The price per square foot is $1,389. Ross Dowd and Marnie Dowd bought the house from David B Ruez and Nancy H Ruez. The deal was finalized on Aug. 25.\n' +
        '6. $2.5 million, single-family home at 142 Nobscussett Road\n' +
        'A sale has been finalized for the single-family home at 142 Nobscussett Road in Dennis. The price was $2,500,000 and the new owners took over the house in September. The house was built in 2016 and the living area totals 3,054 square feet. Jody Clinger bought the house from Gerard P Marolda and Ethel M Marolda. The price per square foot ended up at $819. The deal was finalized on Sep. 8.\n' +
        '\n' +
        '5. $2.7 million, single-family residence at 27 Parker Road\n' +
        'The sale of the single-family house at 27 Parker Road, Osterville, has been finalized. The price was $2,703,519, and the house changed hands in September. J E Montuori T 2006 bought the house from Parker Osterville Llc 27. The house was built in 1842 and has a living area of 2,420 square feet. The price per square foot was $1,117. The deal was finalized on Sep. 15.\n' +
        '\n' +
        '4. $3.1 million, detached house at 85 Sparrow Road\n' +
        'The property at 85 Sparrow Road in Eastham has new owners. The price was $3,100,000. The house was built in 1966 and has a living area of 2,205 square feet. The price per square foot is $1,406. Mbc Rt Jcc sold the house to Michael Santoro and Christine Santoro. The deal was finalized on Aug. 22.\n' +
        '3. $3.1 million, single-family home at 371 Robbins Hill Road\n' +
        'The property at 371 Robbins Hill Road in Brewster has new owners. The price was $3,110,000. The house was built in 2012 and has a living area of 2,548 square feet. The price per square foot is $1,221. Robbins Hill Road Llc 371 sold the house to Robbins Hill Creek Llc. The deal was finalized on Jul. 21.\n' +
        '\n' +
        '2. $3.3 million, single-family house at 473 Grand Island Drive\n' +
        'The 6,959 square-foot single-family residence at 473 Grand Island Drive in Osterville has now been sold. The transfer of ownership was settled in September and the total purchase price was $3,250,000, $467 per square foot. The house was built in 1991. Jeffrey S Brudnick and Susan M Brudnick sold the house to Ronald Perry and Sheila Perry. The deal was finalized on Sep. 15.\n' +
        '1. $18.5 million, single-family house at 159 Main Street\n' +
        'The property at 159 Main Street in Osterville has new owners. The price was $18,500,000. The house was built in 2015 and has a living area of 9,400 square feet. The price per square foot is $1,968. Chapin 2 Rt took over the house from Main Street T 159. The deal was finalized on Sep. 15.\n' +
        '\n' +
        'Real Estate Wire is a service provided by United Robots, which uses machine learning to generate analysis of data from Propmix, an aggregator of national real-estate data.\n' +
        '   Robbins Hill Road      Parker Road      Nobscussett Road',
      description:
        'A house in Osterville that sold for $18.5 million tops the list of the most expensive real estate sales in Barnstable County between Sep. 25 and Oct. 1.',
      guid: 'S6KSEHW4RVHLTJIGB5EWKO3JPI',
      category: 'Real Estate',
      locations: {
        location: [
          {
            city: ['Osterville'],
            state: ['Massachusetts'],
            zip: ['2655'],
            latitude: ['41.632576'],
            longitude: ['-70.362714'],
          },
        ],
      },
      'media:thumbnail': {
        $: {
          url: 'http://published.unitedrobots.se/lagfart/2022-10-02/81659297_2022-09-15 00:00:00.0_propmix_260012564_main.jpeg',
        },
      },
      content:
        'A house in Osterville that sold for $18.5 million tops the list of the most expensive real estate sales in Barnstable County between Sep. 25 and Oct. 1.',
      contentSnippet:
        'A house in Osterville that sold for $18.5 million tops the list of the most expensive real estate sales in Barnstable County between Sep. 25 and Oct. 1.',
      categories: ['Real Estate'],
      isoDate: '2022-10-02T08:18:46.383Z',
    };
    const expectedResponse = 'S6KSEHW4RVHLTJIGB5EWKO3JPI';
    const response = (await createStory(
      body,
    )) as unknown as typeof expectedResponse;

    expect(response).toEqual(expectedResponse);
  });
  it('Should create an Story without content', async () => {
    const body = {
      creator: 'United Robots',
      title:
        '10 most expensive homes sold in Barnstable County Sep. 25 - Oct. 1',
      link: 'http://published.unitedrobots.se/feeds/15c07a7ea64b75a9/2be4e5d1-6bcb-4453-baee-0c8049005ed2.xml',
      pubDate: 'Sun, 2 Oct 2022 08:18:46.383000 +0000',
      author: 'United Robots',
      'content:encoded': '',
      'content:encodedSnippet': '',
      description:
        'A house in Osterville that sold for $18.5 million tops the list of the most expensive real estate sales in Barnstable County between Sep. 25 and Oct. 1.',
      guid: 'S6KSEHW4RVHLTJIGB5EWKO3JPI',
      category: 'Real Estate',
      'media:thumbnail': {
        $: {
          url: 'http://published.unitedrobots.se/lagfart/2022-10-02/81659297_2022-09-15 00:00:00.0_propmix_260012564_main.jpeg',
        },
      },
      content: '',
      contentSnippet: '',
      categories: ['Real Estate'],
      locations: {
        location: [
          {
            city: ['Osterville'],
            state: ['Massachusetts'],
            zip: ['2655'],
            latitude: ['41.632576'],
            longitude: ['-70.362714'],
          },
        ],
      },
      isoDate: '2022-10-02T08:18:46.383Z',
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
