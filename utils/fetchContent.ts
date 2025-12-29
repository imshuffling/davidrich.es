import { unstable_cache } from 'next/cache';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_KEY;

async function fetchContentInternal<T = any>(query: string): Promise<T | undefined> {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 3600, tags: ['contentful'] }, // Revalidate every hour with cache tags
      },
    );

    if (!res.ok) {
      console.error(`Contentful API error: ${res.status} ${res.statusText}`);
      return undefined;
    }

    const { data } = await res.json();
    return data as T;
  } catch (error) {
    console.error(`There was a problem retrieving entries with the query ${query}`);
    console.error(error);
    return undefined;
  }
}

// Wrap with unstable_cache for better caching control
export async function fetchContent<T = any>(query: string): Promise<T | undefined> {
  const cachedFetch = unstable_cache(
    async () => fetchContentInternal<T>(query),
    ['contentful-query', query],
    {
      revalidate: 3600,
      tags: ['contentful'],
    }
  );

  return cachedFetch();
}

export default fetchContent;