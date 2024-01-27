/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react"
import { fruits } from "../data/fruits"
import '../index.css'


// const DisplayImages = (fruits)=>{
  
//     const IMAGE1 = []
//     const IMAGE2 = []
//     const IMAGE3 = []

//     const rand1 = Math.floor(Math.random() * fruits.length);
//     const rand2 = Math.floor(Math.random() * fruits.length);
//     const rand3 = Math.floor(Math.random() * fruits.length);

//     // Push random fruits into each array
//     for (let i = 0; i < fruits.length; i++) {
//         IMAGE1.push(fruits[(rand1 + i) % fruits.length]);
//         IMAGE2.push(fruits[(rand2 + i) % fruits.length]);
//         IMAGE3.push(fruits[(rand3 + i) % fruits.length]);
//     }

    
//     // Return the arrays of random fruits
//     return [IMAGE1, IMAGE2, IMAGE3];
// }
// const randomFruitArrays = DisplayImages(fruits);
// const [IMAGE1, IMAGE2, IMAGE3] = randomFruitArrays
  
// const getRandomElement =(array)=>{
//     const randomIndex = Math.floor(Math.random()* array.length)
//     return array[randomIndex]
// }
// const randomImg1 = getRandomElement(IMAGE1)
// const randomImg2 = getRandomElement(IMAGE2)
// const randomImg3 = getRandomElement(IMAGE3)






  export default function Example() {
    
    // const [bet, setBet] = useState(2)
    // const [amount, setAmount] = useState(0)
    // const [total , setTotal]  = useState(0)
    // const [randomImages, setRandomImages] = useState({
    //     IMAGE1: IMAGE1,
    //     IMAGE2: IMAGE2,
    //     IMAGE3: IMAGE3
    // });
   
    // const generateRandomImages = () => {
    //         const [IMAGE1, IMAGE2, IMAGE3] = DisplayImages(fruits)
    //         setRandomImages({ IMAGE1, IMAGE2, IMAGE3 })
     
    // }
    // const onSpin = () => {
    //     generateRandomImages()
      
    // }
    
    // // Effect to calculate result when random images change
    // useEffect(() => {
    //     const getResult = () => {
    //         let amountWon = 0;

    //         // Check if specific images match
    //         if (randomImages[0] === randomImages[1] && randomImages[1] === randomImages[2]) {
    //             amountWon = bet * 3; // Win triple the bet amount
    //         } else if (randomImages[0] === randomImages[1] || randomImages[0] === randomImages[2] || randomImages[1] === randomImages[2]) {
    //             amountWon = bet * 2; // Win double the bet amount
    //         }

    //         setAmount(amountWon);
    //         setTotal(prevTotal => prevTotal + amountWon);
    //     };

    //     getResult();
    // }, [randomImages]);

    const images = fruits; // Assuming fruits is an array of image URLs

    const [bet, setBet] = useState(0);
    const [amountWon, setAmountWon] = useState(0);
    const [totalWon, setTotalWon] = useState(0);
    const [image1, setImage1] = useState(images[0])
    const [image2, setImage2] = useState(images[1])
    const [image3, setImage3] = useState(images[2])
    const [isSpinning, setIsSpinning] = useState(false);

    
    // useEffect(() => {
    //     if (isSpinning) {
    //         const intervalId = setInterval(spin, 1000); // Change the interval duration as needed

    //         return () => clearInterval(intervalId);
    //     }
    // }, [isSpinning]);

    const spin = () => {
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

        if (image1=== image2 && image1 === image3) {
            amountWon = 3 * bet;
        } else if (image1 === image2 || image1 === image3 || image2 === image3) {
            amountWon = 2 * bet;
        }else{
            amountWon =0;
        }

        setAmountWon(amountWon);
        setTotalWon(totalWon + amountWon);

         // Stop spinning after a delay (adjust as needed)
         setTimeout(() => {
            setIsSpinning(false);
        }, 3000); // Change the delay duration as needed
    };

   
  
return (
      <div className="container">
        <div className={`images ${isSpinning ? "spin" : ""}`}>
            {/* <img className="" src={getRandomElement(randomImages.IMAGE1)} alt="Random Image 1" />
            <img src={getRandomElement(randomImages.IMAGE2)} alt="Random Image 2" />
            <img src={getRandomElement(randomImages.IMAGE3)} alt="Random Image 3" /> */}
            <img  src={image1} alt="Image 1" />
            <img  src={image2} alt="Image 2" />
            <img  src={image3} alt="Image 3" />
        </div>
         {/* Input for bet amount */}
         <input
                type="number"
                value={bet}
                onChange={(e) => setBet(parseFloat(e.target.value))}
            />
        
        <div className="btn-action">
            <button className="spin-button" onClick={spin}>Spin</button>
            <button className="spin-button" >Reset</button>
        </div>
        <div className="resultDisplay">
            <p className="result">
                Amount won:  ${amountWon}
            </p>
            <p className="result">
                Total amount:  ${totalWon}
            </p>
        </div>
      </div>
    )
  }
  