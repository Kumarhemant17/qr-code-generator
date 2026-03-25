// Get elements from DOM
let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let qrSize = document.getElementById("qrSize");
let loading = document.getElementById("loading");

// Generate QR
function generateQR() {
  if (qrText.value.length > 0) {
    // Show loading text
    loading.style.display = "block";

    setTimeout(() => {
      // Generate QR using API
      qrImage.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize.value}x${qrSize.value}&data=` +
        encodeURIComponent(qrText.value);
      // Show QR image box
      imgBox.classList.add("show-img");
      loading.style.display = "none";
    }, 500);
  } else {
    qrText.classList.add("error");
    setTimeout(() => {
      qrText.classList.remove("error");
    }, 1000);
  }
}

// Download QR
function downloadQR() {
  if (!qrImage.src) return;

  let img = new Image();
  img.crossOrigin = "anonymous";

  img.src = qrImage.src;

  img.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr-code.png";
    link.click();
  };
}

// Copy Text
function copyText() {
  if (qrText.value.length === 0) return;

  navigator.clipboard.writeText(qrText.value);
  alert("Copied!");
}

// Enter key support
qrText.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    generateQR();
  }
});
