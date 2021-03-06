// import cheerio from "cheerio";
import express from "express";
import { getSiteData } from "./scraper";

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// define a route handler for the default home page
app.get("/rep-data", async (req, res) => {
    res.json(await getSiteData());
});

const port = process.env.PORT || 8080;
// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});
