import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

export const load: PageLoad = async ({ params, fetch }) => {

  const query = `
    query Post($id: ID!) {
      post(id: $id, idType: SLUG) {
        databaseId
        title
        excerpt
        content
        date
        featuredImage {
          node {
            altText
            mediaDetails {
              sizes(include: LARGE) {
                height
                width
                sourceUrl
              }
              height
              width
            }
            mediaItemUrl
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
        commentStatus
        commentCount
        comments(where: {orderby: COMMENT_DATE, order: ASC, parentIn: "null"}) {
          nodes {
            date
            content
            author {
              node {
                avatar {
                  url
                }
                name
              }
            }
            replies {
              nodes {
                date
                content
                author {
                  node {
                    avatar {
                      url
                    }
                    name
                  }
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

  throw error(response.status, {
    message: response.statusText
  });

}