var dir = './images/'
var fileExtension = '.jpg'

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

$(document).ready(function () {
    var num1 = getRandomInt(4) + 1
    console.log(num1)
    $('#home .container').css('background-image', 'url(' + dir + 'picture' + num1 + '.jpg)')
})