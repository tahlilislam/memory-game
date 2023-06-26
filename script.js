// Selecting html content
const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];
//debugger;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}
// ??A variable thats storing a randomized shuffled Array of Colors??
let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

  
  }
}

// when the DOM loads; pass in the shuffled color values for the function with the divs
createDivsForColors(shuffledColors);

// keeps track of how many tiles are faced up or matched
let revealedTileCount = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  //debugger;

  //need to add this before adding background color
  //If 2 or more revealed tiles, then dont show color on the 3rd tile
  let revealedTiles = document.querySelectorAll(".revealedTile");
  if (revealedTiles.length === 2) {
    return;
  }

  const currentTile = event.target;
  currentTile.style.backgroundColor = currentTile.classList.value; // choosing the class color value associated with target and applying it to background

  //adding a class of revealed of the tile that was clicked on
  currentTile.classList.add("revealedTile");
  revealedTiles = document.querySelectorAll(".revealedTile");
  //console.log (revealedTiles);

//revealedTiles has a Nodelist with a length of 2; can call array-like methods such as using indexes
  if (revealedTiles.length === 2) {
    if (revealedTiles[0].getAttribute("class") === revealedTiles[1].getAttribute("class")) {
      console.log("match");
      revealedTileCount +=2;
      revealedTiles.forEach(newDiv => {
        newDiv.classList.remove("revealedTile");
        // So that the user CANNOT CLICK SAME TILE TWICE
        newDiv.style.pointerEvents = "none";
      });
    }
    else {
      console.log("wrong");
      revealedTiles.forEach(newDiv => {
        setTimeout (function(){
          newDiv.classList.remove("revealedTile");
          // clears out the color of an incorrect match; will get reassigned another color
          newDiv.style.backgroundColor = null;
        }, 500);
      });
    }
  };
  if (revealedTileCount === COLORS.length) {
    setTimeout(function(){
      alert ("Game Over!");
    },600)
  };
  // if (revealedTiles.length> 2) {
  //   newDiv.style.pointerEvents = "none";
  // }
 
}

///??? How would I check for more than 2 clicks and prevent more than 2 tiles being clicked in a turn 
//without ONLY relying on a faster setTimeout in Line 102???





// Basic logic
//If card card 1 and card 2 matches then correct
//Then Show both cards, otherwise flip it
// needs restrictions on number of tiles you can click in a turn

//If card 1 and card 2 values don't match
// then flip both cards and allow use to redo it

