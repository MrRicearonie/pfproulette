// Imports
const express = require('express');
const app = express();
const port = 3000;

var fs = require('fs')

const urls = [
    {urls: 'Hello, world (again)!'}
  ];


// Static Files
app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/images', express.static(__dirname + 'public/images'));


// Create an array with the images folder
var dir = 'public/images/'
var files = []

fs.readdirSync(dir).forEach(file => {
    files.push(file);
  });

app.get('', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

function getRandomInt (max, min) {
    return Math.floor(Math.random() * (max - min) + min);
}

function refreshImg() {
    files = []
    fs.readdirSync(dir).forEach(file => {
        var fileType = file.split('.')[1]
        if (fileType != 'ico' && fileType != 'DS_Store') {
            files.push(file);
        }
      });
}

// Get the image for the background
app.get('/api/background', (req, res) => {
    var num = files.length - 2
    var rand = getRandomInt(num, 0)

    refreshImg()

    var data = [
        files[rand]
    ]
    res.send(data)

})

app.get('/api/files', (req, res) => {
    refreshImg()
    var data = [
        files
    ]
    res.send(data)
})


// Listen on port

console.log(files.length)
app.listen(port, () => console.info(`Listening on port ${port}`));

