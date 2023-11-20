function randomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
}

console.log(randomNumber(1, 10))