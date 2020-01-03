import cheerio from "cheerio";
import fetch from "node-fetch";

const siteUrl = "https://www.legis.iowa.gov/legislation/findLegislation/findBillBySponsorOrManager?ga=88&pid=774";

const fetchData = async () => {
    const result = await fetch(siteUrl);
    const text = await result.text();
    return cheerio.load(text);
};

export const getSiteData = async () => {
    const $ = await fetchData();
    const billRows = $("#sponsoredLegislation > div > table").find("> tbody > tr");
    // const array = billRows.map((rowNum) => ({
    //     link: $(billRows[rowNum]).find("a[1]").attr("href"),
    //     text: $(billRows[rowNum]).find("> td").text()
    // }));

    const array: object[] = [];

    Object.keys(billRows).forEach((row: any) => {
        array.push({
            link: $(billRows[row]).find("a").next().attr("href"),
            text: $(billRows[row]).find("> td").text(),
        });
    });

    // tslint:disable-next-line:no-console
    console.log(array);
    return array;
};
