// pfproulette javascript code
// By Christopher Rempe, 2022

var dir = './images/'
var fileExtension = '.jpg'

var images = []
var picture = ''

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

// When the site loads, choose a random image for the background
$(document).ready(function () {
  $('#spin-container').get(0).style.setProperty("--mobileHeight", (window.innerHeight/2)+'px')
  fetch('./api/files')
    .then((response) => {
      if (!response.ok) {
        console.log('not ok')
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      return response.json()
    })
    .then((text) => setup(text))
    .catch((error) => console.log('failed: ' + error))
})

function setup(input) {
  images = input[0]
  var num1 = getRandomInt((images.length - 1), 0)
  $('#home .container').css('background-image', 'url(' + dir + images[num1] + ')')
}

// Start the spin! Gets the first displayed photo, then calls spinRandom with
// a random number of spins
function spin() {
  var spinPhoto1 = dir + images[getRandomInt((images.length - 1), 0)]
  var spinNum = getRandomInt(10, 5)
  $('#spin-box').append($('<img>',{id:'img'+(spinNum+1),class:'profileImg',src:spinPhoto1}))
  $('#spin-box').get(0).style.setProperty("--scaleTime", ((spinNum+4)*0.35)+"s")
  $('#spin-box').css('transform', "scale(1.5)")

  setTimeout(function () {
    $('#img1').css("margin-top", '0')
    spinRandom(spinNum)
  }, 250)
}

// Get a random image and put it on the screen spinsLeft number of times
function spinRandom(spinsLeft) {

  // Create the id for the image, get a random image, and add it to the DOM
  var imgId = "img" + spinsLeft
  picture = dir + images[getRandomInt((images.length - 1), 0)]
  $('#spin-box').append($('<img>',{id:imgId,class:'profileImg',src:picture}))
  spinsLeft = spinsLeft - 1

  // Wait for 350ms before having image pop up
  setTimeout(function () {
    $('#'+imgId).css("margin-top", "0")

    // If there are more spins left, repeat
    if (spinsLeft > 0) {
      spinRandom(spinsLeft)
    } else {
      endSpin()
    }
  },350)
}

// Things to do after the spin is finished (show the side bar)
function endSpin() {
  $('#side-bar').removeClass('hidden')
  setTimeout(() => {
    $('#download-button').attr('href', picture.substring(1, picture.length))
    $('#spin-screen').get(0).style.setProperty("--spinWidth", "calc(100vw - 250px)")
    $('#spin-screen').addClass('spin-screen-end')
    $('#side-bar').addClass('position-side-end')
    setTimeout(() => {
      $('#side-bar h2').addClass('position-h2-end')
    }, 250)
  }, 1500)
}

// When the user clicks the first spin button, bring up the spin container,
// then spin
function firstSpin() {
  $('#spin-container').addClass('spin-container-up').removeClass('hidden')
  setTimeout(function () {
    $('#spin-container').removeClass('spin-container-transition')
    $('#home').addClass('hidden')
    spin()
  }, 750)
}

function respin() {
  $('#spin-screen').get(0).style.setProperty("--spinWidth", "100vw")
  $('#spin-screen').removeClass('spin-screen-end')
  $('#side-bar').removeClass('position-side-end')
  $('#side-bar h2').removeClass('position-h2-end')
  setTimeout(() => {
    $('#spin-box').get(0).style.setProperty("--scaleTime", '0.75s')
    $('#spin-box').css('transform', 'scale(0.01)')
    setTimeout(() => {
      $('#spin-box').empty()
      $('#spin-box').get(0).style.setProperty("--scaleTime", '0s')
      $('#side-bar').addClass('hidden')
      spin()
    }, 750)
  }, 750)

}
