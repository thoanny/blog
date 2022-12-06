import type { PageLoad } from './$types';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

export const load: PageLoad = async ({ params, fetch }) => {

  const query = `
    query Post($slug: String = "hello-world") {
        postBy(slug: $slug) {
        title
        content
        date
        featuredImage {
            node {
            altText
            sourceUrl
            }
        }
        categories {
            nodes {
            name
            slug
            }
        }
        tags {
            nodes {
            slug
            name
            }
        }
        author {
            node {
            avatar {
                default
                url
            }
            nicename
            description
            nickname
            username
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
    body: JSON.stringify({ 
        query
    }),
  });

  if (response.ok) {
    const responseObj = await response.json();
    const post = responseObj.data.postBy;

    return {
      post: post
    };
  }

  

  return {
    status: response.status,
    error: new Error(`Could not load ${url}`),
  }

}