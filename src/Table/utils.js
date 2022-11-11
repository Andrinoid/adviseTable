
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const numberToLetter = number => {
    return letters[number].toLocaleLowerCase();
}