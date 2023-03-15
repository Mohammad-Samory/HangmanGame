// Letters

const letters = "abcdefghijklmnopqrstuvwxyz+#";

let letterArray = [...letters];

// Select Letters Container

let lettersContainer = document.querySelector(".letters");

// Creating Letters
letterArray.forEach((letter) => {
  let span = document.createElement("span");

  let spanText = document.createTextNode(letter);

  span.classList.add("letter-box");

  lettersContainer.appendChild(span);
  span.appendChild(spanText);
});

// Get Random get Random Category And Word
let CategorieName = document.querySelector(".category span");

fetch("./words.json")
  .then((words) => words.json())
  .then((data) => {
    let allKeys = Object.keys(data);
    let randomPropNumber = Math.floor(Math.random() * allKeys.length);
    let randomPropName = " ";
    let randomPropValue = "";
    if (randomPropNumber === 0) {
      let moviesKeys = Object.keys(data["movies"]);
      let randomMoviesKeyNumber = Math.floor(Math.random() * moviesKeys.length);
      randomPropName = moviesKeys[randomMoviesKeyNumber];
      randomPropValue = data["movies"][randomPropName];
      CategorieName.innerHTML = `Movie Genra: ${randomPropName}`;
    } else {
      randomPropName = allKeys[randomPropNumber];
      randomPropValue = data[randomPropName];
      CategorieName.innerHTML = `${randomPropName}`;
    }

    let randomWordNumber = Math.floor(Math.random() * randomPropValue.length);
    let randomWordValue = randomPropValue[randomWordNumber];
    // letter guess Element

    let lettersGuessContainer = document.querySelector(".letters-guess");

    let chosenWordArray = Array.from(randomWordValue.toLowerCase());

    // create spans depends on chosenWordArray

    chosenWordArray.forEach((letter) => {
      let emptySpan = document.createElement("span");

      // if the letter is space
      if (letter === " ") {
        emptySpan.classList = "with-space";
      }

      lettersGuessContainer.appendChild(emptySpan);
    });

    let chosenWord = chosenWordArray.filter((e) => {
      if (e !== " ") {
        return e;
      }
    });
    // Set Wrong Attempts / Correct Attempts
    let wrongAttempts = 0;
    let correctAttempts = 0;
    // Select the Draw Elements
    let theDraw = document.querySelector(".hangman-draw");

    // Select Guess Span
    let emptySpanInGuessContainer = document.querySelectorAll(
      ".letters-guess span"
    );

    // Clicking on letters
    document.addEventListener("click", (e) => {
      pressedLetters(e);
    });

    function pressedLetters(e) {
      // Set The Chose Status
      let theStatus = false;
      if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();
        chosenWordArray.forEach((wordLetter, index) => {
          if (clickedLetter === wordLetter) {
            emptySpanInGuessContainer[index].innerHTML = wordLetter;
            theStatus = true;
            correctAttempts++;
          }
        });

        // outside the loop
        if (theStatus === false) {
          wrongAttempts++;
          theDraw.classList.add(`wrong-${wrongAttempts}`);
          e.target.classList.add("wrong");
          document.getElementById("fail").play();
          if (wrongAttempts === 8) {
            endGame();
            lettersContainer.classList.add("finished");
          }
        } else {
          document.getElementById("success").play();
        }
        if (correctAttempts === chosenWord.length) {
          endGame();
        }
      }
    }
    // End Game Function
    function endGame() {
      setTimeout(() => {
        // Create Popup Div
        let div = document.createElement("div");
        let span = document.createElement("span");
        let divText = document.createTextNode("");
        // Create Text
        if (wrongAttempts === 8) {
          divText = document.createTextNode(
            `Game Over, The Word Is ${randomWordValue}`
          );
        } else {
          divText = document.createTextNode(
            `Congratulations You got The Word Right,
            Worng Counter : ${wrongAttempts}`
          );
        }

        let spanText = document.createTextNode("Reload");
        // Append Text To Div
        div.appendChild(divText);
        div.appendChild(span);
        span.appendChild(spanText);
        // Add Class On Div
        div.className = "popup";

        // Append To The Body
        document.body.appendChild(div);
        span.addEventListener("click", () => {
          location.reload();
        });
      }, 1000);
    }
  });
