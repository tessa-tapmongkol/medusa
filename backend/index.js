console.log("js activated 3");

let images = document.getElementsByTagName("img");
// blur all image
for (img of images){
    img.style.filter = "blur(5px)"
}