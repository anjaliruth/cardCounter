export const pictures = ["J", "Q", "K"];
export const isPicture = (card) => pictures.includes(card);
export function numbers() {
  let numbersArray = [];
  for (let i = 2; i < 11; i++) {
    numbersArray.push(i);
  }
  return numbersArray;
}
export let numbersOutput = numbers();
export let numbersAndPictures = ["A", ...numbersOutput, "J", "Q", "K"];
export let shapes = ["♣️", "❤️", "♠️", "♦️"];
export let shoe = 12;
export let lowCards = [2, 3, 4, 5, 6];
export let highCards = [10, "J", "Q", "K", "A"];