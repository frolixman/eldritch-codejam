// import ancients from "./assets/Ancients/index.js";
import cardsBlue from "./assets/MythicCards/blue/index.js";
import cardsBrown from "./assets/MythicCards/brown/index.js";
import cardsGreen from "./assets/MythicCards/green/index.js";
import ancientsData from './data/ancients.js';
console.log(cardsBlue);
console.log(cardsBrown);
console.log(cardsGreen);
console.log(ancientsData[1]);
console.log(cardsBlue[Object.keys(cardsBlue)[0]]);


let countBlueCard = ancientsData[1].firstStage.blueCards + ancientsData[1].secondStage.blueCards + ancientsData[1].thirdStage.blueCards;
let countBrownCard = ancientsData[1].firstStage.brownCards + ancientsData[1].secondStage.brownCards + ancientsData[1].thirdStage.brownCards;
let countGreenCard = ancientsData[1].firstStage.greenCards + ancientsData[1].secondStage.greenCards + ancientsData[1].thirdStage.greenCards;

function getRandomCard(cardObj, count) {
    let cardArr = shuffleArr(Object.values(cardObj));
    return cardArr.splice(0, count)
}

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        let t = arr[i]; 
        arr[i] = arr[j]; 
        arr[j] = t;
    }
    return arr;
}

const smallBlueDeck = getRandomCard(cardsBlue, countBlueCard);
const smallBrownDeck = getRandomCard(cardsBrown, countBrownCard);
const smallGreenDeck = getRandomCard(cardsGreen, countGreenCard);

console.log('smallBlueDeck - ' + smallBlueDeck);
console.log('smallBrownDeck - ' + smallBrownDeck);
console.log('smallGreenDeck - ' + smallGreenDeck);

function collectFinalDeck(ancientObj, smallBlueDeck, smallBrownDeck, smallGreenDeck) {
    let finalDeck = [];
    for(let i = 3; i < Object.keys(ancientObj).length; i++){                                            //начинаем с 3го свойства, тк до него имя, id и ссылка на картинку
        let stageDeck = [];
        let stageCardObj = ancientObj[Object.keys(ancientObj)[i]];                                      //объект stage внутри объекта ancient. 
        stageDeck = stageDeck.concat(smallGreenDeck.splice(0, stageCardObj.greenCards));                //обращаемся к i-тому объекту stage и берем нужное количество карт по значению свойства (greenCards)
        stageDeck = stageDeck.concat(smallBlueDeck.splice(0, stageCardObj.blueCards));
        stageDeck = stageDeck.concat(smallBrownDeck.splice(0, stageCardObj.brownCards));
        stageDeck = shuffleArr(stageDeck);
        // stageDeck.push(`end of Stage ${i - 2}`);
        finalDeck = finalDeck.concat(stageDeck);
    }

    return finalDeck.reverse();
}
let finalDeck = collectFinalDeck(ancientsData[1], smallBlueDeck, smallBrownDeck, smallGreenDeck);

finalDeck.forEach(el => console.log(el));

const card = document.querySelector('.top-card');
card.addEventListener('click', () => {
    // alert(`countBlueCard - ${countBlueCard}, countBrownCard - ${countBrownCard}, countGreenCard - ${countGreenCard}.`);
    // alert(`finalDeck.length - ${finalDeck.length}\n finalDeck.pop - ${finalDeck.pop()}`)
    if(finalDeck.length > 0){
        let imageUrl = `url(${finalDeck.pop()})`;
    document.getElementById('top-card').style.backgroundImage = imageUrl;
    console.log(imageUrl)
    } else {
        alert('В колоде больше нет карт')
    }
    
    
});







