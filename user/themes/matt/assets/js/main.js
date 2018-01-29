// Day & Night Themes
var dayTheme   = 'day'
    nightTheme = 'night'

function setDayTheme() {
  localStorage.setItem('theme', 'day')
}

function setNightTheme() {
  localStorage.setItem('theme', 'night')
}

function setThemeTime() {  
  var currentTime = new Date().getHours()
  
  if ((0 <= currentTime&&currentTime < 7) || (18 <= currentTime&&currentTime <= 24)) {
    setNightTheme()
  }
  if (7 <= currentTime&&currentTime < 18) {
    setDayTheme()
  }
}

function checkTheme() {
  var timeTheme = localStorage.getItem('theme')
      userTheme = sessionStorage.getItem('theme')

  if (userTheme) {
    currentTheme = userTheme
  } else {
    currentTheme = timeTheme
  }
}

function setTheme() {
  setThemeTime()
  checkTheme()

  if (currentTheme == 'day') {
    theme = dayTheme
    document.getElementById('js-body').className = "day"
    sessionStorage.setItem('theme', 'day')
  }

  if (currentTheme == 'night') {
    theme = nightTheme
    document.getElementById('js-body').className = "night"
    sessionStorage.setItem('theme', 'night')
  }
}

setTheme();


// Toggle Theme
function toggleTheme(e) {
  checkTheme()

  if (currentTheme == 'day') {
    document.getElementById('js-body').className = 'night'
    document.getElementById('js-theme-toggle').className = 'night'
    sessionStorage.setItem('theme', 'night')
  }

  if (currentTheme == 'night') {
    document.getElementById('js-body').className = 'day'
    document.getElementById('js-theme-toggle').className = 'day'
    sessionStorage.setItem('theme', 'day')
  }
}

toggleButton = document.getElementById('js-theme-toggle')
toggleButton.className = currentTheme

toggleButton.addEventListener('click', toggleTheme);