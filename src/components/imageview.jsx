import { useEffect, useState } from "react";
import { fruits } from "../data/fruits";
import "../index.css";

export default function Example() {
  const images = fruits; // Assuming fruits is an array of image URLs

  const [bet, setBet] = useState(parseFloat(localStorage.getItem("bet")) || 1);
  const [amountWon, setAmountWon] = useState(
    parseFloat(localStorage.getItem("amountWon")) || 0
  );
  const [totalWon, setTotalWon] = useState(
    parseFloat(localStorage.getItem("totalWon")) || 0
  );
  const [amountWonComputer, setAmountWonComputer] = useState(
    parseFloat(localStorage.getItem("amountWonComputer")) || 0
  );
  const [totalWonComputer, setTotalWonComputer] = useState(
    parseFloat(localStorage.getItem("totalWonComputer")) || 0
  );

  const [image1, setImage1] = useState(
    localStorage.getItem("image1") || images[0]
  );
  const [image2, setImage2] = useState(
    localStorage.getItem("image2") || images[1]
  );
  const [image3, setImage3] = useState(
    localStorage.getItem("image3") || images[2]
  );
  const [isSpinning, setIsSpinning] = useState("false");
  const [info, setInfo] = useState("");
  const [currentTurn, setCurrentTurn] = useState(() => {
    const storedCurrentTurn = localStorage.getItem("currentTurn");
    return storedCurrentTurn ? storedCurrentTurn : "human";
  });
  const [turnTeller, setTurnTeller] = useState(() => {
    const storedTurnTeller = localStorage.getItem("turnTeller");
    return storedTurnTeller
      ? storedTurnTeller
      : currentTurn === "human"
      ? "It's your turn!"
      : "It's computer's turn!";
  });
  const [winner, setWinner] = useState("");

  useEffect(() => {
    localStorage.setItem("bet", bet.toString());
    localStorage.setItem("amountWon", amountWon.toString());
    localStorage.setItem("totalWon", totalWon.toString());
    localStorage.setItem("image1", image1);
    localStorage.setItem("image2", image2);
    localStorage.setItem("image3", image3);
    localStorage.setItem("amountWonComputer", amountWonComputer.toString());
    localStorage.setItem("totalWonComputer", totalWonComputer.toString());
    localStorage.setItem("currentTurn", currentTurn);
    localStorage.setItem("turnTeller", turnTeller);
  }, [
    bet,
    amountWon,
    totalWon,
    image1,
    image2,
    image3,
    amountWonComputer,
    totalWonComputer,
    currentTurn,
    turnTeller,
  ]);

  const spin = () => {
    if (bet === 0) {
      const message = "You've to bet before you can spin!";
      setInfo(message);
    } else {
      setInfo("");
      setIsSpinning(true);

      const randomIndex = () => Math.floor(Math.random() * images.length);

      const index1 = randomIndex();
      const index2 = randomIndex();
      const index3 = randomIndex();

      const image1 = images[index1];
      const image2 = images[index2];
      const image3 = images[index3];

      // Set the displayed images
      setImage1(image1);
      setImage2(image2);
      setImage3(image3);

      let amountWon = 0;

      if (image1 === image2 && image1 === image3) {
        amountWon = 3 * bet;
      } else if (image1 === image2 || image1 === image3 || image2 === image3) {
        amountWon = 2 * bet;
      }

      setAmountWon(amountWon);
      setTotalWon(totalWon + amountWon);

      setCurrentTurn("computer");
      // Stop spinning after a delay (adjust as needed)
      setTimeout(() => {
        setIsSpinning(false);
      }, 3000);
      setTimeout(() => {
        setTurnTeller("It's computer's turn!");
      }, 1000);
    }
  };

  const reset = () => {
    setBet(1);
    setAmountWon(0);
    setTotalWon(0);
    setAmountWonComputer(0);
    setTotalWonComputer(0);
    setImage1(images[0]);
    setImage2(images[1]);
    setImage3(images[2]);
    setIsSpinning(false);
    setInfo("");
    setTurnTeller("You start the game. bet & Spin!");
    setCurrentTurn("human");
  };

  const computerTurn = () => {
    setInfo("");

    // Simulate spinning animation for a certain duration
    setTimeout(() => {
      // Generate random images for the result of the spin
      const randomIndex = () => Math.floor(Math.random() * images.length);
      const index1 = randomIndex();
      const index2 = randomIndex();
      const index3 = randomIndex();
      const image1 = images[index1];
      const image2 = images[index2];
      const image3 = images[index3];

      setTimeout(() => {
        setIsSpinning(true);
      }, 50);

      // Update the displayed images
      setImage1(image1);
      setImage2(image2);
      setImage3(image3);

      // Calculate amount won for the computer's turn
      let amountWonComputer = 0;
      if (image1 === image2 && image1 === image3) {
        amountWonComputer = 3 * bet;
      } else if (image1 === image2 || image1 === image3 || image2 === image3) {
        amountWonComputer = 2 * bet;
      }

      setAmountWonComputer(amountWonComputer);
      // Update total amount won for the computer's turn
      setTotalWonComputer(totalWonComputer + amountWonComputer);

      // After the computer's turn, switch back to human's turn
      setCurrentTurn("human");

      // Stop spinning animation
      // setIsSpinning(false);

      setTimeout(() => {
        setIsSpinning(false);
        setTurnTeller("It's your turn!");
      }, 1000);
    }, 3000); // Adjust the duration of the spinning animation as needed
  };
  useEffect(() => {
    // Check if it's the computer's turn
    if (currentTurn === "computer") {
      // Execute the computer's turn
      computerTurn();
    }
  }, [currentTurn]);

  useEffect(() => {
    declareWinner();
  });

  const declareWinner = () => {
    let winInfo = "";
    if (totalWonComputer >= 100 && totalWon < totalWonComputer) {
      winInfo = "Computer Won!";
      setTotalWonComputer(100);
    } else if (totalWon >= 100 && totalWonComputer < totalWon) {
      winInfo = "User won!";
      setTotalWon(100);
    }

    setWinner(winInfo);
    setTimeout(() => {
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="container">
      <div className="game">
        <div className="images">
          <img
            className={`imgOne ${isSpinning ? "spin" : ""}`}
            src={image1}
            alt=""
          />
          <img
            className={`imageTwo ${isSpinning ? "spin" : ""}`}
            src={image2}
            alt=""
          />
          <img
            className={`imageThree ${isSpinning ? "spin" : ""}`}
            src={image3}
            alt=""
          />
        </div>
        <div>
          <p className="turn">
            {winner === "" ? turnTeller : "Game Over! Reset to replay"}
          </p>
        </div>

        {/* Input for bet amount */}
        <div className="input">
          <p>Set a bet! Only 1-10</p>
          $
          <input
            type="number"
            max={10}
            min={1}
            value={bet}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value !== 0 && value <= 10) {
                setBet(value);
              }
            }}
            readOnly={currentTurn === "computer" || winner !== ""}
            disabled={currentTurn === "computer" || winner !== ""}
          />
          <p className="info">{info}</p>
        </div>

        <div className="btn-action">
          <button
            className={`spin-button ${currentTurn === "human" ? "active" : ""}`}
            onClick={currentTurn === "human" ? spin : null}
            disabled={currentTurn === "computer" || winner !== ""}
          >
            Spin
          </button>
          <button className="spin-button" onClick={reset}>
            Reset
          </button>
          {/* reset */}
        </div>
      </div>

      <div className="resultDisplay">
        <div className="calculation">
          <div className="result-container">
            <h1>User result</h1>
            <p className="result">
              Last points: <span className="result-points">${amountWon}</span>
            </p>
            <p className="result">
              Total amount: <span className="result-points">${totalWon}</span>
            </p>
          </div>

          <div className="declare">
            <p className={winner !== "" && "win"}>{winner}</p>
          </div>

          <div className="result-container">
            <h1>Computer result</h1>
            <p className="result">
              Last points:{" "}
              <span className="result-points">${amountWonComputer}</span>
            </p>
            <p className="result">
              Total amount:{" "}
              <span className="result-points">${totalWonComputer}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
