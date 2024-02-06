
import { useEffect, useState } from "react"
import { fruits } from "../data/fruits"
import {LifebuoyIcon } from "@heroicons/react/24/solid"
import {ArrowPathIcon } from "@heroicons/react/24/solid"
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

    const [bet, setBet] = useState(parseFloat(localStorage.getItem("bet")) || 0);
    const [amountWon, setAmountWon] = useState(parseFloat(localStorage.getItem("amountWon"))||0);
    const [totalWon, setTotalWon] = useState(parseFloat(localStorage.getItem("totalWon"))||0);
    const [amountWonComputer, setAmountWonComputer] = useState(parseFloat(localStorage.getItem("amountWonComputer"))||0);
    const [totalWonComputer, setTotalWonComputer] = useState(parseFloat(localStorage.getItem("totalWonComputer"))||0);
    const [image1, setImage1] = useState(localStorage.getItem("image1")||images[0])
    const [image2, setImage2] = useState(localStorage.getItem("image2")||images[1])
    const [image3, setImage3] = useState(localStorage.getItem("image3")||images[2])
    const [isSpinning, setIsSpinning] = useState(false);
    const [info, setInfo] = useState('')
    const [currentTurn, setCurrentTurn] = useState(localStorage.getItem('human')||'computer')
    const [turnTeller, setTurnTeller] = useState('It is your turn. bet & Spin!')
    const [winner , setWinner]=useState('')
   
    
    useEffect(() => {
        localStorage.setItem("bet", bet.toString());
        localStorage.setItem("amountWon", amountWon.toString())
        localStorage.setItem("totalWon", totalWon.toString());
        localStorage.setItem("image1",image1)
        localStorage.setItem("image2",image2)
        localStorage.setItem("image3",image3)
        localStorage.setItem('amountWonComputer', amountWonComputer.toString())
        localStorage.setItem('totalWonComputer', totalWonComputer.toString())
        localStorage.setItem('currentTurn', currentTurn)
      }, [bet,amountWon, totalWon, image1, image2,image3,amountWonComputer,totalWonComputer,currentTurn]);

    const spin = () => {
        if(bet===0){
           const message =  "You've to bet before you can spin!"
           setInfo(message)
        }else{
            setInfo('')
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
            }
    
            setAmountWon(amountWon);
            setTotalWon(totalWon + amountWon);
    
            setCurrentTurn('computer')
             // Stop spinning after a delay (adjust as needed)
             setTimeout(() => {
                setIsSpinning(false);
            }, 3000);
            setTimeout(()=>{
              setTurnTeller('It\'s computer\'s turn!')
            },1000)
        }
    };

   const reset =()=>{
    setBet(0)
    setAmountWon(0)
    setTotalWon(0)
    setAmountWonComputer(0)
    setTotalWonComputer(0)
    setImage1(images[0])
    setImage2(images[1])
    setImage3(images[2])
    setIsSpinning(false)
    setInfo('')
    setCurrentTurn('human')
   }

   const computerTurn = () => {
    // setCompTurn(true)
    // Implement logic for the computer's turn here
    // For example, make a random bet and simulate the spinning animation
    // const maxBet = 10;
    // // Generate a random bet amount for the computer
    // const randomBet = Math.floor(Math.random()* maxBet)+ 1 // Assuming maxBet is the maximum bet amount

    // Set the bet amount for the computer
    // setBet(randomBet);

    // Trigger spinning animation for the computer's turn
    
    setIsSpinning(true);
     setInfo('')

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

        setAmountWonComputer(amountWonComputer)
        // Update total amount won for the computer's turn
        setTotalWonComputer(totalWonComputer + amountWonComputer);

        // After the computer's turn, switch back to human's turn
        setCurrentTurn('human');
       

        // Stop spinning animation
        setIsSpinning(false);
        setTurnTeller('It\'s your turn')
    }, 3000); // Adjust the duration of the spinning animation as needed
    
   
   
   
};
   useEffect(() => {
    // Check if it's the computer's turn
    if (currentTurn === 'computer') {
        // Execute the computer's turn
        computerTurn();
    }
}, [currentTurn]);

useEffect(()=>{
   if( totalWonComputer === 100 && totalWonComputer > totalWon){
       setWinner('Computer has won!')
       reset()
   }else if( totalWonComputer === 100 && totalWon === 100 ){
    setWinner('It\'s a draw!')
    reset()
   }else if(totalWon === 100 && totalWon > totalWonComputer){
     setWinner('You have won!')
     reset()
   }
},[totalWon,totalWonComputer,amountWon,amountWonComputer])
  
return (
      <div className="container">
      <div className="game">
        <div className="images">
            {/* <img className="" src={getRandomElement(randomImages.IMAGE1)} alt="Random Image 1" />
            <img src={getRandomElement(randomImages.IMAGE2)} alt="Random Image 2" />
            <img src={getRandomElement(randomImages.IMAGE3)} alt="Random Image 3" /> */}
            <img className={`imgOne ${isSpinning ? "spin" : ""}`} src={image1} alt="" />
            <img className={`imageTwo ${isSpinning ? "spin" : ""}`} src={image2} alt="" />
            <img className={`imageThree ${isSpinning ? "spin" : ""}`} src={image3} alt="" />
        </div>
        <div>
         <p>{turnTeller}</p>
         <p>{totalWon >= 100||totalWonComputer >= 100 ? winner:''}</p>
        </div>
       
         {/* Input for bet amount */}
        <div>
         <p>How much are you betting?</p>
         $<input
                type="number"
                value={bet>=0?bet:0}
                onChange={(e) => setBet(parseFloat(e.target.value))}
                disabled={currentTurn==='computer'}
            />
            <p className="info">{info}</p>
        </div> 
        
        <div className="btn-action">spin<button
              className={`spin-button ${currentTurn === 'human' && 'spin-button:active'}`}
              onClick={currentTurn === 'human' && spin}
              disabled={currentTurn === 'computer'}
          >
        <LifebuoyIcon color="blue" className="spin-icon" />
     </button>
            
            <button className="spin-button" onClick={reset} >
                <ArrowPathIcon color="blue" className="spin-icon"/>
            </button>reset
        </div>

        </div>
        
        
        <div className="resultDisplay">
          <div>
            <h1>User result</h1>
            <p className="result">
                  Amount won:  ${amountWon}
              </p>
              <p className="result">
                  Total amount:  ${totalWon}
              </p>
          </div>
          <div>
            <h1>Computer result</h1>
            <p className="result">
                  Amount won:  ${amountWonComputer}
              </p>
              <p className="result">
                  Total amount:  ${totalWonComputer}
              </p>
          </div>
           
        </div>
      </div>
    )
  }
  