console.log("js activated 5");

chrome.runtime.onMessage.addListener(phobia_list => {
    let images = document.getElementsByTagName("img");
    // blur all image
    for (img of images){
        let src = img.src
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"src": src,"triggers": phobia_list});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3000/parse", requestOptions)
          .then(response => response.text())
          .then(result => {
              if (result) {
                  console.log("blurring img", img);
                  img.style.filter = "blur(5px)";
              }
            })
          .catch(error => console.log('error', error));
    }
});