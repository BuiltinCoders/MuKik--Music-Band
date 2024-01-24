let sounds = {
  a: new Audio(
    "./Asserts/sounds/tom-1.mp3"
  ),
  s: new Audio(
    "./Asserts/sounds/tom-2.mp3"
  ),
  d: new Audio(
    "./Asserts/sounds/tom-3.mp3"
  ),
  f: new Audio(
    "./Asserts/sounds/tom-4.mp3"
  ),
  j: new Audio(
    "./Asserts/sounds/kick-bass.mp3"
  ),
  k: new Audio(
    "./Asserts/sounds/snare.mp3"
  ),
  l: new Audio(
    "./Asserts/sounds/crash.mp3"
  ),
};

// KEY PRESS HANDLING
document.addEventListener("keypress", (e) => {
  let keyPress = e.key.toLowerCase();
  playSound(keyPress);
});

// MOUSE CLICK HANDLING
for (let i = 1; i <= 7; i++) {
  let colSelector = `col${i}`;
  colSelector = document.querySelector(`#column-${i}`);

  colSelector.addEventListener("click", () => {
    let elementValue = document.querySelector(`#column-${i} > .filter-layer`).textContent.toLowerCase();
    playSound(elementValue);
  });
}

// FUNCTION FOR DECREASING THE HSL VALUE
function decreaseAlpha(rgba, amount) {
  // Extract the RGBA values from the string
  let [r, g, b, a] = rgba.match(/\d+(\.\d+)?/g).map(Number);

  // Decrease the alpha value, ensuring it doesn't go below 0
  a = Math.max(0, a + amount);

  // Return the new RGBA color
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}


// FUNCTION FOR PLAYING SOUND
function playSound(soundValue) {
  if (sounds[soundValue]) {
    let filter = document.querySelectorAll("div.filter-layer");
    
    filter.forEach((item)=>{
      if(item.textContent.toLowerCase() == soundValue){
        let style = window.getComputedStyle(item);

        // CHANGE THE ALPHA VALUE OF RGBA VALUE

        let itemStyle = style.backgroundColor;
        item.style.backgroundColor = `${decreaseAlpha(itemStyle, 0.35)}`;

        setTimeout(()=>{
  
          item.style.backgroundColor = `${itemStyle}`;
        }, 200)
      }

    })

    sounds[soundValue].currentTime = 0;
    sounds[soundValue].play();
  }
}
