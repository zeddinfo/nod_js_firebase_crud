const firebase = require('firebase');
require('firebase/firebase-storage');
const config = require('./config');

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;