// pfproulette javascript code
// By Christopher Rempe, 2022

var dir = './images/'
var fileExtension = '.jpg'
var picture = ''

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

// When the site loads, choose a random image for the background
$(document).ready(function () {
    var num1 = getRandomInt(4, 0) + 1
    console.log(num1)
    $('#home .container').css('background-image', 'url(' + dir + 'picture' + num1 + '.jpg)')

})

// Start the spin! Gets the first displayed photo, then calls spinRandom with
// a random number of spins
function spin() {
  var spinPhoto1 = dir + 'picture' + (getRandomInt(4, 0) + 1) + fileExtension
  $('#spin-box').append($('<img>',{id:'img1',class:'profileImg',src:spinPhoto1}))

  setTimeout(function () {
    $('#img1').css("margin-top", '0')
    spinRandom(getRandomInt(25, 5))
  }, 250)
}

// Get a random image and put it on the screen spinsLeft number of times
function spinRandom(spinsLeft) {

  // Create the id for the image, get a random image, and add it to the DOM
  var imgId = "img" + spinsLeft
  picture = dir + 'picture' + (getRandomInt(4, 0) + 1) + fileExtension
  $('#spin-box').append($('<img>',{id:imgId,class:'profileImg',src:picture}))
  spinsLeft = spinsLeft - 1

  // Wait for 350ms before having image pop up
  setTimeout(function () {
    $('#'+imgId).css("margin-top", "0")

    // If there are more spins left, repeat
    if (spinsLeft > 0) {
      spinRandom(spinsLeft)
    }
  },350)
}

// When the user clicks the first spin button, bring up the spin container,
// then spin
function firstSpin() {
  $('#spin-container').addClass('spin-container-up')
  setTimeout(function () {
    $('#spin-container').removeClass('spin-container-transition')
    spin()
  }, 750)
}
