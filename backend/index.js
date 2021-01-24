console.log("js activated 4");

chrome.runtime.onMessage.addListener(phobia_list => {
    console.log(phobia_list)
});

let images = document.getElementsByTagName("img");

// pass it to parser.js

// blur all image
for (img of images){
    img.style.filter = "blur(5px)"
}