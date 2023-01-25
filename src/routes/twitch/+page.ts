import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
    let streamelements;
    let gifts;

    const SEres = await fetch('https://anthony-destenay.fr/projects/open-space/twitch/streamelements.php');
    if (SEres.ok) {
        streamelements = await SEres.json();
    }

    const giftsRes = await fetch('https://anthony-destenay.fr/projects/open-space/twitch/gifts.php');
    if (giftsRes.ok) {
        gifts = await giftsRes.json();
        console.log(gifts)
    }

    return {
        streamelements: streamelements,
        gifts: gifts
    };
}

