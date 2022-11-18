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
  $('#spin-container').get(0).style.setProperty("--mobileHeight", (window.innerHeight/2)+'px')
  console.log(window.innerHeight)
  var num1 = getRandomInt(24, 0) + 1
  console.log(num1)
  $('#home .container').css('background-image', 'url(' + dir + 'picture' + num1 + '.jpg)')
})

// Start the spin! Gets the first displayed photo, then calls spinRandom with
// a random number of spins
function spin() {
  console.log('Hello')
  var spinPhoto1 = dir + 'picture' + (getRandomInt(24, 0) + 1) + fileExtension
  var spinNum = getRandomInt(10, 5)
  $('#spin-box').append($('<img>',{id:'img'+(spinNum+1),class:'profileImg',src:spinPhoto1}))
  $('#spin-box').get(0).style.setProperty("--scaleTime", ((spinNum+4)*0.35)+"s")
  $('#spin-box').css('transform', "scale(1.5)")

  console.log(spinNum)

  setTimeout(function () {
    $('#img1').css("margin-top", '0')
    spinRandom(spinNum)
  }, 250)
}

// Get a random image and put it on the screen spinsLeft number of times
function spinRandom(spinsLeft) {

  // Create the id for the image, get a random image, and add it to the DOM
  var imgId = "img" + spinsLeft
  picture = dir + 'picture' + (getRandomInt(24, 0) + 1) + fileExtension
  $('#spin-box').append($('<img>',{id:imgId,class:'profileImg',src:picture}))
  spinsLeft = spinsLeft - 1

  console.log(spinsLeft)

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
