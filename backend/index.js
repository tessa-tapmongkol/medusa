console.log("js activated 4");

let images = document.getElementsByTagName("img");
chrome.runtime.onMessage.addListener(phobia_list => {
    for (img of images){  
        determineBlur(img, phobia_list)
    }
});

const determineBlur = async (img, triggers) => {
    try {
        const response = await fetch('http://localhost:3000/parse', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                src: img.src,
                triggers: triggers
            })
        });
        if (!response.ok) {
            throw new Error('Bad response')
        }
        const jsonResponse = await response.json();
        if (jsonResponse.shouldBlur) {
            img.style.filter = "blur(10px)"
        }
    }
    catch (err) {
        throw err
    }
};