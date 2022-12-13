import type { PageLoad } from './$types';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

export const load: PageLoad = async ({ fetch }) => {

  const query = `
    query Posts {
      posts(where: {status: PUBLISH}) {
        nodes {
          slug
          title
          excerpt
          featuredImage {
            node {
              altText
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
        }
      }
    }
`;


  const response = await fetch(PUBLIC_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query }),
  });

  if (response.ok) {
    const responseObj = await response.json();
    const posts = responseObj.data.posts.nodes;

    return {
      posts: posts
    };
  }

  return {
    status: response.status,
    error: new Error(`Could not load ${url}`),
  }

}