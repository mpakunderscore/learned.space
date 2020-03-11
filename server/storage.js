const database = require("./database/postgres");
const wiki = require("./crawler/wiki");

// up to 5k
exports.links = {};
exports.words = {};
exports.categories = {};

exports.init = async () => {

    let categories = await database.getCategories();
    for (let i = 0; i < categories.length; i++) {
        exports.categories[categories[i].id] = categories[i].toJSON();
    }

    let words = await database.getWords();
    for (let i = 0; i < words.length; i++) {
        exports.words[words[i].id] = words[i].toJSON();
    }

    const allWords = await database.getAllWords();

    console.log(
        'storage.categories: ' + categories.length +
        ' / storage.words: ' + words.length +
        ' / storage.words.all: ' + allWords.length
    )
};

// TODO hmm
exports.getCategory = async (id) => {
    let category = exports.categories[id];
    if (!category)
        category = (await wiki.getWikiCategories(id));

    return category;
}

