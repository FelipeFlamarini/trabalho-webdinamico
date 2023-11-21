const qrcodeDiv = document.querySelector("#qrCode");

new QRCode(qrcodeDiv, {
    text: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});

console.log("teste")