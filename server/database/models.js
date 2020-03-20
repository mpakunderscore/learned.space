let sequelize = require('./postgres').sequelize;;

const {Model, DataTypes} = require('sequelize');


class User extends Model {
}

class Link extends Model {
}

class UserLink extends Model {
}

class Word extends Model {
}

class Category extends Model {
}

module.exports = {
    User,
    Link,
    UserLink,
    Word,
    Category
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
}, {sequelize, modelName: 'user'});

// TODO refactoring (date of creation page or news)
Link.init({
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    title: DataTypes.STRING,

    words: DataTypes.JSONB,

    textLength: DataTypes.INTEGER,
    wordsLength: DataTypes.INTEGER,

    internalLinks: DataTypes.JSONB,
    externalLinks: DataTypes.JSONB,


}, {sequelize, modelName: 'link', timestamps: false});

UserLink.init({
    userid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {sequelize, modelName: 'userlink', timestamps: false});

// TODO refactoring (redirect from 's)
Word.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    categories: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
}, {sequelize, modelName: 'word', timestamps: false});

Category.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    subcategories: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    categories: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    pages: {
        type: DataTypes.JSONB,
        defaultValue: []
    },
    mainPage: {
        type: DataTypes.JSONB,
        defaultValue: {}
    },
    language: {
        type: DataTypes.STRING,
    },

}, {sequelize, modelName: 'category', timestamps: false});
