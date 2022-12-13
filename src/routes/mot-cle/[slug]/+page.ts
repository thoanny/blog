import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

export const load: PageLoad = async ({ params, fetch }) => {

  const query = `
    query Posts($id: ID!) {
      tag(id: $id, idType: SLUG) {
        name
        posts {
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
          id: params.slug
        }
    }),
  });

  if (response.ok) {
    const responseObj = await response.json();
    const data = responseObj.data;

    if(!data.tag) {
      throw error(404, {
        message: 'Mot-clé introuvable...'
      });
    }

    return {
      posts: data.tag.posts.nodes,
      tag: data.tag.name
    };
  }

  throw error(response.status, {
    message: 'Erreur...'
  });

}