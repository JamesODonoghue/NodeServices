import cheerio from "cheerio";
import fetch from "node-fetch";

interface IListItem {
    text: string;
    title: string;
    link: string;
}
const siteUrl = "https://www.legis.iowa.gov/legislation/findLegislation/findBillBySponsorOrManager?ga=88&pid=774";

const fetchData = async () => {
    const result = await fetch(siteUrl);
    const text = await result.text();
    return cheerio.load(text);
};

export const getSiteData = async () => {
    const $ = await fetchData();
    const billRows = $("#sponsoredLegislation > div > table").find("> tbody > tr");
    const array: IListItem[] = [];
    let filteredArray: IListItem[];

    Object.keys(billRows).forEach((row: any) => {
        array.push({
            link: $(billRows[row]).find("a").next().attr("href"),
            text: $(billRows[row]).find("> td").text(),
            title: $(billRows[row]).find("> td:first-of-type").text(),
        });
    });

    filteredArray = [...array.filter((item) => item.text !== "")];

    return  filteredArray;
};
