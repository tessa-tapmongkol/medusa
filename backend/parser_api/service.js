const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const request = require('request').defaults({ encoding: null });

async function getLabels(filename){
    let request_body = {}

    return new Promise((resolve, reject) => {
        if (filename.includes("data:image/jpeg;base64")){
            console.log("is a base64 image");
            const b64 = filename.substring(23) // take only the encoding
            request_body = {
                image: {
                    content: b64
                }
            }

            client.labelDetection(request_body)
            .then(response => {
                const labels = response[0].labelAnnotations;
                resolve(labels);
            })
            .catch(err => {
                console.error(err);
                resolve([])
            });
        } 
        else {
            // convert to base64
            request.get(filename, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let data = Buffer.from(body).toString('base64');
                    request_body = {
                        image: {
                            content: data
                        }
                    }
                    client.labelDetection(request_body).then(response => {
                        const labels = response[0].labelAnnotations;
                        resolve(labels);
                    })
                    .catch(err => {
                        console.error(err);
                        resolve([])
                    });
                }
            });
        }
    })
}

// label_list =  a list of labels that defines the image
// triggers_list = user input on what they want us to blur
let isTriggering = (label_list, triggers_list) => {
    console.log(triggers_list)
    // build a map because efficiency matters :)
    mapper = {}
    for (let i = 0; i < triggers_list.length; i++){
        mapper[triggers_list[i]] = 1
    }

    for (let i = 0; i < label_list.length; i++){
        if (mapper[label_list[i].toLowerCase()] != undefined) {
            // image is in trigger list. 
            // We need to blur it
            return true
        }
    }
    return false
}

// main function
async function needToBlur(filename, triggers_list){
    return new Promise((resolve, reject) => {
        try {
            getLabels(filename).then(labels => {
                if (labels === []){
                    reject("Unable to parse image")
                }
                let labels_parsed = []
                for (let i = 0; i < labels.length; i++){
                    labels_parsed.push(labels[i].description)
                }
                resolve(isTriggering(labels_parsed, triggers_list));
            })
        }
        catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    needToBlur
}