import Pix from "./pix.js";

// gerando payload pix

const price = parseFloat(window.location.search.split('price=')[1]);
console.log(window.location.search.split('price=')[1]);


const pix = new Pix(
  "539e653e-6580-4d8e-ad32-bbfe44f04d57",
  "",
  "",
  "",
  "",
  price
);

const payload = pix.getPayload();
console.log(payload);

const qrcodeDiv = document.querySelector("#qrCode");

new QRCode(qrcodeDiv, {
    text: payload,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
});