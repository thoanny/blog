import { error } from '@sveltejs/kit';
import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch }) => {

    // setInterval(() => console.log('PING'), 10000);

    const query = `
        query Menus {
            menus {
            nodes {
                locations
                menuItems {
                nodes {
                    label
                    uri
                    target
                    cssClasses
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
        }),
    });

    let menu = {
        PRIMARY: [],
        FOOTER: []
    };

    if (response.ok) {
        const res = await response.json();
        const menus = res.data.menus;

        if (menus) {
            menus.nodes.forEach(m => {
                if (m.menuItems && ['PRIMARY', 'FOOTER'].indexOf(m.locations[0]) >= 0) {
                    menu[m.locations[0]] = m.menuItems.nodes;
                }
            });
        }
    }

    return {
        menu: menu,
    };
};