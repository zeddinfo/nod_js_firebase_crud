'use strict';
require("dotenv").config();
const firebase = require('../db');
const { generateAccessToken } = require('../helpers/jwt');
const { readData } = require('../helpers/store');
const Student = require('../models/student');
const firestore = firebase.firestore();

const register = async (req, res, next) => {
    try {
        const data = req.body;
        await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(data => {
                res.json({
                    status: 200,
                    message: "Berhasil menyimpan data",
                })
            })
            .catch(error => {
                res.json({
                    status: 400,
                    message: JSON.stringify(error.message)
                })
            })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res, next) => {
    try {
        const data = req.body;
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(data => {
                const user = {
                    email: data.user.email,
                    uid: data.user.uid,
                    username: data.user.displayName,
                    password: data.user.password,
                    photo: data.user.photoURL,
                }
                const token = generateAccessToken(user);

                res.json({
                    status: 200,
                    message: "Berhasil login",
                    data: user,
                    token: token
                })
            })
            .catch(error => {
                res.json({
                    status: 400,
                    message: error.message
                })
            })
    } catch (error) {
        res.json({
            status: 500,
            message: "E",
            data: JSON.stringify(error.message)
        });
    }
}

module.exports = {
    register,
    login,
}