import cardsBlue from "./assets/MythicCards/blue/index.js";
import cardsBrown from "./assets/MythicCards/brown/index.js";
import cardsGreen from "./assets/MythicCards/green/index.js";
import ancientsData from './data/ancients.js';
console.log(cardsBlue);
// console.log(cardsBrown);
// console.log(cardsGreen);
// console.log(ancientsData[1]);
// console.log(cardsBlue[Object.keys(cardsBlue)[0]]);

let selectedAncient = 0;

const ancient_card = document.querySelectorAll('.ancient-card');                //получаем массив адементов .ancient-card
ancient_card.forEach(function (entry){                                          //проходим по массиву и к каждому элементу применяем функцию
    entry.addEventListener('click', () => {                                     //"слушаем" каждый элемент
        selectedAncient = ancientsData.findIndex((elem, index, arr) => {
            return elem.name === entry.id
        });
        
        ancient_card.forEach(function (entry){                                  //если "услышали" один из элементво массива, то запускаем еще один foreach, который удаляет класс со всех элемнтов
            entry.classList.remove('ancient-card-active');
        })
        entry.classList.add('ancient-card-active');                             //вешаем класс на "услышанный" элемент
        
        collect_deck_with_selected_ancient();
    });
});

function collect_deck_with_selected_ancient() {
    let countBlueCard = ancientsData[selectedAncient].firstStage.blueCards + ancientsData[selectedAncient].secondStage.blueCards + ancientsData[selectedAncient].thirdStage.blueCards;
    let countBrownCard = ancientsData[selectedAncient].firstStage.brownCards + ancientsData[selectedAncient].secondStage.brownCards + ancientsData[selectedAncient].thirdStage.brownCards;
    let countGreenCard = ancientsData[selectedAncient].firstStage.greenCards + ancientsData[selectedAncient].secondStage.greenCards + ancientsData[selectedAncient].thirdStage.greenCards;
    
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
    console.log(selectedAncient);
    
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
    let finalDeck = collectFinalDeck(ancientsData[selectedAncient], smallBlueDeck, smallBrownDeck, smallGreenDeck);
    
    finalDeck.forEach(el => console.log(el));
    
    const card = document.querySelector('.top-card');
    card.addEventListener('click', () => {
        if(finalDeck.length > 0){
            let imageUrl = `url(${finalDeck.pop()})`;
        document.getElementById('top-card').style.backgroundImage = imageUrl;
        console.log(imageUrl)
        } else {
            alert('В колоде больше нет карт')
        }
        
        
    });
    
    console.log(selectedAncient);
}