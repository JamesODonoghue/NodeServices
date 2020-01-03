"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const siteUrl = "https://www.legis.iowa.gov/legislation/findLegislation/findBillBySponsorOrManager?ga=88&pid=774";
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield node_fetch_1.default(siteUrl);
    const text = yield result.text();
    return cheerio_1.default.load(text);
});
exports.getSiteData = () => __awaiter(void 0, void 0, void 0, function* () {
    const $ = yield fetchData();
    const billRows = $("#sponsoredLegislation > div > table").find("> tbody > tr");
    // const array = billRows.map((rowNum) => ({
    //     link: $(billRows[rowNum]).find("a[1]").attr("href"),
    //     text: $(billRows[rowNum]).find("> td").text()
    // }));
    const array = [];
    Object.keys(billRows).forEach((row) => {
        array.push({
            link: $(billRows[row]).find("a").next().attr("href"),
            text: $(billRows[row]).find("> td").text(),
        });
    });
    // tslint:disable-next-line:no-console
    console.log(array);
    return array;
});
//# sourceMappingURL=scraper.js.map