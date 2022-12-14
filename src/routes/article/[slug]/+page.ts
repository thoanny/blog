import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

export const load: PageLoad = async ({ params, fetch }) => {

  const query = `
    query Post($id: ID!) {
      post(id: $id, idType: SLUG) {
        title
        excerpt
        content
        date
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
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        author {
          node {
            avatar {
              url
            }
            name
            description
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
        query: query,
        variables: {
          'id': params.slug
        }
    }),
  });

  if (response.ok) {
    const responseObj = await response.json();
    const post = responseObj.data.post;

    if(!post) {
      throw error(404, {
        message: 'Article introuvable...'
      });
    }

    return {
      post: post,
      seo: {
        title: post.title,
        description: post.excerpt,
        image: (post.featuredImage) ? post.featuredImage.node.mediaItemUrl : null
      }
    };
  }

  

  return {
    status: response.status,
    error: new Error(`Could not load ${url}`),
  }

}