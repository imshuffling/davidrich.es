const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_KEY;

export async function fetchContent<T = any>(query: string): Promise<T | undefined> {
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
        next: { revalidate: 3600 }, // Revalidate every hour
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

export default fetchContent;