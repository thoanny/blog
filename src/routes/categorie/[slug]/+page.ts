import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

export const load: PageLoad = async ({ params, fetch }) => {

  const query = `
    query Posts($id: ID!) {
      category(id: $id, idType: SLUG) {
        name
        posts {
          nodes {
            slug
            title
            date
            excerpt
            featuredImage {
              node {
                altText
                mediaDetails {
                  sizes(include: MEDIUM_LARGE) {
                    height
                    width
                    sourceUrl
                  }
                }
              }
            }
            categories {
              nodes {
                name
              }
            }
            commentCount
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
        id: params.slug,
        name: params.slug
      }
    }),
  });

  if (response.ok) {
    const responseObj = await response.json();
    const data = responseObj.data;

    if (!data.category) {
      throw error(404, {
        message: 'Catégorie introuvable...'
      });
    }

    return {
      posts: data.category.posts.nodes,
      category: data.category.name
    };
  }

  throw error(response.status, {
    message: 'Erreur...'
  });

}