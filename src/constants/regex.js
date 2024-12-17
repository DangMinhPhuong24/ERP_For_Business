const regex = {
    alphabet: /^[a-zA-Z]+$/,
    accentedLetters: /^[\p{L}\s]+$/u,
    alphabetAndNumber: /^[a-zA-Z0-9]+$/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    lowerCase: /[a-z]+/,
    upperCase: /[A-Z]+/,
    onlyNumber: /[^0-9]/g,
    formatGmailCorrect: /^[a-zA-Z0-9._%+-]+@linhhieu\.com$/,
    containsNumber: /[0-9]/,
    validationForNumericLikeStrings: /^[\d.,]+$/,
}
export default regex