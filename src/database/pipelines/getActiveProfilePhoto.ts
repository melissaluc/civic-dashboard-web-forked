import * as cheerio from 'cheerio';

// NOTE:  Can only scrape active councillors, not past ones
// TODO: place file somewhere better, maybe @api/cityCouncilRequest.ts or sanitize.ts
function parseWardHTML(html: string, wardNum: number) {
    const $ = cheerio.load(html);

    const name: string = $('#page-header--title').text().trim() || `Ward ${wardNum}`;
    const imgUrl: string | undefined = $('#page-content > div > p > img').attr('src');

    if (imgUrl) {
        console.log(`Retrieved image src URL for ${name}`);
    } else {
        console.log(`No image found for ${name}`);
    }

    return imgUrl;
}


export const getMemberSitePortrait = async (wardNum: number) => {

    const URL: string = `https://www.toronto.ca/city-government/council/members-of-council/councillor-ward-${wardNum}/`;

    try {
        const response = await fetch(URL); 
        const HTML: string | null = await response.text(); 

        console.log('Retriving img url for ward:', wardNum); 

        const imgUrl = parseWardHTML(HTML, wardNum); 

        if (imgUrl) {
            console.log(`Retrieved image URL for ward ${wardNum}: ${imgUrl}`);
            return imgUrl;
        }
    } catch (error) {
        console.error('Error fetching img url for ward:', wardNum, error);
    }
};


