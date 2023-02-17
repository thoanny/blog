import { PUBLIC_BASE_URL, PUBLIC_GRAPHQL_URL } from '$env/static/public';

export async function GET() {

  const query = `query Posts {
    posts(
      where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}
      first: 9999
    ) {
      nodes {
        id
        title
        excerpt
        date
        link
        uri
        featuredImage {
          node {
            mediaDetails {
              sizes(include: MEDIUM_LARGE) {
                height
                width
                sourceUrl
              }
            }
          }
        }
      }
    }
  }`;

  const response = await fetch(PUBLIC_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
    }),
  });

  let urls = [];

  if (response.ok) {
    const res = await response.json();
    const posts = (res.data.posts) ? res.data.posts.nodes : null;

    if (posts) {
      posts.forEach((p, i) => {
        urls[i] = `
        
        <item>
  <title>${p.title}</title>
  <description><![CDATA[${p.excerpt}]]></description>
  <link>${PUBLIC_BASE_URL}${p.uri}</link>
  <guid isPermaLink="false">${p.id}</guid>
  <pubDate>${p.date}</pubDate>
  <enclosure url="${p.featuredImage.node.mediaDetails.sizes[0].sourceUrl}"></enclosure>
 </item>`;
      });
    }
  }

  return new Response(
    `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
    <channel>
    <title>Blog de Thoanny</title>
    <description>Blog de Thoanny, où sont partagés des actualités de ses projets personnels, des articles sur le thème du streaming, du jeu vidéo, et aussi des trucs et astuces...</description>
    <link>https://thoanny.fr</link>

      ${urls.join('')}
      </channel>
</rss>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}