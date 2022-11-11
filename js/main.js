var dir = './images/'
var fileExtension = '.jpg'
var picture = ''

function getRandomInt(max, min) {
    return Math.floor(Math.random() * (max - min) + min);
  }

$(document).ready(function () {
    var num1 = getRandomInt(4, 0) + 1
    console.log(num1)
    $('#home .container').css('background-image', 'url(' + dir + 'picture' + num1 + '.jpg)')

})

function spin() {
  var spinPhoto1 = dir + 'picture' + (getRandomInt(4, 0) + 1) + fileExtension
  $('#spin-box').append($('<img>',{id:'img1',class:'profileImg',src:spinPhoto1}))

  setTimeout(function () {
    $('#img1').css("margin-top", '0')
    spinRandom(getRandomInt(25, 5))
  }, 250)
}

function spinRandom(spinsLeft) {
  console.log(spinsLeft)
  var imgId = "img" + spinsLeft
  console.log(imgId)
  picture = dir + 'picture' + (getRandomInt(4, 0) + 1) + fileExtension
  $('#spin-box').append($('<img>',{id:imgId,class:'profileImg',src:picture}))
  spinsLeft = spinsLeft - 1
  setTimeout(function () {
    $('#'+imgId).css("margin-top", "0")
    if (spinsLeft > 0) {
      spinRandom(spinsLeft)
    }
  },350)
}

function firstSpin() {
  $('#spin-container').addClass('spin-container-up')
  setTimeout(function () {
    $('#spin-container').removeClass('spin-container-transition')
    spin()
  }, 750)
}
