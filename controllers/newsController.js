'use strict';

const fs = require("fs");
const firebase = require('../db');
const { writeFile, decodeBase64Image, uploadImage } = require('../helpers/imageHelper');
const News = require('../models/news');
const Student = require('../models/student');
const firestore = firebase.firestore();

const addNews = async (req, res, next) => {
    try {
        const data = req.body;
        const file = req.body.image;
        const uri = await uploadImage(file);
        // const storage = firebase.storage();
        // const storageRef = storage.ref();
        // await storageRef.putString(file).then(function (snapshot) {
        //     console.log('upload')
        // })
        const param = {
            title: req.body.title,
            description: req.body.description,
            image: uri
        }
        await firestore.collection('news').doc().set(param);
        res.json({
            status: 200,
            message: "Data Berhasil disimpan",
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getNews = async (req, res, next) => {
    try {
        const news = await firestore.collection('news');
        const data = await news.get();
        const newsArray = [];
        if (data.empty) {
            res.json({
                status: 200,
                message: "Data kosong"
            });
        } else {
            data.forEach(doc => {
                const news = new News(
                    doc.id,
                    doc.data().title,
                    doc.data().description,
                    doc.data().image
                );
                newsArray.push(news);
            });

            res.json({
                status: 200,
                message: "Berhasil mengambil data",
                data: newsArray,
            })
        }
    } catch (error) {
        res.json({
            status: 500,
            message: error.message,
        })
    }
}

const detailNews = async (req, res, next) => {
    try {
        const id = req.params.id;
        const news = await firestore.collection('news').doc(id);
        const data = await news.get();
        if (!data.exists) {
            res.json({
                status: 404,
                meesage: "Oops, sepertinya id tidak ditemukan",
            });
        } else {
            res.json({
                status: 200,
                message: "Berhasil mendapatkan data",
                data: data.data(),
            })
        }
    } catch (error) {

    }
}

module.exports = {
    addNews,
    getNews,
    detailNews,
}