// let express = require('express');
// let router = express.Router();

// const utils = require("./utils");
const crawler = require("./crawler/crawler");
const wiki = require("./crawler/wiki");
const database = require("./database/postgres");

exports.init = (app) => {

    // get url graph TODO currently only words
    app.get('/crawl', async function (request, response) {

        let urlData = await crawler.getURLData(request.query.url);

        if (request.query.short === 'true')
            urlData.words = urlData.words.splice(0, 7);

        response.json(urlData);
    });

    // get pages from this url list links
    app.get('/crawl/links', async function (request, response) {

        let linksArray = await crawler.crawlURLLinks(request.query.url);

        // if (request.query.short === 'true')
        //     urlData.words = urlData.words.splice(0, 7);

        response.json(linksArray);
    });

    // app.get('/urls', async function (request, response) {
    //     response.json(await crawler.getURLsData([request.query.url1, request.query.url2]));
    // });

    // get wiki next categories in graph
    app.get('/wiki', async function (request, response) {
        response.json(await wiki.getWikiCategories(request.query.title, request.query.lang));
    });


    // init or get user
    app.get('/user', async function (request, response) {
        let user = await database.getUser(request.query.id);
        response.json(user);
    });

    // get user list of links TODO title doesn't work
    app.get('/user/links', async function (request, response) {
        let links = await database.getUserLinks(request.query.userid);
        response.json(links);
    });

    // add link to user
    app.get('/user/link/add', async function (request, response) {
        response.json(await database.saveUserLink(request.query.userid, request.query.url));
    });

    // get user words
    app.get('/user/words', async function (request, response) {
        let links = await database.getUserWords(request.query.userid);
        response.json(links);
    });

    // get user graph
    app.get('/user/graph', async function (request, response) {
        let links = await database.getWordsGraph(await exports.getUserWords(request.query.userid));
        response.json(links);
    });



    // list of all users
    app.get('/users', async function (request, response) {
        response.json(await database.getUsers());
    });

    // get list of links
    app.get('/links', async function (request, response) {
        let links = await database.getLinks();
        response.json(links);
    });

    // get all words
    app.get('/words', async function (request, response) {
        response.json(await database.getWords());
    });

    // get list of links
    app.get('/categories', async function (request, response) {
        let categories = await database.getCategories();
        response.json(categories);
    });


    // TODO statistics
    app.get('/statistics', async function (request, response) {
        let statistics = await database.getStatistics();
        response.json(statistics);
    });

    let routes = [];
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            routes.push(r.route.path)
        }
    });

    app.get('/api', function (request, response) {
        response.json(routes);
    });
}
