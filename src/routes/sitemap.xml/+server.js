import { PUBLIC_BASE_URL, PUBLIC_GRAPHQL_URL } from '$env/static/public';

export async function GET() {

  const query = `query Posts {
    posts(
      where: {status: PUBLISH, orderby: {field: DATE, order: DESC}}
      first: 9999
    ) {
      nodes {
        date
        link
        uri
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
        urls[i] = `<url>
          <loc>${PUBLIC_BASE_URL}${p.uri}</loc>
          <lastmod>${p.date}</lastmod>
        </url>`;
      });
    }
  }

  return new Response(
    `
      <?xml version="1.0" encoding="UTF-8" ?>
      <urlset
        xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="https://www.w3.org/1999/xhtml"
        xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
      ${urls.join('')}
      </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
}