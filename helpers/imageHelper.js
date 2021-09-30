var fs = require("fs");
const mime = require('mime');

const uploadImage = async (string) => {
    // to declare some path to store your converted image
    var matches = string.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
    let decodedImg = response;
    var date = new Date(0);
    date.setSeconds(45); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let file = decodedImg.fileName;
    let fileName = "" + file + "." + extension
    try {
        fs.writeFileSync("./images/" + fileName, imageBuffer, 'utf8');
        return fileName;
    } catch (e) {
        return new Error(e.message);
    }

}

module.exports = {
    uploadImage,
}