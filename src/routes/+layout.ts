import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

import type { LayoutLoad } from './$types';

import { get } from 'svelte/store';
import { twitchStore } from '../stores'

async function checkTwitchStatus() {
    const stream = await fetch('https://anthony-destenay.fr/projects/open-space/twitch/').then((res) => {
        return res.json();
    }).then((data) => {
        if (get(twitchStore) !== data.streamer) {
            twitchStore.set(data.streamer);
        }
    });
}

export const load: LayoutLoad = async ({ fetch }) => {

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

    checkTwitchStatus();
    setInterval(() => checkTwitchStatus(), 300000);

    return {
        menu: menu,
    };
};