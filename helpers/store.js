'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

const readData = (collection, options = {}) => {
    let { where, orderBy, limit } = options;
    let query = firebase.firestore().collection(collection);

    if (where) {
        if (where[0] instanceof Array) {
            for (let w of where) {
                query = query.where(...w);
                console.log(w);
            }
        } else {
            query = query.where(...where);
        }
    }

    if (orderBy) {
        query = query.orderBy(...orderBy);
    }

    if (limit) {
        query = query.limit(limit);
    }

    const data = query.get();
    if (data.empty) {
        return null
    } else {
        return data;
    }

}

module.exports = {
    readData,
}